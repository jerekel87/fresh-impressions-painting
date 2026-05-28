import aboutImg from '../assets/about-us.jpg';
import { Star } from 'lucide-react';

export default function AboutUs() {
  return (
    <section id="about" className="py-12 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-0.5 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-sm font-medium text-gray-600 ml-2">5-Star Rated</span>
            </div>

            <h2
              className="font-display uppercase text-4xl md:text-5xl lg:text-7xl font-bold text-navy-900 mb-6"
              style={{ lineHeight: 1.05 }}
            >
              Expert craftsmanship,<br className="hidden md:block" />
              built on integrity.
            </h2>

            <p className="text-gray-500 text-base md:text-[1.05rem] leading-[1.85] mb-10 max-w-lg">
              Founded in 2022 by Ian Rosenkranz, Fresh Impressions was built on a
              clear mission — help families and businesses transform their spaces
              with expert craftsmanship, lasting quality, and a fresh new look.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <svg className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] flex-shrink-0" viewBox="0 0 24 24" fill="#2b98be" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 11H11V7h1.5v4.68l4.03 2.42-.75 1.23L12.5 13z"/>
                  </svg>
                  <p className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900">10+</p>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">Years in the Industry</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <svg className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] flex-shrink-0" viewBox="0 0 24 24" fill="#2b98be" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <p className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900">5</p>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">Counties Served</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <svg className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] flex-shrink-0" viewBox="0 0 24 24" fill="#2b98be" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  <p className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900">5.0</p>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">Google Rating</p>
              </div>
            </div>

          </div>

          {/* Right: Image */}
          <div className="relative">
            <img
              src={aboutImg}
              alt="Ian Rosenkranz, owner of Fresh Impressions Painting"
              className="w-full aspect-[4/5] object-cover object-top"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-900/80 to-transparent pt-16 pb-6 px-6">
              <p className="text-white font-bold text-lg">Ian Rosenkranz</p>
              <p className="text-white/60 text-sm">Founder & Owner</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
