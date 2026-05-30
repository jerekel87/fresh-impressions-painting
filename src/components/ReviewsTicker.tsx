import { useState, useEffect } from 'react';
import { Star, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Review {
  text: string;
  author: string;
  source: string;
  rating: number;
}

const fallbackReviews: Review[] = [
  { text: '100/10 experience! They were incredibly quick with response times, from coming out to give us a quote to the start-to-finish turnaround.', author: 'Hailee Schuetze-Roller', source: 'Facebook', rating: 5 },
  { text: 'Highly Recommend! Fresh Impressions Painting went above and beyond our expectations.', author: 'April Smith Evans', source: 'Facebook', rating: 5 },
];

function ReviewLightbox({ review, onClose }: { review: Review; onClose: () => void }) {
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
        className="relative bg-white max-w-lg w-full p-6 sm:p-8 md:p-10 shadow-2xl animate-fade-in"
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
          <div className="w-10 h-10 rounded-full bg-white border border-navy-900/10 flex items-center justify-center flex-shrink-0">
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

function ReviewCard({ review, onSelect }: { review: Review; onSelect: () => void }) {
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
        <div className="w-9 h-9 rounded-full bg-white border border-navy-900/10 flex items-center justify-center flex-shrink-0">
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

function MobileReviewCard({ review, onSelect }: { review: Review; onSelect: () => void }) {
  return (
    <div
      onClick={onSelect}
      className="bg-white border border-gray-100 p-6 cursor-pointer active:bg-gray-50 transition-colors duration-200"
    >
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>

      <p className="text-gray-600 text-[15px] leading-[1.8] mb-5 line-clamp-4">
        "{review.text}"
      </p>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white border border-navy-900/10 flex items-center justify-center flex-shrink-0">
          <span className="font-bold text-xs text-navy-900">
            {review.author.charAt(0)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-navy-900 truncate">{review.author}</p>
        </div>
        <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-sm flex-shrink-0">
          {review.source}
        </span>
      </div>
    </div>
  );
}

export default function ReviewsTicker() {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [header, setHeader] = useState({ headline: 'What our clients say about us.', subtitle: 'Real feedback from homeowners and businesses across North Central Texas who trust Fresh Impressions with their properties.' });

  useEffect(() => {
    supabase.from('reviews').select('text, author, source, rating').eq('is_active', true).order('display_order').then(({ data }) => {
      if (data && data.length > 0) setReviews(data as Review[]);
    });
    supabase.from('site_content').select('content').eq('page', 'home').eq('section', 'reviews').maybeSingle().then(({ data }) => {
      if (data?.content) setHeader(data.content as { headline: string; subtitle: string });
    });
  }, []);

  const mobileReviews = showAll ? reviews : reviews.slice(0, 4);

  return (
    <section id="reviews" className="py-16 sm:py-24 md:py-32 bg-[#f4f3ed] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 md:mb-20">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-end">
          <div>
            <div className="inline-flex items-center gap-0.5 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-navy-900 text-navy-900" />
              ))}
              <span className="text-sm font-bold text-navy-900/70 ml-2">5-Star Rated</span>
            </div>

            <h2
              className="font-display uppercase text-4xl md:text-5xl lg:text-7xl font-bold text-navy-900"
              style={{ lineHeight: 1.05 }}
            >
              {header.headline}
            </h2>
          </div>

          <div className="lg:text-right">
            <p className="text-navy-900/60 text-base md:text-[1.05rem] leading-[1.85] max-w-md lg:ml-auto">
              {header.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile stacked reviews */}
      <div className="sm:hidden px-4">
        <div className="space-y-3">
          {mobileReviews.map((review, idx) => (
            <MobileReviewCard key={idx} review={review} onSelect={() => setSelectedReview(review)} />
          ))}
        </div>
        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="w-full mt-4 py-4 border-2 border-navy-900 bg-white text-navy-900 font-bold text-[13px] tracking-[0.1em] uppercase hover:bg-navy-900 hover:text-white active:bg-navy-800 transition-colors duration-200"
          >
            Show More Reviews ({reviews.length - 4} more)
          </button>
        )}
      </div>

      {/* Desktop scrolling row 1 - left to right */}
      <div className="hidden sm:block relative mb-5 sm:mb-6">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#f4f3ed] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#f4f3ed] to-transparent z-10 pointer-events-none" />
        <div className="flex animate-scroll-left">
          {[...reviews, ...reviews].map((review, idx) => (
            <ReviewCard key={idx} review={review} onSelect={() => setSelectedReview(review)} />
          ))}
        </div>
      </div>

      {/* Desktop scrolling row 2 - right to left */}
      <div className="hidden sm:block relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#f4f3ed] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#f4f3ed] to-transparent z-10 pointer-events-none" />
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
