import { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import interiorPainting1 from '../assets/interior-painting1.jpg';
import screenshotMetal1 from '../assets/Screenshot_2026-05-22_at_8.56.25_PM.png';
import screenshotStain from '../assets/Screenshot_2026-05-22_at_9.33.33_PM.png';

const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop`;
const photoDec05 = px(2079234);
const photoJun16 = px(1732414);
const photoFeb27 = px(2121121);
const photoMar13 = px(2251247);
const photoNov30 = px(2098913);
const photoOct26_16 = px(1571459);

const services = [
  {
    title: 'Interior Painting',
    description: 'Flawless finishes that transform living spaces with warmth and lasting beauty.',
    image: interiorPainting1,
  },
  {
    title: 'Exterior Painting',
    description: 'Professional coatings that protect and elevate your home\'s curb appeal.',
    image: photoDec05,
  },
  {
    title: 'Brick And Stone Lime Wash',
    description: 'Breathable, timeless finishes that add character and charm to masonry surfaces.',
    image: photoJun16,
  },
  {
    title: 'Cabinet Finishing And Refinishing',
    description: 'Expert refinishing that gives your kitchen a stunning, like-new transformation.',
    image: photoFeb27,
  },
  {
    title: 'Commercial Painting',
    description: 'Professional solutions for offices and retail — minimal disruption guaranteed.',
    image: photoMar13,
  },
  {
    title: 'Drywall Repair And Finishing',
    description: 'Seamless restoration — the invisible foundation for a flawless paint job.',
    image: photoNov30,
  },
  {
    title: 'Metal Finishing And Refinishing',
    description: 'Durable coatings for metal surfaces — gates, railings, fixtures, and more.',
    image: screenshotMetal1,
  },
  {
    title: 'New Construction Painting',
    description: 'Complete painting solutions for new builds — from primer to final coat.',
    image: photoOct26_16,
  },
  {
    title: 'Staining',
    description: 'Protective finishes that preserve and beautify wood surfaces inside and out.',
    image: screenshotStain,
  },
];

export default function ServicesPreview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollPadding, setScrollPadding] = useState(16);

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
    const distance = (cardWidth + gap) * 2;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  return (
    <section id="services" className="py-12 sm:py-20 md:py-32 bg-[#f4f3ed] overflow-hidden">
      {/* Header - uses same padding structure as AboutUs section */}
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
            {/* Arrow controls */}
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

      {/* Scrollable cards - left edge aligns with header content */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-5 overflow-x-auto pr-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', paddingLeft: `${scrollPadding}px` }}
      >
        {services.map((service, idx) => (
          <div
            key={service.title}
            data-card
            className="group relative flex-shrink-0 w-[300px] sm:w-[340px] lg:w-[360px] h-[420px] sm:h-[460px] overflow-hidden cursor-pointer"
          >
            <img
              src={service.image}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              width={360}
              height={460}
              sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 360px"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

            {/* Content - title visible by default, description + CTA revealed on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h3 className="text-white text-xl sm:text-2xl font-bold transition-transform duration-500 ease-out group-hover:-translate-y-2">
                {service.title}
              </h3>
              <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-[max-height] duration-500 ease-out">
                <p className="text-white/75 text-sm leading-relaxed max-w-xs mt-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {service.description}
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

            {/* Top-right number */}
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
