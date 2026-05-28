import { useEffect, useRef, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';
import EstimateForm from '../components/EstimateForm';
import ReviewsTicker from '../components/ReviewsTicker';
import ScrollingGallery from '../components/ScrollingGallery';
import Footer from '../components/Footer';
import { services } from '../data/services';

/* ─── Before/After Slider ─────────────────────────────────────── */

function BeforeAfterSlider({ before, after, caption }: { before: string; after: string; caption: string }) {
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
        <img src={after} alt="After" draggable={false} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width: `${position}%` }}>
          <img src={before} alt="Before" draggable={false} className="absolute inset-0 h-full object-cover pointer-events-none" style={{ width: `${10000 / position}%`, maxWidth: 'none' }} />
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
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? services[slug] : null;
  const [openFaq, setOpenFaq] = useState<number>(0);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!service) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative bg-navy-900 pt-[100px] sm:pt-[132px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover opacity-20" />
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
                src={service.heroImage}
                alt={service.title}
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

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
            {service.beforeAfter.map((ba, idx) => (
              <BeforeAfterSlider key={idx} {...ba} />
            ))}
          </div>
        </div>
      </section>

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
