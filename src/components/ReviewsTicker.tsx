import { useState, useEffect } from 'react';
import { Star, X } from 'lucide-react';

const reviews = [
  {
    text: '100/10 experience! They were incredibly quick with response times, from coming out to give us a quote to the start-to-finish turnaround. I\'ve been unhappy with my cabinet stain for the last 4 years, and now I\'m absolutely obsessed with our cabinet refinish! Could not recommend a better group of guys!',
    author: 'Hailee Schuetze-Roller',
    source: 'Facebook',
    rating: 5,
  },
  {
    text: 'Highly Recommend! Fresh Impressions Painting went above and beyond our expectations. We had a small job, but it was treated like a huge one. They were prompt, thorough and nothing short of perfection.',
    author: 'April Smith Evans',
    source: 'Facebook',
    rating: 5,
  },
  {
    text: 'Cannot recommend this company enough! We had our cabinets custom made through Starnes Custom Cabinetry in Glen Rose, and they actually recommended Fresh Impressions to us. Ian was very thorough, making sure our newly installed cabinets and granite tops were cared for properly and protected the whole time. We asked for the whitest white, and that\'s exactly what he delivered. SUCH a beautiful job, and he was incredible to work with.',
    author: 'Christy Scott Karnes',
    source: 'Facebook',
    rating: 5,
  },
  {
    text: 'We just had our house repainted to freshen up the blue paint that had faded. It looks so good! Ian is a pleasure to work with and we couldn\'t be happier. Definitely recommend him.',
    author: 'Amanda Pogue',
    source: 'Facebook',
    rating: 5,
  },
  {
    text: 'We couldn\'t be more pleased with the professional work and experience that we received with Fresh Impressions Painting. I would highly recommend for your painting needs.',
    author: 'Brian Pogue',
    source: 'Facebook',
    rating: 5,
  },
  {
    text: 'I had a wonderful experience with Fresh Impressions Painting. They did an excellent job painting my home—everything looks clean, bright, and beautifully finished. They were professional, punctual, and took great care with every detail. Highly recommend their work!',
    author: 'Teri Lucas',
    source: 'Facebook',
    rating: 5,
  },
  {
    text: 'My Wife and I are extremely pleased with the professionalism, and job that was done on our house. Ian on the job site was very courteous and thoughtful and how he handled everything around the house not only did the house turn out wonderful as far as the paint/lime wash, but the cleanup and attention to detail was fantastic.',
    author: 'Lou Dina Coppo',
    source: 'Facebook',
    rating: 5,
  },
  {
    text: 'Highly Recommend! Ian was fantastic - explained in detail what would be done in each of the 3 projects we had - all drywall repairs and painting. Removed an old skylight panel and seamlessly blended the drywall texture to match the rest of the ceiling. Ian started at 8 each morning, placed protective drop mats to protect the floors, cleaned up very well when done and his quality of work was great! Will use him again.',
    author: 'Patrick and Jodi Wall',
    source: 'Facebook',
    rating: 5,
  },
  {
    text: 'Thank you, Ian, for the job you did. Prompt and professional. I won\'t hesitate to use you again if needed.',
    author: 'Johnny Paul',
    source: 'Facebook',
    rating: 5,
  },
  {
    text: 'Fresh Impressions did an absolutely amazing job painting not only our entire interior home but also all our cabinets (kitchen, baths, laundry room) and they look so, so great - very beautiful with a luxurious, professional finish. If you need your cabinets redone/refinished, Ian with Fresh Impressions is the man for you! We highly recommend Fresh Impressions!! Thank you so much, Ian!!!',
    author: 'Michele Holmes',
    source: 'Facebook',
    rating: 5,
  },
  {
    text: 'Ian did a wonderful job fixing a settlement crack in my house. He did a perfect job with the paint & texture. He\'s a great Christian man and a personal friend. I highly recommend him.',
    author: 'Dale Walker',
    source: 'Facebook',
    rating: 5,
  },
  {
    text: 'Ian did a fantastic job on our linen closet! Highly recommend!',
    author: 'Kari McCullough Yeager',
    source: 'Facebook',
    rating: 5,
  },
  {
    text: 'Ian is a master. I give him the highest rating possible. Bonus, he is super tidy, loved on my dogs and a man of his word. Perfection isn\'t always easy to find these days, but Ian does it!',
    author: 'Laura Paulsen',
    source: 'Facebook',
    rating: 5,
  },
  {
    text: 'We had Ian paint our kitchen, bathrooms and laundry cabinets, he did a great job. He is very professional, and patient. He helped us picked the color, and gave us great ideas. We recommend Fresh Impression Painting to do your job.',
    author: 'Karem Rodriguez de Heartsill',
    source: 'Facebook',
    rating: 5,
  },
];

function ReviewLightbox({ review, onClose }: { review: typeof reviews[0]; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white max-w-lg w-full p-8 sm:p-10 shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1 mb-6">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        <p className="text-gray-700 text-base leading-[1.9] mb-8">
          "{review.text}"
        </p>

        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#f4f7fa] border border-gray-100 flex items-center justify-center flex-shrink-0">
            <span className="font-bold text-sm text-navy-900">
              {review.author.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-navy-900">{review.author}</p>
          </div>
          <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-sm flex-shrink-0">
            {review.source}
          </span>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review, onSelect }: { review: typeof reviews[0]; onSelect: () => void }) {
  return (
    <div
      onClick={onSelect}
      className="flex-shrink-0 w-[320px] sm:w-[380px] bg-white border border-gray-100 p-7 sm:p-8 mx-2.5 sm:mx-3 hover:border-gray-200 hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 cursor-pointer"
    >
      <div className="flex items-center gap-1 mb-5">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>

      <p className="text-gray-600 text-[15px] leading-[1.8] mb-7 line-clamp-5">
        "{review.text}"
      </p>

      <div className="flex items-center gap-3.5">
        <div className="w-9 h-9 rounded-full bg-[#f4f7fa] border border-gray-100 flex items-center justify-center flex-shrink-0">
          <span className="font-bold text-xs text-navy-900">
            {review.author.charAt(0)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-navy-900">{review.author}</p>
        </div>
        <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-sm flex-shrink-0">
          {review.source}
        </span>
      </div>
    </div>
  );
}

export default function ReviewsTicker() {
  const [selectedReview, setSelectedReview] = useState<typeof reviews[0] | null>(null);

  return (
    <section id="reviews" className="py-16 sm:py-24 md:py-32 bg-[#f4f7fa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 sm:mb-20">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-end">
          <div>
            <div className="inline-flex items-center gap-0.5 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-sm font-medium text-gray-600 ml-2">5-Star Rated</span>
            </div>

            <h2
              className="font-display uppercase text-4xl md:text-5xl lg:text-7xl font-bold text-navy-900"
              style={{ lineHeight: 1.05 }}
            >
              What our clients<br className="hidden md:block" />
              say about us.
            </h2>
          </div>

          <div className="lg:text-right">
            <p className="text-gray-500 text-base md:text-[1.05rem] leading-[1.85] max-w-md lg:ml-auto">
              Real feedback from homeowners and businesses across North Central Texas who trust Fresh Impressions with their properties.
            </p>
          </div>
        </div>
      </div>

      {/* Scrolling row 1 - left to right */}
      <div className="relative mb-5 sm:mb-6">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#f4f7fa] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#f4f7fa] to-transparent z-10 pointer-events-none" />
        <div className="flex animate-scroll-left">
          {[...reviews, ...reviews].map((review, idx) => (
            <ReviewCard key={idx} review={review} onSelect={() => setSelectedReview(review)} />
          ))}
        </div>
      </div>

      {/* Scrolling row 2 - right to left */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#f4f7fa] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#f4f7fa] to-transparent z-10 pointer-events-none" />
        <div className="flex animate-scroll-right">
          {[...reviews.slice(7), ...reviews.slice(0, 7), ...reviews.slice(7), ...reviews.slice(0, 7)].map((review, idx) => (
            <ReviewCard key={idx} review={review} onSelect={() => setSelectedReview(review)} />
          ))}
        </div>
      </div>

      {selectedReview && (
        <ReviewLightbox review={selectedReview} onClose={() => setSelectedReview(null)} />
      )}
    </section>
  );
}
