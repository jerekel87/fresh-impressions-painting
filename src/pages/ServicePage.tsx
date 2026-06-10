import { useEffect, useRef, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import { useSeo } from '../lib/useSeo';
import { useSocialLinks } from '../lib/useSocialLinks';
import Navbar from '../components/Navbar';
import EstimateForm from '../components/EstimateForm';
import ReviewsTicker from '../components/ReviewsTicker';
import ScrollingGallery from '../components/ScrollingGallery';
import Footer from '../components/Footer';
import { services } from '../data/services';
import type { BeforeAfterItem } from '../data/services';
import { supabase } from '../lib/supabase';

/* ─── Before/After Slider ─────────────────────────────────────── */

function BeforeAfterSlider({ before, after, caption }: { before: string; after: string; caption: string; }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const draggingRef = useRef(false);

  const updatePosition = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 2), 98);
    setPosition(pct);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      draggingRef.current = true;
      updatePosition(e.clientX);
    };

    const onTouchStart = (e: TouchEvent) => {
      draggingRef.current = true;
      updatePosition(e.touches[0].clientX);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      updatePosition(e.clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!draggingRef.current) return;
      updatePosition(e.touches[0].clientX);
    };

    const onEnd = () => { draggingRef.current = false; };

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onEnd);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, []);

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="relative w-full h-[280px] sm:h-[340px] overflow-hidden select-none cursor-col-resize rounded-sm"
        onDragStart={(e) => e.preventDefault()}
      >
        <img src={after} alt={`After: ${caption}`} draggable={false} className="absolute inset-0 w-full h-full object-cover pointer-events-none" width={640} height={340} loading="lazy" decoding="async" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width: `${position}%` }}>
          <img src={before} alt={`Before: ${caption}`} draggable={false} className="absolute inset-0 h-full object-cover pointer-events-none" style={{ width: `${10000 / position}%`, maxWidth: 'none' }} width={640} height={340} loading="lazy" decoding="async" />
        </div>
        <div
          className="absolute top-0 bottom-0 z-10 flex items-center justify-center pointer-events-none"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)]" />
          <div className="relative w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center border-2 border-gray-100">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M6 4L2 10L6 16M14 4L18 10L14 16" stroke="#10263C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <span className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 pointer-events-none">Before</span>
        <span className="absolute top-3 right-3 bg-brand-yellow text-navy-900 text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 pointer-events-none">After</span>
      </div>
      <p className="text-gray-500 text-[13px] text-center leading-snug">{caption}</p>
    </div>
  );
}

/* ─── Photo Series Slider ─────────────────────────────────────── */

function PhotoSeriesSlider({ images, caption, seriesLabel }: { images: string[]; caption: string; seriesLabel?: string }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length);
  const next = () => setCurrent(i => (i + 1) % images.length);

  return (
    <div className="space-y-3">
      <div className="relative w-full h-[280px] sm:h-[340px] overflow-hidden select-none rounded-sm bg-gray-200">
        <img
          src={images[current]}
          alt={`${caption} — photo ${current + 1}`}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          width={640}
          height={340}
          loading="lazy"
          decoding="async"
        />
        <button
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        {seriesLabel && (
          <span className="absolute top-3 left-3 bg-navy-900/80 text-white text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 pointer-events-none">
            {seriesLabel}
          </span>
        )}
        <span className="absolute top-3 right-3 bg-brand-yellow text-navy-900 text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 pointer-events-none">
          {current + 1} / {images.length}
        </span>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Photo ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${i === current ? 'bg-white' : 'bg-white/40 hover:bg-white/70'}`}
            />
          ))}
        </div>
      </div>
      <p className="text-gray-500 text-[13px] text-center leading-snug">{caption}</p>
    </div>
  );
}

/* ─── FAQ Item ────────────────────────────────────────────────── */

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (open && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open]);

  return (
    <div className={`border border-gray-100 px-5 sm:px-6 transition-colors duration-300 ${open ? 'bg-gray-50/60 border-gray-200' : 'hover:border-gray-200'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-[15px] sm:text-base font-semibold text-navy-900">{q}</span>
        <span className={`flex-shrink-0 text-navy-900 text-xl font-light select-none transition-transform duration-300 ${open ? 'rotate-45' : 'rotate-0'}`}>
          +
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-[height] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ height }}
      >
        <p className="text-gray-500 text-[15px] leading-[1.85] pb-5">{a}</p>
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */

export default function ServicePage() {
  useSeo('services');
  const { slug } = useParams<{ slug: string }>();
  const staticService = slug ? services[slug] : null;
  const [openFaq, setOpenFaq] = useState<number>(0);
  const social = useSocialLinks();
  const [cmsData, setCmsData] = useState<{
    title?: string;
    tagline?: string;
    about_title?: string;
    description?: string[];
    highlights?: { label: string; value: string }[];
    before_after?: { before: string; after: string; caption: string }[];
    faqs?: { q: string; a: string }[];
    hero_image?: string | null;
    warning_video?: string | null;
    photo_series?: Array<{ seriesLabel: string; caption: string; images: string[] }>;
  } | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from('services')
      .select('title, tagline, about_title, description, highlights, before_after, faqs, hero_image, warning_video, photo_series')
      .eq('slug', slug)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setCmsData(data);
      });
  }, [slug]);

  if (!staticService) return <Navigate to="/" replace />;

  const service = {
    ...staticService,
    title: cmsData?.title || staticService.title,
    tagline: cmsData?.tagline || staticService.tagline,
    aboutTitle: cmsData?.about_title || staticService.aboutTitle,
    description: cmsData?.description?.length ? cmsData.description : staticService.description,
    highlights: cmsData?.highlights?.length ? cmsData.highlights : staticService.highlights,
    heroImage: cmsData?.hero_image || staticService.heroImage,
    warningVideo: cmsData?.warning_video ?? null,
    beforeAfter: (() => {
      const staticSeries = staticService.beforeAfter.filter((ba: BeforeAfterItem) => 'type' in ba && ba.type === 'series');
      const pairs = cmsData?.before_after?.length ? cmsData.before_after : staticService.beforeAfter.filter((ba: BeforeAfterItem) => !('type' in ba && ba.type === 'series'));
      return [...staticSeries, ...pairs];
    })(),
    photoSeries: (() => {
      if (cmsData?.photo_series?.length) return cmsData.photo_series;
      return staticService.beforeAfter
        .filter((ba: BeforeAfterItem): ba is import('../data/services').PhotoSeries => 'type' in ba && ba.type === 'series')
        .map((ba) => ({ seriesLabel: ba.seriesLabel ?? '', caption: ba.caption, images: ba.images }));
    })(),
    faqs: cmsData?.faqs?.length ? cmsData.faqs : staticService.faqs,
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative bg-navy-900 pt-[100px] sm:pt-[132px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover opacity-40" style={service.heroImagePosition ? { objectPosition: service.heroImagePosition } : undefined} width={1920} height={1080} fetchPriority="high" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end">
            <div>
              <span className="inline-block text-brand-yellow font-semibold text-xs uppercase tracking-[0.2em] mb-5">
                Our Services
              </span>
              <h1
                className="font-display uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white"
                style={{ lineHeight: 1.05 }}
              >
                {service.title}
              </h1>
            </div>
            <div className="lg:pb-2">
              <div className="flex items-center gap-3 mb-5">
                {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-navy-900 hover:bg-brand-yellow transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                )}
                {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-navy-900 hover:bg-brand-yellow transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                )}
                {social.nextdoor && (
                <a
                  href={social.nextdoor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-navy-900 hover:bg-brand-yellow transition-colors duration-300"
                  aria-label="Nextdoor"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.012 2C6.506 2 2.04 6.506 2.04 12.012c0 5.506 4.466 9.988 9.972 9.988 5.506 0 9.988-4.482 9.988-9.988C22 6.506 17.518 2 12.012 2zm4.108 14.508h-2.556v-4.326c0-.924-.462-1.386-1.17-1.386-.792 0-1.386.594-1.386 1.518v4.194H8.452V9.384h2.424v1.062h.036c.396-.66 1.254-1.254 2.34-1.254 1.782 0 2.868 1.062 2.868 3.174v4.142z"/>
                  </svg>
                </a>
                )}
              </div>
              <p className="text-white/50 text-base sm:text-lg leading-[1.85] max-w-md">
                {service.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Scrolling Gallery ── */}
      <ScrollingGallery images={service.galleryImages} />

      {/* ── About Service ── */}
      <section id="about-service" className="py-20 sm:py-28 md:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block text-brand-teal font-semibold text-xs uppercase tracking-[0.2em] mb-5">
                About This Service
              </span>
              <h2
                className="font-display uppercase text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-7"
                style={{ lineHeight: 1.05 }}
              >
                {service.aboutTitle}
              </h2>
              <div className="space-y-4 mb-8">
                {service.description.map((para, idx) => (
                  <p key={idx} className="text-gray-500 text-[15px] sm:text-base leading-[1.9]">
                    {para}
                  </p>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-px bg-gray-100 border border-gray-100">
                {service.highlights.map((h) => (
                  <div key={h.label} className="bg-white p-5">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-1">{h.label}</span>
                    <span className="block text-navy-900 font-semibold text-[15px]">{h.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src={service.aboutImage || service.heroImage}
                alt={service.title}
                className="w-full aspect-[4/5] object-cover"
                width={640}
                height={800}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Bad Movie (Cabinet page only) ── */}
      {slug === 'cabinet-finishing-and-refinishing' && (
        <section className="py-28 sm:py-36 bg-navy-900 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
              <div className="bg-black rounded-lg overflow-hidden flex items-center">
                <div className="relative aspect-video w-full">
                  {service.warningVideo ? (
                    <video
                      src={service.warningVideo}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <>
                      <img
                        src="https://images.pexels.com/photos/6444268/pexels-photo-6444268.jpeg?auto=compress&cs=tinysrgb&w=960&h=540&fit=crop"
                        alt="Peeling cabinet paint"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                          <svg className="w-7 h-7 sm:w-8 sm:h-8 text-navy-900 ml-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div>
                <span className="inline-block text-brand-yellow font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                  A bad movie
                </span>
                <h2
                  className="font-display uppercase text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-7"
                  style={{ lineHeight: 1.05 }}
                >
                  Don't let this be your cabinets.
                </h2>
                <p className="text-gray-400 text-[15px] sm:text-base leading-[1.9] mb-8">
                  Cheap paint, poor prep, and shortcuts lead to peeling, chipping, and frustration within months. Your cabinets deserve better.
                </p>
                <ul className="space-y-3">
                  {[
                    'Peeling and chipping within the first year',
                    'Visible brush strokes and uneven coverage',
                    'No sanding or deglossing before paint',
                    'Wrong product used for high-moisture areas',
                    'Doors that stick shut after repainting',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-brand-yellow flex-shrink-0" />
                      <span className="text-gray-300 text-[15px] leading-[1.7]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Before and After ── */}
      <section className="py-20 sm:py-28 bg-[#f4f3ed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-6">
            <div>
              <span className="inline-block text-brand-teal font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                Transformations
              </span>
              <h2
                className="font-display uppercase text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900"
                style={{ lineHeight: 1.05 }}
              >
                Before and after.
              </h2>
            </div>
            <p className="text-gray-400 text-[14px] leading-[1.8] max-w-xs">
              Drag the slider on any image to reveal the transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {service.beforeAfter
              .filter((ba: BeforeAfterItem) => !('type' in ba && ba.type === 'series'))
              .map((ba: BeforeAfterItem, idx) => (
                <BeforeAfterSlider key={idx} before={(ba as any).before} after={(ba as any).after} caption={ba.caption} />
              ))}
          </div>
        </div>
      </section>

      {/* ── Photo Series (New Construction only) ── */}
      {(() => {
        if (!service.photoSeries || service.photoSeries.length === 0) return null;
        return (
          <section className="py-20 sm:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-6">
                <div>
                  <span className="inline-block text-brand-teal font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                    Job Series
                  </span>
                  <h2
                    className="font-display uppercase text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900"
                    style={{ lineHeight: 1.05 }}
                  >
                    Full job walkthroughs.
                  </h2>
                </div>
                <p className="text-gray-400 text-[14px] leading-[1.8] max-w-xs">
                  Browse all photos from the same project using the arrows.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {service.photoSeries.map((series, idx) => (
                  <PhotoSeriesSlider key={idx} images={series.images} caption={series.caption} seriesLabel={series.seriesLabel} />
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-navy-900">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #2B98BE 0%, transparent 50%), radial-gradient(circle at 75% 50%, #FACF10 0%, transparent 50%)' }} />
        </div>
        <div className="absolute inset-0 border-y border-white/[0.04]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-36">
          <div className="text-center max-w-3xl mx-auto">
            <h2
              className="font-display uppercase text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5"
              style={{ lineHeight: 1.05 }}
            >
              Ready to get started?
            </h2>
            <p className="text-white/50 text-base sm:text-lg leading-[1.85] mb-10 max-w-xl mx-auto">
              Get a free, no-obligation estimate. We respond within 24 hours and most projects are completed in just a few days.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-brand-yellow text-navy-900 font-bold text-[13px] tracking-[0.12em] uppercase hover:bg-[#e6b930] transition-colors"
              >
                GET A FREE ESTIMATE
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a
                href="tel:+18172439116"
                className="group inline-flex items-center justify-center gap-2.5 px-9 py-4 border border-white/20 text-white font-bold text-[13px] tracking-[0.12em] uppercase hover:border-white/40 hover:bg-white/5 transition-all"
              >
                <Phone className="w-4 h-4" />
                (817) 243-9116
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-12">
              {['Free Estimates', 'No Obligation', 'Licensed and Insured', '5-Star Rated'].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
                  <span className="text-white/40 text-[13px] font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <ReviewsTicker />

      {/* ── FAQ ── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <span className="inline-block text-brand-teal font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                Questions
              </span>
              <h2
                className="font-display uppercase text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6"
                style={{ lineHeight: 1.05 }}
              >
                Frequently asked.
              </h2>
              <p className="text-gray-500 text-[15px] leading-[1.85] mb-8">
                Have more questions? We are happy to talk through your project before you commit to anything.
              </p>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-navy-900 text-white font-bold text-[13px] tracking-[0.12em] uppercase hover:bg-[#132d44] transition-colors"
              >
                Ask Us Anything
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>

            <div className="lg:col-span-8">
              <div className="space-y-3">
                {service.faqs.map((faq, idx) => (
                  <FaqItem key={idx} q={faq.q} a={faq.a} open={openFaq === idx} onToggle={() => setOpenFaq(openFaq === idx ? -1 : idx)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <EstimateForm />
      <Footer />
    </div>
  );
}
