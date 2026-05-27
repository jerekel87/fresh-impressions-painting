import { ArrowRight, Phone, Facebook, Instagram } from 'lucide-react';
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

        {/* Phone + Social icons */}
        <div className="flex items-center gap-5 mt-6 sm:mt-8">
          <a
            href="tel:+18172439116"
            className="flex items-center gap-2 text-white/80 hover:text-brand-yellow transition-colors duration-300"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">(817) 243-9116</span>
          </a>

          <div className="w-px h-5 bg-white/20" />

          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/freshimpressionspainting"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/80 hover:bg-brand-yellow hover:border-brand-yellow hover:text-navy-900 transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/freshimpressionspainting"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/80 hover:bg-brand-yellow hover:border-brand-yellow hover:text-navy-900 transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://nextdoor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/80 hover:bg-brand-yellow hover:border-brand-yellow hover:text-navy-900 transition-all duration-300"
              aria-label="Nextdoor"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.012 2C6.506 2 2.04 6.506 2.04 12.012c0 5.506 4.466 9.988 9.972 9.988 5.506 0 9.988-4.482 9.988-9.988C22 6.506 17.518 2 12.012 2zm4.108 14.508h-2.556v-4.326c0-.924-.462-1.386-1.17-1.386-.792 0-1.386.594-1.386 1.518v4.194H8.452V9.384h2.424v1.062h.036c.396-.66 1.254-1.254 2.34-1.254 1.782 0 2.868 1.062 2.868 3.174v4.142z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
