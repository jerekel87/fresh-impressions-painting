import { useEffect, useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import ServiceAreaMap from '../components/ServiceAreaMap';
import EstimateForm from '../components/EstimateForm';
import Footer from '../components/Footer';

interface County {
  name: string;
  mainCity: string;
  cities: string[];
  description: string;
  cityCount: number;
  isHQ?: boolean;
}

const counties: County[] = [
  {
    name: 'Hood County',
    mainCity: 'Granbury',
    cities: ['Granbury', 'Acton', 'Tolar', 'Lipan', 'Cresson'],
    description:
      'Our home base. Full coverage with priority scheduling for all residential and commercial projects.',
    cityCount: 5,
    isHQ: true,
  },
  {
    name: 'Parker County',
    mainCity: 'Weatherford',
    cities: ['Weatherford', 'Aledo', 'Hudson Oaks', 'Willow Park', 'Springtown'],
    description:
      'Complete painting and finishing services across Parker County, from Weatherford to Aledo.',
    cityCount: 5,
  },
  {
    name: 'Johnson County',
    mainCity: 'Cleburne',
    cities: ['Cleburne', 'Burleson', 'Joshua', 'Alvarado', 'Keene'],
    description:
      'Serving the Johnson County community with interior, exterior, and commercial painting.',
    cityCount: 5,
  },
  {
    name: 'Erath County',
    mainCity: 'Stephenville',
    cities: ['Stephenville', 'Dublin', 'Lingleville', 'Bluff Dale'],
    description:
      'Extended coverage for residential painting and staining projects throughout Erath County.',
    cityCount: 4,
  },
  {
    name: 'Somervell County',
    mainCity: 'Glen Rose',
    cities: ['Glen Rose', 'Rainbow', 'Nemo'],
    description:
      'Quality painting services in the Somervell County area, including historic properties.',
    cityCount: 3,
  },
];

export default function AreasPage() {
  const [expandedCounty, setExpandedCounty] = useState<string | null>('Hood County');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-navy-900 pt-[100px] sm:pt-[132px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end">
            <div>
              <span className="inline-block text-brand-yellow font-semibold text-xs uppercase tracking-[0.2em] mb-5">
                Service Areas
              </span>
              <h1
                className="font-display uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white"
                style={{ lineHeight: 1.05 }}
              >
                Five counties.<br />
                One standard of excellence.
              </h1>
            </div>
            <div className="lg:pb-2">
              <p className="text-white/50 text-base sm:text-lg leading-[1.85] max-w-md">
                From our headquarters in Granbury to communities across five Texas counties, we bring the same dedication to quality and craftsmanship to every project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Counties Section - Modern Bento + Accordion */}
      <section className="py-20 sm:py-28 md:py-36 bg-[#0a1e30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 mb-20">
            <div>
              <span className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-white tracking-tight">5</span>
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-white/40 mt-2 font-medium">Counties</p>
            </div>
            <div>
              <span className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-white tracking-tight">22</span>
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-white/40 mt-2 font-medium">Cities Served</p>
            </div>
            <div>
              <span className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-brand-yellow tracking-tight">1</span>
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-white/40 mt-2 font-medium">Standard of Quality</p>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
            {/* HQ Feature Tile */}
            <div className="lg:col-span-5 lg:row-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/[0.06] p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[360px] lg:min-h-[480px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/20 rounded-full px-3.5 py-1.5 mb-6">
                  <MapPin className="w-3.5 h-3.5 text-brand-yellow" />
                  <span className="text-brand-yellow text-[11px] font-semibold uppercase tracking-wider">Headquarters</span>
                </div>
                <h3 className="font-display uppercase text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" style={{ lineHeight: 1.1 }}>
                  Hood<br />County
                </h3>
                <p className="text-white/40 text-sm sm:text-base mt-4 leading-relaxed max-w-sm">
                  Our home base. Full coverage with priority scheduling for all residential and commercial projects.
                </p>
              </div>
              <div className="relative mt-8">
                <div className="flex flex-wrap gap-2">
                  {counties[0].cities.map((city) => (
                    <span
                      key={city}
                      className="text-sm text-white/70 bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-2"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Other Counties - Expandable List */}
            <div className="lg:col-span-7 lg:row-span-2 flex flex-col gap-3">
              {counties.slice(1).map((county) => {
                const isExpanded = expandedCounty === county.name;
                return (
                  <div
                    key={county.name}
                    onClick={() => setExpandedCounty(isExpanded ? null : county.name)}
                    className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 ease-out border ${
                      isExpanded
                        ? 'bg-white/[0.06] border-brand-teal/30 backdrop-blur-sm'
                        : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12]'
                    }`}
                  >
                    <div className="px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between">
                      <div className="flex items-center gap-4 sm:gap-6">
                        <span className="text-2xl sm:text-3xl font-extralight text-white/30 tabular-nums w-8">
                          {county.cityCount}
                        </span>
                        <div>
                          <h3 className="font-display uppercase text-lg sm:text-xl font-bold text-white tracking-wide">
                            {county.name}
                          </h3>
                          <p className="text-white/40 text-sm mt-0.5">{county.mainCity}, TX</p>
                        </div>
                      </div>
                      <ArrowRight className={`w-5 h-5 text-white/30 transition-transform duration-500 ${isExpanded ? 'rotate-90 text-brand-teal' : 'group-hover:text-white/60 group-hover:translate-x-1'}`} />
                    </div>

                    <div className={`overflow-hidden transition-all duration-500 ease-out ${isExpanded ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                        <p className="text-white/50 text-sm leading-relaxed mb-4 pl-12 sm:pl-14">
                          {county.description}
                        </p>
                        <div className="flex flex-wrap gap-2 pl-12 sm:pl-14">
                          {county.cities.map((city) => (
                            <span
                              key={city}
                              className="text-xs text-white/60 bg-white/[0.06] border border-white/[0.08] rounded-full px-3 py-1.5"
                            >
                              {city}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <ServiceAreaMap />

      {/* Estimate Form */}
      <EstimateForm />

      <Footer />
    </div>
  );
}
