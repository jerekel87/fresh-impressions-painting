import { ArrowRight } from 'lucide-react';
import heroBg from '../assets/hero-bg-image1.png';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[560px] h-[85vh] sm:h-screen sm:min-h-[680px] max-h-[1100px]">
      {/* Full-bleed background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Fresh Impressions Painting van in front of a home"
          className="w-full h-full object-cover object-[center_70%] sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/60 to-navy-900/80 sm:from-navy-900/70 sm:via-navy-900/50 sm:to-navy-900/80" />
      </div>

      {/* Content - centered, minimal */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <p className="text-brand-yellow text-[11px] sm:text-[13px] font-semibold tracking-[0.25em] uppercase mb-4 sm:mb-6">
          North Central Texas
        </p>

        <h1 className="font-display uppercase text-white text-[clamp(2rem,7vw,5.5rem)] font-bold leading-[1.08] tracking-tight max-w-4xl">
          Making Your Space<br /> Unrecognizably<br /> Fresh And New
        </h1>

        <p className="text-white/70 text-base sm:text-lg md:text-xl max-w-xl mt-4 sm:mt-6 leading-relaxed">
          Premium craftsmanship for homes and businesses that demand nothing less than flawless.
        </p>

        <a
          href="#contact"
          className="inline-flex items-center gap-3 mt-8 sm:mt-10 px-7 sm:px-9 py-3.5 sm:py-4 bg-brand-yellow text-navy-900 font-bold text-[13px] sm:text-[14px] tracking-[0.08em] uppercase"
        >
          GET FREE ESTIMATE
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

    </section>
  );
}
