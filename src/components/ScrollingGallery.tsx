import { useEffect, useRef } from 'react';

interface ScrollingGalleryProps {
  images: string[];
}

export default function ScrollingGallery({ images }: ScrollingGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollPos = 0;
    const speed = 0.5;

    const animate = () => {
      scrollPos += speed;
      const halfWidth = container.scrollWidth / 2;
      if (scrollPos >= halfWidth) {
        scrollPos = 0;
      }
      container.style.transform = `translateX(-${scrollPos}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  const allImages = [...images, ...images];

  return (
    <section className="bg-navy-900 py-0 overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-0 will-change-transform"
        style={{ width: 'max-content' }}
      >
        {allImages.map((src, idx) => (
          <div
            key={idx}
            className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] flex-shrink-0"
          >
            <img
              src={src}
              alt="Fresh Impressions Painting project gallery"
              className="w-full h-full object-cover"
              width={300}
              height={300}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
