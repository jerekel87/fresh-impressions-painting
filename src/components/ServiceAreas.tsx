import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import interiorPainting1 from '../assets/interior-painting1.jpg';
import photoDec05 from '../assets/Photo_Dec_05_2022,_4_16_16_PM.jpg';
import photoJun16 from '../assets/Photo_Jun_16_2022,_4_46_05_PM.jpg';
import photoFeb27 from '../assets/Photo_Feb_27_2026,_3_40_59_PM.jpg';
import photoMar13 from '../assets/Photo_Mar_13_2025,_7_14_48_PM.jpg';
import photoNov30 from '../assets/Photo_Nov_30_2018,_3_20_20_PM.jpg';
import screenshotMetal1 from '../assets/Screenshot_2026-05-22_at_8.56.25_PM.png';
import photoOct26_16 from '../assets/Photo_Oct_26_2021,_1_37_16_PM.jpg';
import screenshotStain from '../assets/Screenshot_2026-05-22_at_9.33.33_PM.png';

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
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
              <span className="text-white font-bold text-sm sm:text-base tracking-wide drop-shadow-lg">
                {item.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
