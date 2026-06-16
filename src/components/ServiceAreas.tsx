import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import interiorPainting1 from '../assets/interior-painting1.jpg';
import screenshotMetal1 from '../assets/Screenshot_2026-05-22_at_8.56.25_PM.png';
import screenshotStain from '../assets/Screenshot_2026-05-22_at_9.33.33_PM.png';

const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop`;
const photoDec05 = px(2079234);
const photoJun16 = px(1732414);
const photoFeb27 = px(2121121);
const photoMar13 = px(2251247);
const photoNov30 = px(2098913);
const photoOct26_16 = px(1571459);

const serviceItems = [
  { title: 'Interior Painting', slug: 'interior-painting', image: interiorPainting1 },
  { title: 'Exterior Painting', slug: 'exterior-painting', image: photoDec05 },
  { title: 'Lime Wash', slug: 'brick-and-stone-lime-wash', image: photoJun16 },
  { title: 'Cabinet Refinishing', slug: 'cabinet-finishing-and-refinishing', image: photoFeb27 },
  { title: 'Commercial Painting', slug: 'commercial-painting', image: photoMar13 },
  { title: 'Drywall Repair', slug: 'drywall-repair-and-finishing', image: photoNov30 },
  { title: 'Metal Finishing', slug: 'metal-finishing-and-refinishing', image: screenshotMetal1 },
  { title: 'New Construction', slug: 'new-construction-painting', image: photoOct26_16 },
  { title: 'Staining', slug: 'staining', image: screenshotStain },
];

export default function ServiceAreas() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollPos = 0;
    const speed = 0.4;
    let paused = false;

    const animate = () => {
      if (!paused && !isDragging.current) {
        scrollPos += speed;
        const halfWidth = container.scrollWidth / 2;
        if (scrollPos >= halfWidth) {
          scrollPos = 0;
        }
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
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const diff = startX.current - e.touches[0].clientX;
    scrollLeft.current += diff;
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const allItems = [...serviceItems, ...serviceItems];

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
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
