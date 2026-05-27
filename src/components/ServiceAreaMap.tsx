import { MapPin, ArrowRight } from 'lucide-react';

const counties = [
  {
    name: 'Hood County',
    mainCity: 'Granbury',
    cities: ['Granbury', 'Acton', 'Tolar', 'Lipan', 'Cresson'],
    isHQ: true,
  },
  {
    name: 'Parker County',
    mainCity: 'Weatherford',
    cities: ['Weatherford', 'Aledo', 'Hudson Oaks', 'Willow Park', 'Springtown'],
  },
  {
    name: 'Johnson County',
    mainCity: 'Cleburne',
    cities: ['Cleburne', 'Burleson', 'Joshua', 'Alvarado', 'Keene'],
  },
  {
    name: 'Erath County',
    mainCity: 'Stephenville',
    cities: ['Stephenville', 'Dublin', 'Lingleville', 'Bluff Dale'],
  },
  {
    name: 'Somervell County',
    mainCity: 'Glen Rose',
    cities: ['Glen Rose', 'Rainbow', 'Nemo'],
  },
];

export default function ServiceAreaMap() {
  return (
    <section id="service-areas" className="bg-navy-900 py-16 sm:py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 sm:mb-16">
          <div>
            <span className="inline-block text-brand-teal font-semibold text-xs uppercase tracking-[0.2em] mb-4">
              Service Area
            </span>
            <h2 className="font-display uppercase text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4" style={{ lineHeight: 1.05 }}>
              Where we work
            </h2>
            <p className="text-white/50 text-lg max-w-md leading-relaxed">
              Five counties across North Central Texas. Same crew, same quality.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 mt-8 lg:mt-0 px-7 py-3.5 bg-brand-yellow text-navy-900 font-bold text-[13px] tracking-[0.08em] uppercase hover:bg-brand-gold transition-colors duration-300 self-start"
          >
            GET AN ESTIMATE
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* County Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {counties.map((county) => (
            <div
              key={county.name}
              className={`relative p-6 sm:p-8 border transition-colors duration-300 ${
                county.isHQ
                  ? 'border-brand-yellow/30 bg-brand-yellow/[0.04]'
                  : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]'
              }`}
            >
              {county.isHQ && (
                <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 bg-brand-yellow/20 text-brand-yellow text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1">
                  <MapPin className="w-3 h-3" />
                  HQ
                </span>
              )}

              <h3 className="font-display uppercase text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide">
                {county.name}
              </h3>
              <p className="text-brand-teal text-sm font-medium mb-4">
                {county.mainCity}, TX
              </p>

              <div className="flex flex-wrap gap-1.5">
                {county.cities.map((city) => (
                  <span
                    key={city}
                    className="text-[11px] font-medium text-white/40 uppercase tracking-wider px-2.5 py-1 border border-white/[0.08]"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-8 sm:mt-10 pt-8 border-t border-white/[0.06]">
          <p className="text-white/40 text-sm text-center">
            Need service outside these areas? Give us a call — we may be able to accommodate your project.
          </p>
        </div>
      </div>
    </section>
  );
}
