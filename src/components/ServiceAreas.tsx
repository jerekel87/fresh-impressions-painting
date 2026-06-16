import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

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

function supabaseImgUrl(url: string, width = 400, quality = 75): string {
  if (!url || !url.includes('/storage/v1/object/public/')) return url;
  const base = url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/');
  return `${base}?width=${width}&quality=${quality}`;
}

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

  useEffect(() => {
    supabase
      .from('services')
      .select('slug, about_image, hero_image')
      .then(({ data }) => {
        if (!data) return;
        const dbMap = new Map(data.map((row) => [row.slug, row]));
        const loaded: ServiceItem[] = [];
        for (const svc of SERVICE_SLUGS) {
          const row = dbMap.get(svc.slug);
          const img = row?.about_image || row?.hero_image;
          if (img) loaded.push({ title: svc.title, slug: svc.slug, image: supabaseImgUrl(img, 400, 75) });
        }
        setItems(loaded);
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

  if (items.length === 0) return null;

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
            className="group relative w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] flex-shrink-0 overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              width={280}
              height={280}
              sizes="(max-width: 640px) 200px, 280px"
              loading="lazy"
              decoding="async"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
