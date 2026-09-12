import { useState, useEffect } from 'react';
import { ArrowRight, Phone, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Served from public/ (not bundled) so index.html can preload it before the
// JS has even downloaded. Keep these in sync with index.html's preload link
// and with HERO_VERSION in scripts/generate-image-variants.mjs.
const HERO_SRC = '/hero/hero-v1-1920.jpg';
const HERO_SRCSET =
  '/hero/hero-v1-800.jpg 800w, /hero/hero-v1-1280.jpg 1280w, /hero/hero-v1-1920.jpg 1920w';

interface HeroContent {
  headline: string;
  subtitle: string;
  cta_text: string;
  phone: string;
}

const defaults: HeroContent = {
  headline: 'Making Your Space Unrecognizably Fresh And New',
  subtitle: 'Premium craftsmanship for homes and businesses that demand nothing less than flawless.',
  cta_text: 'GET FREE ESTIMATE',
  phone: '(817) 243-9116',
};

export default function Hero() {
  const [content, setContent] = useState<HeroContent>(defaults);

  useEffect(() => {
    const timer = setTimeout(() => {
      supabase.from('site_content').select('content').eq('page', 'home').eq('section', 'hero').maybeSingle().then(({ data }) => {
        if (data?.content) setContent(data.content as HeroContent);
      });
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-[560px] h-[85vh] sm:h-screen sm:min-h-[680px] max-h-[1100px]">
      {/* Full-bleed background */}
      <div className="absolute inset-0">
        <img
          src={HERO_SRC}
          srcSet={HERO_SRCSET}
          sizes="100vw"
          alt="Fresh Impressions Painting van in front of a home"
          className="w-full h-full object-cover object-[center_70%] sm:object-center"
          width={1920}
          height={982}
          fetchpriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/60 to-navy-900/80 sm:from-navy-900/70 sm:via-navy-900/50 sm:to-navy-900/80" />
      </div>

      {/* Content - centered, minimal */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-[75px] sm:pt-[135px] translate-y-5">
        {/* Rating badge - links to the reviews section */}
        <a
          href="#reviews"
          className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-md pl-3.5 pr-4 py-2 mb-6 sm:mb-8 shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:bg-white/15 transition-colors duration-300"
          aria-label="Rated 5.0 on Google. Read our reviews"
        >
          <span className="flex items-center gap-0.5 drop-shadow-[0_0_6px_rgba(250,207,16,0.45)]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-brand-yellow text-brand-yellow" />
            ))}
          </span>
          <span className="w-px h-4 bg-white/25" />
          <span className="text-[12px] sm:text-[13px] font-semibold tracking-[0.08em] uppercase text-white">
            5.0 <span className="text-white/70">Google Rating</span>
          </span>
        </a>

        <h1 className="font-display uppercase text-white text-[clamp(2rem,8vw,6.25rem)] font-bold leading-[1.08] tracking-tight max-w-5xl">
          {content.headline.split('\n').map((line, i) => <span key={i}>{line}{i < content.headline.split('\n').length - 1 && <br />}</span>)}
        </h1>

        <p className="text-white/70 text-base sm:text-lg md:text-xl font-medium max-w-xl mt-4 sm:mt-6 leading-relaxed">
          {content.subtitle}
        </p>

        {/* CTA + Phone number side by side */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-8 sm:mt-10">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 bg-brand-yellow text-navy-900 font-bold text-[13px] sm:text-[14px] tracking-[0.08em] uppercase"
          >
            {content.cta_text}
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={`tel:${content.phone.replace(/[^+\d]/g, '')}`}
            className="flex items-center gap-2 text-white hover:text-brand-yellow transition-colors duration-300"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm sm:text-base font-semibold tracking-wide">{content.phone}</span>
          </a>
        </div>

      </div>

    </section>
  );
}
