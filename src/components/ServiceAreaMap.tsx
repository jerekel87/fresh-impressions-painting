import { useState, useEffect, useRef } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface County {
  id: string;
  name: string;
  mainCity: string;
  cities: string[];
  description: string;
  center: [number, number];
}

const counties: County[] = [
  {
    id: 'hood',
    name: 'Hood County',
    mainCity: 'Granbury, TX',
    cities: ['Granbury', 'Acton', 'Tolar', 'Lipan', 'Cresson'],
    description: 'Our home base. Full coverage with priority scheduling for all residential and commercial projects.',
    center: [32.43, -97.83],
  },
  {
    id: 'parker',
    name: 'Parker County',
    mainCity: 'Weatherford, TX',
    cities: ['Weatherford', 'Aledo', 'Hudson Oaks', 'Willow Park', 'Springtown'],
    description: 'Complete painting and finishing services across Parker County, from Weatherford to Aledo.',
    center: [32.77, -97.80],
  },
  {
    id: 'johnson',
    name: 'Johnson County',
    mainCity: 'Cleburne, TX',
    cities: ['Cleburne', 'Burleson', 'Joshua', 'Alvarado', 'Keene'],
    description: 'Serving the Johnson County community with interior, exterior, and commercial painting.',
    center: [32.35, -97.39],
  },
  {
    id: 'erath',
    name: 'Erath County',
    mainCity: 'Stephenville, TX',
    cities: ['Stephenville', 'Dublin', 'Lingleville', 'Bluff Dale'],
    description: 'Extended coverage for residential painting and staining projects throughout Erath County.',
    center: [32.24, -98.23],
  },
  {
    id: 'somervell',
    name: 'Somervell County',
    mainCity: 'Glen Rose, TX',
    cities: ['Glen Rose', 'Rainbow', 'Nemo'],
    description: 'Quality painting services in the Somervell County area, including historic properties.',
    center: [32.22, -97.77],
  },
];

export default function ServiceAreaMap() {
  const [selectedId, setSelectedId] = useState<string | null>('hood');
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.CircleMarker>>(new Map());
  const selectedIdRef = useRef<string | null>(selectedId);

  selectedIdRef.current = selectedId;

  const selected = counties.find((c) => c.id === selectedId) || null;

  function selectCounty(id: string) {
    if (id === selectedIdRef.current) {
      setSelectedId(null);
      if (mapInstance.current) {
        mapInstance.current.flyTo([32.45, -97.80], 9, { duration: 0.6 });
      }
      return;
    }
    setSelectedId(id);
    const county = counties.find((c) => c.id === id);
    if (county && mapInstance.current) {
      mapInstance.current.flyTo(county.center, 11, { duration: 0.8 });
    }
  }

  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      if (id === selectedId) {
        marker.setStyle({ radius: 8, fillColor: '#2b98be', color: '#2b98be', weight: 2, fillOpacity: 0.9 });
      } else {
        marker.setStyle({ radius: 5, fillColor: '#2b98be', color: '#2b98be', weight: 1.5, fillOpacity: 0.5 });
      }
    });
  }, [selectedId]);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [32.45, -97.80],
      zoom: 9,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      minZoom: 8,
      maxZoom: 13,
    });

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      { maxZoom: 19 }
    ).addTo(map);

    L.control.zoom({ position: 'topright' }).addTo(map);

    counties.forEach((county) => {
      const isSelected = county.id === 'hood';
      const marker = L.circleMarker(county.center, {
        radius: isSelected ? 8 : 5,
        fillColor: '#2b98be',
        color: '#2b98be',
        weight: isSelected ? 2 : 1.5,
        fillOpacity: isSelected ? 0.9 : 0.5,
      }).addTo(map);

      marker.on('click', () => selectCounty(county.id));
      markersRef.current.set(county.id, marker);
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
      markersRef.current.clear();
    };
  }, []);

  return (
    <section id="service-areas" className="bg-navy-900 py-12 sm:py-20 md:py-32">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 sm:mb-14">
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

            {/* County tabs - desktop */}
            <div className="hidden lg:flex items-center gap-1 mt-6 lg:mt-0">
              {counties.map((county) => {
                const isActive = county.id === selectedId;
                return (
                  <button
                    key={county.id}
                    onClick={() => selectCounty(county.id)}
                    className={`px-4 py-2.5 text-sm font-medium transition-all duration-200 border-b-2 ${
                      isActive
                        ? 'text-white border-brand-yellow'
                        : 'text-white/40 border-transparent hover:text-white/70'
                    }`}
                  >
                    {county.name.replace(' County', '')}
                    {county.id === 'hood' && (
                      <span className="ml-2 text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 bg-brand-yellow/20 text-brand-yellow">
                        HQ
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Map area */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-0 h-[400px] sm:h-[480px] lg:h-[560px]">
            <div ref={mapRef} className="absolute inset-0" />

            {/* Info card overlay */}
            {selected && (
              <div className="absolute bottom-0 left-0 z-[1000] max-w-[320px]">
                {/* Blue backing layer */}
                <div className="absolute inset-0 bg-brand-teal/10" />
                {/* White card */}
                <div className="relative bg-white p-5 sm:p-6 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-brand-teal" />
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                      {selected.name}
                    </span>
                  </div>
                  <h4 className="text-navy-900 font-bold text-xl mb-3">
                    {selected.mainCity}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {selected.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selected.cities.map((city) => (
                      <span
                        key={city}
                        className="text-[11px] font-medium text-gray-500 uppercase tracking-wider px-2.5 py-1 border border-gray-200"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Mobile county selector */}
            <div className="absolute top-4 left-4 right-4 z-[1000] lg:hidden">
              <div className="flex gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                {counties.map((county) => {
                  const isActive = county.id === selectedId;
                  return (
                    <button
                      key={county.id}
                      onClick={() => selectCounty(county.id)}
                      className={`flex-shrink-0 px-3 py-2 text-xs font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-brand-yellow text-navy-900'
                          : 'bg-navy-900/80 backdrop-blur-sm text-white/70 border border-white/10'
                      }`}
                    >
                      {county.name.replace(' County', '')}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA bar */}
      <div className="px-4 sm:px-6 lg:px-8 mt-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 sm:py-8 border-t border-white/[0.06]">
            <p className="text-white/50 text-base mb-4 sm:mb-0">
              Need service outside these areas? Let's talk.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-brand-yellow text-navy-900 font-bold text-[13px] tracking-[0.08em] uppercase hover:bg-brand-gold transition-colors duration-300"
            >
              GET AN ESTIMATE
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
