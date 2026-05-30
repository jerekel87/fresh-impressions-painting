import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useSocialLinks } from '../lib/useSocialLinks';

const fallbackReels = [
  'https://www.facebook.com/reel/921210067580340',
  'https://www.facebook.com/reel/1290510649726298',
  'https://www.facebook.com/reel/3985571535079039',
];

function ReelCard({ url }: { url: string }) {
  const encodedUrl = encodeURIComponent(url);
  const embedSrc = `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&width=281&show_text=false&t=0`;

  return (
    <div
      data-card
      className="flex-shrink-0 w-[197px] sm:w-[253px] lg:w-[281px]"
    >
      <div className="relative h-[350px] sm:h-[450px] lg:h-[500px] overflow-hidden rounded-sm bg-navy-800">
        <iframe
          src={embedSrc}
          className="absolute inset-0 w-full h-full border-0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default function ReelsShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollPadding, setScrollPadding] = useState(16);
  const [reels, setReels] = useState<string[]>(fallbackReels);
  const social = useSocialLinks();

  useEffect(() => {
    supabase.from('reels').select('url').eq('is_active', true).order('display_order').then(({ data }) => {
      if (data && data.length > 0) setReels(data.map(r => r.url));
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
    const cardWidth = scrollRef.current.querySelector<HTMLElement>('[data-card]')?.offsetWidth || 250;
    const gap = 20;
    const distance = (cardWidth + gap) * 2;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-12 sm:py-20 md:py-32 bg-navy-900 overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-14">
            <div>
              <span className="inline-block text-brand-yellow font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                Project Reels
              </span>
              <h2 className="font-display uppercase text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4" style={{ lineHeight: 1.05 }}>
                See the Difference
              </h2>
              <p className="text-white/50 text-lg max-w-lg leading-relaxed">
                Watch our transformation reels and see firsthand how we bring spaces from ordinary to extraordinary.
              </p>
            </div>
            <div className="flex items-center gap-3 mt-6 sm:mt-0">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  canScrollLeft
                    ? 'border-white/60 text-white hover:bg-white hover:text-navy-900 cursor-pointer'
                    : 'border-white/20 text-white/30 cursor-not-allowed'
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
                    ? 'border-white/60 text-white hover:bg-white hover:text-navy-900 cursor-pointer'
                    : 'border-white/20 text-white/30 cursor-not-allowed'
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <a
                href={social.facebook || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2.5 px-7 py-3 bg-brand-yellow text-navy-900 font-bold text-[13px] tracking-[0.12em] uppercase hover:bg-brand-gold transition-colors duration-300 ml-2"
              >
                Follow for More
                <span className="text-base">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable reels - left edge aligns with header content */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-5 overflow-x-auto pr-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', paddingLeft: `${scrollPadding}px` }}
      >
        {reels.map((url, idx) => (
          <ReelCard key={idx} url={url} />
        ))}
      </div>

    </section>
  );
}
