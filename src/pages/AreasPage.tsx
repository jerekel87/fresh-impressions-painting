import { useEffect, useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { useSeo } from '../lib/useSeo';
import Navbar from '../components/Navbar';
import EstimateForm from '../components/EstimateForm';
import Footer from '../components/Footer';

interface County {
  name: string;
  mainCity: string;
  cities: string[];
  description: string;
  isHQ?: boolean;
}

const counties: County[] = [
  {
    name: 'Hood County',
    mainCity: 'Granbury',
    cities: ['Granbury', 'Acton', 'Tolar', 'Lipan', 'Cresson'],
    description:
      'Our home base. Full coverage with priority scheduling for all residential and commercial projects.',
    isHQ: true,
  },
  {
    name: 'Parker County',
    mainCity: 'Weatherford',
    cities: ['Weatherford', 'Aledo', 'Hudson Oaks', 'Willow Park', 'Springtown'],
    description:
      'Complete painting and finishing services across Parker County, from Weatherford to Aledo.',
  },
  {
    name: 'Johnson County',
    mainCity: 'Cleburne',
    cities: ['Cleburne', 'Burleson', 'Joshua', 'Alvarado', 'Keene'],
    description:
      'Serving the Johnson County community with interior, exterior, and commercial painting.',
  },
  {
    name: 'Erath County',
    mainCity: 'Stephenville',
    cities: ['Stephenville', 'Dublin', 'Lingleville', 'Bluff Dale'],
    description:
      'Extended coverage for residential painting and staining projects throughout Erath County.',
  },
  {
    name: 'Somervell County',
    mainCity: 'Glen Rose',
    cities: ['Glen Rose', 'Rainbow', 'Nemo'],
    description:
      'Quality painting services in the Somervell County area, including historic properties.',
  },
];

function CountyRow({ county, isOpen, onToggle }: { county: County; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 sm:gap-8 py-6 sm:py-8 text-left group"
      >
        <div className="flex-1 flex items-center gap-4 sm:gap-6 min-w-0">
          <h3 className="font-display uppercase text-xl sm:text-2xl md:text-3xl font-bold text-navy-900 tracking-wide shrink-0">
            {county.name}
          </h3>
          {county.isHQ && (
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-navy-900 text-brand-yellow text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 shrink-0">
              <MapPin className="w-3 h-3" />
              Headquarters
            </span>
          )}
        </div>

        <div className="hidden md:block text-right shrink-0 mr-4">
          <span className="text-gray-400 text-sm">{county.mainCity}, TX</span>
        </div>

        <ChevronDown
          className={`w-5 h-5 text-gray-300 shrink-0 transition-transform duration-300 group-hover:text-navy-900 ${
            isOpen ? 'rotate-180 text-brand-teal' : ''
          }`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-8 sm:pb-10">
            {county.isHQ && (
              <span className="sm:hidden inline-flex items-center gap-1.5 bg-navy-900 text-brand-yellow text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 mb-4">
                <MapPin className="w-3 h-3" />
                Headquarters
              </span>
            )}
            <p className="text-gray-500 text-[15px] sm:text-base leading-[1.85] mb-6 max-w-xl">
              {county.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {county.cities.map((city) => (
                <span
                  key={city}
                  className="text-[11px] font-medium text-gray-500 uppercase tracking-wider px-3 py-1.5 border border-gray-200"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AreasPage() {
  useSeo('areas');
  const [openIndex, setOpenIndex] = useState(0);

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

      {/* Counties - Accordion List */}
      <section className="py-20 sm:py-28 md:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left column - heading + stats */}
            <div className="lg:col-span-4">
              <span className="inline-block text-brand-teal font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                Where We Work
              </span>
              <h2
                className="font-display uppercase text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6"
                style={{ lineHeight: 1.05 }}
              >
                Counties we proudly serve.
              </h2>
              <p className="text-gray-500 text-[15px] leading-[1.85] mb-10">
                We provide the same level of attention, professionalism, and quality to every project across every county we serve.
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-px bg-gray-100 border border-gray-100">
                <div className="bg-white p-5">
                  <span className="block font-display text-3xl sm:text-4xl font-bold text-navy-900">5</span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mt-1">Counties</span>
                </div>
                <div className="bg-white p-5">
                  <span className="block font-display text-3xl sm:text-4xl font-bold text-navy-900">22</span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mt-1">Cities Served</span>
                </div>
                <div className="bg-white p-5">
                  <span className="block font-display text-3xl sm:text-4xl font-bold text-navy-900">10+</span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mt-1">Years Experience</span>
                </div>
                <div className="bg-white p-5">
                  <span className="block font-display text-3xl sm:text-4xl font-bold text-navy-900">5.0</span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mt-1">Google Rating</span>
                </div>
              </div>
            </div>

            {/* Right column - county accordion */}
            <div className="lg:col-span-8">
              <div className="border-t border-gray-100">
                {counties.map((county, idx) => (
                  <CountyRow
                    key={county.name}
                    county={county}
                    isOpen={openIndex === idx}
                    onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estimate Form */}
      <EstimateForm />

      <Footer />
    </div>
  );
}
