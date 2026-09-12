import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { supabaseImgUrl, supabaseImgSrcSet } from '../lib/imageUrl';

const SERVICE_SLUGS = [
  { title: 'Interior Painting', slug: 'interior-painting' },
  { title: 'Exterior Painting', slug: 'exterior-painting' },
  { title: 'Lime Wash', slug: 'brick-and-stone-lime-wash' },
  { title: 'Cabinet Refinishing', slug: 'cabinet-finishing-and-refinishing' },
  { title: 'Commercial Painting', slug: 'commercial-painting' },
  { title: 'Drywall Repair', slug: 'drywall-repair-and-finishing' },
  { title: 'Metal Finishing', slug: 'metal-finishing-and-refinishing' },
  { title: 'New Construction', slug: 'new-construction-painting' },
  { title: 'Staining', slug: 'staining' },
];

interface ServiceItem {
  title: string;
  slug: string;
  image: string;
}

const MIN_TILES = 18;

export default function ServiceAreas() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase
      .from('services')
      .select('slug, about_image, hero_image')
      .then(({ data }) => {
        if (!data) {
          setLoaded(true);
          return;
        }
        const dbMap = new Map(data.map((row) => [row.slug, row]));
        const found: ServiceItem[] = [];
        for (const svc of SERVICE_SLUGS) {
          const row = dbMap.get(svc.slug);
          const img = row?.about_image || row?.hero_image;
          // store the raw URL; widths are chosen at render time for the srcset
          if (img) found.push({ title: svc.title, slug: svc.slug, image: img });
        }
        setItems(found);
        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || items.length === 0) return;

    let scrollPos = 0;
    const speed = 0.4;
    let paused = false;

    const animate = () => {
      if (!paused && !isDragging.current) {
        scrollPos += speed;
        const halfWidth = container.scrollWidth / 2;
        if (scrollPos >= halfWidth) scrollPos = 0;
        container.style.transform = `translateX(-${scrollPos}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    const pause = () => { paused = true; };
    const resume = () => { setTimeout(() => { paused = false; }, 2000); };

    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', resume);
    container.addEventListener('touchstart', pause);
    container.addEventListener('touchend', resume);

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationRef.current);
      container.removeEventListener('mouseenter', pause);
      container.removeEventListener('mouseleave', resume);
      container.removeEventListener('touchstart', pause);
      container.removeEventListener('touchend', resume);
    };
  }, [items]);

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => { isDragging.current = false; };

  // The tiles are a fixed-height strip. Hold that height while they load so
  // the sections below don't get shoved down when the images arrive.
  if (items.length === 0) {
    return loaded ? null : <section className="bg-navy-900 h-[200px] sm:h-[300px]" aria-hidden="true" />;
  }

  const repeated = Array.from({ length: Math.ceil(MIN_TILES / items.length) }, () => items).flat();
  const allItems = [...repeated, ...repeated];

  return (
    <section className="bg-navy-900 py-0 overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-0 will-change-transform"
        style={{ width: 'max-content' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {allItems.map((item, idx) => (
          <Link
            key={idx}
            to={`/services/${item.slug}`}
            className="group relative w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] flex-shrink-0 overflow-hidden"
          >
            <img
              src={supabaseImgUrl(item.image, 600, 72)}
              srcSet={supabaseImgSrcSet(item.image, [300, 450, 600], 72) || undefined}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              width={300}
              height={300}
              sizes="(max-width: 640px) 200px, 300px"
              loading="lazy"
              decoding="async"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
