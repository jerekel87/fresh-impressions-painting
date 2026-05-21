import { useEffect } from 'react';
import { MapPin, BadgeCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import ServiceAreaMap from '../components/ServiceAreaMap';
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
    cities: ['Granbury (HQ)', 'Acton', 'Tolar', 'Lipan', 'Cresson'],
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

export default function AreasPage() {
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

      {/* Counties Section */}
      <section className="py-16 sm:py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 sm:mb-16">
            <span className="inline-block text-brand-teal font-semibold text-xs uppercase tracking-[0.2em] mb-4">
              Where We Work
            </span>
            <h2
              className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900"
              style={{ lineHeight: 1.05 }}
            >
              Counties we proudly serve
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {counties.map((county) => (
              <div
                key={county.name}
                className="relative border-l-4 border-l-brand-teal bg-[#f8fafb] p-6 sm:p-8 shadow-sm"
              >
                {county.isHQ && (
                  <span className="absolute top-5 right-5 inline-flex items-center gap-1.5 bg-navy-900 text-brand-yellow text-[10px] font-bold uppercase tracking-wider px-3 py-1.5">
                    <MapPin className="w-3 h-3" />
                    HQ
                  </span>
                )}

                <div className="mb-4">
                  <h3 className="font-display uppercase text-xl sm:text-2xl font-bold text-navy-900 tracking-wide">
                    {county.name}
                  </h3>
                  <p className="text-brand-teal text-sm font-medium mt-1">
                    {county.mainCity}, TX
                  </p>
                </div>

                <p className="text-gray-600 text-[15px] leading-[1.8] mb-5">
                  {county.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {county.cities.map((city) => (
                    <span
                      key={city}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-navy-900 bg-white border border-gray-200 px-2.5 py-1.5"
                    >
                      <BadgeCheck className="w-3.5 h-3.5 text-brand-teal fill-brand-teal/20" />
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section - Same as homepage */}
      <ServiceAreaMap />

      {/* Estimate Form */}
      <EstimateForm />

      <Footer />
    </div>
  );
}
