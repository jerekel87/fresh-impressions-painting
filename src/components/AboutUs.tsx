import { useState, useEffect } from 'react';
import aboutImg from '../assets/about-us.jpg';
import { Award, MapPin, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Stats are CMS-driven, so icons map by position: experience, coverage, rating.
// All three stay line icons at the same stroke weight so the row reads as a set.
const STAT_ICONS = [Award, MapPin, Star];

interface AboutContent {
  headline: string;
  description: string;
  stats: { value: string; label: string }[];
  founder_name: string;
  founder_title: string;
}

const defaults: AboutContent = {
  headline: 'Expert craftsmanship, built on integrity.',
  description: 'Founded in 2022 by Ian Rosenkranz, Fresh Impressions was built on a clear mission — help families and businesses transform their spaces with expert craftsmanship, lasting quality, and a fresh new look.',
  stats: [
    { value: '10+', label: 'Years in the Industry' },
    { value: '5', label: 'Counties Served' },
    { value: '5.0', label: 'Google Rating' },
  ],
  founder_name: 'Ian Rosenkranz',
  founder_title: 'Founder & Owner',
};

export default function AboutUs() {
  const [content, setContent] = useState<AboutContent>(defaults);

  useEffect(() => {
    supabase.from('site_content').select('content').eq('page', 'home').eq('section', 'about').maybeSingle().then(({ data }) => {
      if (data?.content) setContent(data.content as AboutContent);
    });
  }, []);

  return (
    <section id="about" className="py-12 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <span className="inline-block text-brand-teal font-semibold text-xs uppercase tracking-[0.2em] mb-4">
              About Us
            </span>

            <h2
              className="font-display uppercase text-4xl md:text-5xl lg:text-7xl font-bold text-navy-900 mb-6"
              style={{ lineHeight: 1.05 }}
            >
              {content.headline}
            </h2>

            <p className="text-gray-500 text-base md:text-[1.05rem] leading-[1.85] mb-10 max-w-lg">
              {content.description}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border-y border-[#e8e0d8] divide-y divide-[#e8e0d8] sm:divide-y-0 sm:divide-x">
              {content.stats.map((stat, idx) => {
                const Icon = STAT_ICONS[idx % STAT_ICONS.length];
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-4 py-5 sm:flex-col sm:items-start sm:gap-0 sm:py-8 sm:px-6 sm:first:pl-0 sm:last:pr-0"
                  >
                    <Icon className="w-8 h-8 flex-shrink-0 text-brand-teal sm:mb-5" strokeWidth={1.5} />
                    <div className="min-w-0">
                      <p className="font-display text-4xl lg:text-5xl font-bold text-navy-900 leading-none">
                        {stat.value}
                      </p>
                      <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400 leading-snug">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right: Image */}
          <div className="relative">
            <img
              src={aboutImg}
              alt="Ian Rosenkranz, owner of Fresh Impressions Painting"
              className="w-full aspect-[4/5] object-cover object-top"
              width={640}
              height={800}
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-900/80 to-transparent pt-16 pb-6 px-6">
              <p className="text-white font-bold text-lg">{content.founder_name}</p>
              <p className="text-white/60 text-sm">{content.founder_title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
