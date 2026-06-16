import { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

const SERVICE_LIST = [
  { title: 'Interior Painting', slug: 'interior-painting', description: 'Flawless finishes that transform living spaces with warmth and lasting beauty.' },
  { title: 'Exterior Painting', slug: 'exterior-painting', description: 'Professional coatings that protect and elevate your home\'s curb appeal.' },
  { title: 'Brick And Stone Lime Wash', slug: 'brick-and-stone-lime-wash', description: 'Breathable, timeless finishes that add character and charm to masonry surfaces.' },
  { title: 'Cabinet Finishing And Refinishing', slug: 'cabinet-finishing-and-refinishing', description: 'Expert refinishing that gives your kitchen a stunning, like-new transformation.' },
  { title: 'Commercial Painting', slug: 'commercial-painting', description: 'Professional solutions for offices and retail — minimal disruption guaranteed.' },
  { title: 'Drywall Repair And Finishing', slug: 'drywall-repair-and-finishing', description: 'Seamless restoration — the invisible foundation for a flawless paint job.' },
  { title: 'Metal Finishing And Refinishing', slug: 'metal-finishing-and-refinishing', description: 'Durable coatings for metal surfaces — gates, railings, fixtures, and more.' },
  { title: 'New Construction Painting', slug: 'new-construction-painting', description: 'Complete painting solutions for new builds — from primer to final coat.' },
  { title: 'Staining', slug: 'staining', description: 'Protective finishes that preserve and beautify wood surfaces inside and out.' },
];

function supabaseImgUrl(url: string, width = 600, quality = 80): string {
  if (!url || !url.includes('/storage/v1/object/public/')) return url;
  const base = url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/');
  return `${base}?width=${width}&quality=${quality}`;
}

interface ServiceCard {
  title: string;
  slug: string;
  description: string;
  image: string | null;
}

export default function ServicesPreview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollPadding, setScrollPadding] = useState(16);
  const [cards, setCards] = useState<ServiceCard[]>(
    SERVICE_LIST.map((s) => ({ ...s, image: null }))
  );

  useEffect(() => {
    supabase
      .from('services')
      .select('slug, about_image, hero_image')
      .then(({ data }) => {
        if (!data) return;
        const dbMap = new Map(data.map((row) => [row.slug, row]));
        setCards(
          SERVICE_LIST.map((s) => {
            const row = dbMap.get(s.slug);
            const img = row?.about_image || row?.hero_image;
            return { ...s, image: img ? supabaseImgUrl(img) : null };
          })
        );
      });
  }, []);

  const updatePadding = useCallback(() => {
    if (headerRef.current) {
      const rect = headerRef.current.getBoundingClientRect();
      setScrollPadding(rect.left);
    }
  }, []);

  useEffect(() => {
    updatePadding();
    window.addEventListener('resize', updatePadding);
    return () => window.removeEventListener('resize', updatePadding);
  }, [updatePadding]);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.querySelector<HTMLElement>('[data-card]')?.offsetWidth || 360;
    const gap = 20;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -(cardWidth + gap) * 2 : (cardWidth + gap) * 2,
      behavior: 'smooth',
    });
  };

  return (
    <section id="services" className="py-12 sm:py-20 md:py-32 bg-[#f4f3ed] overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-14">
            <div>
              <span className="inline-block text-[#2b98be] font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                Our Services
              </span>
              <h2 className="font-display uppercase text-4xl md:text-5xl lg:text-7xl font-bold text-navy-900 mb-4" style={{ lineHeight: 1.05 }}>
                Our Solutions
              </h2>
              <p className="text-gray-500 text-lg max-w-lg leading-relaxed">
                Comprehensive painting and finishing services tailored to protect, restore, and elevate your property.
              </p>
            </div>
            <div className="flex items-center gap-2.5 sm:gap-3 mt-6 sm:mt-0">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  canScrollLeft
                    ? 'border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white cursor-pointer'
                    : 'border-gray-200 text-gray-300 cursor-not-allowed'
                }`}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  canScrollRight
                    ? 'border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white cursor-pointer'
                    : 'border-gray-200 text-gray-300 cursor-not-allowed'
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-5 overflow-x-auto pr-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', paddingLeft: `${scrollPadding}px` }}
      >
        {cards.map((card, idx) => (
          <div
            key={card.slug}
            data-card
            className="group relative flex-shrink-0 w-[300px] sm:w-[340px] lg:w-[360px] h-[420px] sm:h-[460px] overflow-hidden cursor-pointer bg-navy-900"
          >
            {card.image ? (
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                width={360}
                height={460}
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 360px"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-navy-900 to-[#0f1f2e]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h3 className="text-white text-xl sm:text-2xl font-bold transition-transform duration-500 ease-out group-hover:-translate-y-2">
                {card.title}
              </h3>
              <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-[max-height] duration-500 ease-out">
                <p className="text-white/75 text-sm leading-relaxed max-w-xs mt-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {card.description}
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3 bg-brand-yellow text-navy-900 font-bold text-[13px] tracking-[0.12em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 hover:bg-brand-gold"
                >
                  GET ESTIMATE
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <span className="text-white text-xs font-bold">
                {String(idx + 1).padStart(2, '0')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
