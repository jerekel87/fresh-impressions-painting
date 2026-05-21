import { useEffect, useRef, useState } from 'react';
import { MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface County {
  name: string;
  mainCity: string;
  cities: string[];
  description: string;
  coords: [number, number];
  isHQ?: boolean;
}

const counties: County[] = [
  {
    name: 'Hood County',
    mainCity: 'Granbury',
    cities: ['Granbury (HQ)', 'Acton', 'Tolar', 'Lipan', 'Cresson'],
    description:
      'Our home base. Full coverage with priority scheduling for all residential and commercial projects.',
    coords: [32.43, -97.83],
    isHQ: true,
  },
  {
    name: 'Parker County',
    mainCity: 'Weatherford',
    cities: ['Weatherford', 'Aledo', 'Hudson Oaks', 'Willow Park', 'Springtown'],
    description:
      'Complete painting and finishing services across Parker County, from Weatherford to Aledo.',
    coords: [32.77, -97.80],
  },
  {
    name: 'Johnson County',
    mainCity: 'Cleburne',
    cities: ['Cleburne', 'Burleson', 'Joshua', 'Alvarado', 'Keene'],
    description:
      'Serving the Johnson County community with interior, exterior, and commercial painting.',
    coords: [32.35, -97.39],
  },
  {
    name: 'Erath County',
    mainCity: 'Stephenville',
    cities: ['Stephenville', 'Dublin', 'Lingleville', 'Bluff Dale'],
    description:
      'Extended coverage for residential painting and staining projects throughout Erath County.',
    coords: [32.24, -98.23],
  },
  {
    name: 'Somervell County',
    mainCity: 'Glen Rose',
    cities: ['Glen Rose', 'Rainbow', 'Nemo'],
    description:
      'Quality painting services in the Somervell County area, including historic properties.',
    coords: [32.22, -97.77],
  },
];

export default function AreasPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [32.43, -97.80],
      zoom: 9,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    counties.forEach((county) => {
      const marker = L.circleMarker(county.coords, {
        radius: county.isHQ ? 12 : 9,
        fillColor: county.isHQ ? '#FACF10' : '#2B98BE',
        color: '#10263C',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.85,
      }).addTo(map);

      marker.bindTooltip(county.name, {
        permanent: false,
        direction: 'top',
        className: 'county-tooltip',
      });

      marker.on('click', () => {
        setSelectedCounty(county.name);
        map.flyTo(county.coords, 11, { duration: 1.2 });
      });
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const handleCountyClick = (county: County) => {
    setSelectedCounty(county.name);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(county.coords, 11, { duration: 1.2 });
    }
  };

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
              className="font-display uppercase text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900"
              style={{ lineHeight: 1.05 }}
            >
              Counties we proudly serve
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {counties.map((county) => (
              <div
                key={county.name}
                onClick={() => handleCountyClick(county)}
                className={`group relative border rounded-lg p-6 sm:p-8 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-brand-teal/40 hover:-translate-y-1 ${
                  selectedCounty === county.name
                    ? 'border-brand-teal shadow-lg bg-brand-teal/[0.03]'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {county.isHQ && (
                  <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    <MapPin className="w-3 h-3" />
                    Headquarters
                  </span>
                )}

                <div className="mb-4">
                  <h3 className="font-display uppercase text-xl sm:text-2xl font-bold text-navy-900 tracking-wide">
                    {county.name}
                  </h3>
                  <p className="text-brand-teal text-sm font-medium mt-1">
                    {county.mainCity}
                  </p>
                </div>

                <p className="text-gray-600 text-[15px] leading-[1.8] mb-5">
                  {county.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {county.cities.map((city) => (
                    <span
                      key={city}
                      className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full group-hover:bg-brand-teal/[0.06] group-hover:text-navy-900 transition-colors duration-300"
                    >
                      <CheckCircle className="w-3 h-3 text-brand-teal/70" />
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 sm:py-24 md:py-32 bg-[#f4f7fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-14">
            <span className="inline-block text-brand-teal font-semibold text-xs uppercase tracking-[0.2em] mb-4">
              Interactive Map
            </span>
            <h2
              className="font-display uppercase text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900"
              style={{ lineHeight: 1.05 }}
            >
              Find us on the map
            </h2>
          </div>

          <div className="rounded-lg overflow-hidden shadow-xl border border-gray-200">
            <div
              ref={mapRef}
              className="w-full h-[400px] sm:h-[500px] lg:h-[560px]"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-brand-yellow border-2 border-navy-900" />
              <span>Headquarters (Hood County)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-brand-teal border-2 border-navy-900" />
              <span>Service Area</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 md:py-32 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-brand-yellow font-semibold text-xs uppercase tracking-[0.2em] mb-5">
            Get in Touch
          </span>
          <h2
            className="font-display uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ lineHeight: 1.05 }}
          >
            Not sure if we service your area?
          </h2>
          <p className="text-white/50 text-base sm:text-lg leading-[1.85] max-w-2xl mx-auto mb-10">
            Get in touch and we will let you know. We are always looking to grow our service area and would love to hear from you.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2.5 bg-brand-yellow text-navy-900 font-display uppercase font-bold text-sm sm:text-base tracking-wider px-8 py-4 rounded hover:bg-white transition-colors duration-300 group"
          >
            Get an Estimate
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
