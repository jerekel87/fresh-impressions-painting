import { useEffect, useState, useCallback } from 'react';
import { Save, Plus, Trash2, Check, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface HeroContent {
  headline: string;
  subtitle: string;
  cta_text: string;
  phone: string;
}

interface AboutStat {
  value: string;
  label: string;
}

interface AboutContent {
  headline: string;
  description: string;
  stats: AboutStat[];
  founder_name: string;
  founder_title: string;
}

interface ReviewsHeader {
  headline: string;
  subtitle: string;
}

interface Review {
  id: string;
  text: string;
  author: string;
  source: string;
  rating: number;
  display_order: number;
  is_active: boolean;
}

interface Reel {
  id: string;
  url: string;
  display_order: number;
  is_active: boolean;
}

type Tab = 'hero' | 'about' | 'reviews' | 'reels';

function StatusBadge({ saving, saved }: { saving: boolean; saved: boolean }) {
  if (saving) return (
    <span className="inline-flex items-center gap-1.5 text-brand-teal text-xs font-medium">
      <div className="w-3 h-3 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
      Saving...
    </span>
  );
  if (saved) return (
    <span className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
      <Check className="w-3.5 h-3.5" />
      Saved
    </span>
  );
  return null;
}

export default function HomeEditor() {
  const [activeTab, setActiveTab] = useState<Tab>('hero');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const [hero, setHero] = useState<HeroContent>({ headline: '', subtitle: '', cta_text: '', phone: '' });
  const [about, setAbout] = useState<AboutContent>({ headline: '', description: '', stats: [], founder_name: '', founder_title: '' });
  const [reviewsHeader, setReviewsHeader] = useState<ReviewsHeader>({ headline: '', subtitle: '' });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [contentRes, reviewsRes, reelsRes] = await Promise.all([
      supabase.from('site_content').select('*').eq('page', 'home'),
      supabase.from('reviews').select('*').order('display_order'),
      supabase.from('reels').select('*').order('display_order'),
    ]);

    if (contentRes.data) {
      for (const row of contentRes.data) {
        if (row.section === 'hero') setHero(row.content as HeroContent);
        if (row.section === 'about') setAbout(row.content as AboutContent);
        if (row.section === 'reviews') setReviewsHeader(row.content as ReviewsHeader);
      }
    }
    if (reviewsRes.data) setReviews(reviewsRes.data as Review[]);
    if (reelsRes.data) setReels(reelsRes.data as Reel[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const saveContent = async (section: string, content: object) => {
    setSaving(true);
    setSaved(false);
    setError('');

    const { error: err } = await supabase
      .from('site_content')
      .upsert({ page: 'home', section, content, updated_at: new Date().toISOString() }, { onConflict: 'page,section' });

    if (err) {
      setError(`Failed to save: ${err.message}`);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  const saveHero = () => saveContent('hero', hero);
  const saveAbout = () => saveContent('about', about);
  const saveReviewsHeader = () => saveContent('reviews', reviewsHeader);

  const addReview = async () => {
    const maxOrder = reviews.length > 0 ? Math.max(...reviews.map(r => r.display_order)) : 0;
    const { data, error: err } = await supabase
      .from('reviews')
      .insert({ text: '', author: '', source: 'Facebook', rating: 5, display_order: maxOrder + 1, is_active: true })
      .select()
      .single();
    if (data) setReviews([...reviews, data as Review]);
    if (err) setError(err.message);
  };

  const updateReview = (id: string, updates: Partial<Review>) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const saveReview = async (review: Review) => {
    setSaving(true);
    const { error: err } = await supabase.from('reviews').update({
      text: review.text,
      author: review.author,
      source: review.source,
      rating: review.rating,
      is_active: review.is_active,
      display_order: review.display_order,
    }).eq('id', review.id);
    if (err) setError(err.message);
    else { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    setSaving(false);
  };

  const deleteReview = async (id: string) => {
    const { error: err } = await supabase.from('reviews').delete().eq('id', id);
    if (!err) setReviews(reviews.filter(r => r.id !== id));
    else setError(err.message);
  };

  const addReel = async () => {
    const maxOrder = reels.length > 0 ? Math.max(...reels.map(r => r.display_order)) : 0;
    const { data, error: err } = await supabase
      .from('reels')
      .insert({ url: '', display_order: maxOrder + 1, is_active: true })
      .select()
      .single();
    if (data) setReels([...reels, data as Reel]);
    if (err) setError(err.message);
  };

  const updateReel = (id: string, updates: Partial<Reel>) => {
    setReels(reels.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const saveReel = async (reel: Reel) => {
    setSaving(true);
    const { error: err } = await supabase.from('reels').update({
      url: reel.url, is_active: reel.is_active, display_order: reel.display_order,
    }).eq('id', reel.id);
    if (err) setError(err.message);
    else { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    setSaving(false);
  };

  const deleteReel = async (id: string) => {
    const { error: err } = await supabase.from('reels').delete().eq('id', id);
    if (!err) setReels(reels.filter(r => r.id !== id));
    else setError(err.message);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'hero', label: 'Hero' },
    { id: 'about', label: 'About' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'reels', label: 'Reels' },
  ];

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-white font-display uppercase text-2xl font-bold tracking-wide">Home Page</h2>
          <p className="text-white/40 text-sm mt-1">Edit the content shown on your homepage</p>
        </div>
        <StatusBadge saving={saving} saved={saved} />
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-400 text-sm rounded-md">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
          <button onClick={() => setError('')} className="ml-auto text-red-400/60 hover:text-red-400">&times;</button>
        </div>
      )}

      <div className="flex gap-1 mb-8 border-b border-white/[0.06] overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-brand-teal border-brand-teal'
                : 'text-white/40 border-transparent hover:text-white/70 hover:border-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Hero Editor */}
      {activeTab === 'hero' && (
        <div className="space-y-5">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Headline</label>
            <textarea
              value={hero.headline}
              onChange={(e) => setHero({ ...hero, headline: e.target.value })}
              rows={2}
              className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors resize-none rounded-md"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Subtitle</label>
            <textarea
              value={hero.subtitle}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              rows={2}
              className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors resize-none rounded-md"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">CTA Button Text</label>
              <input
                type="text"
                value={hero.cta_text}
                onChange={(e) => setHero({ ...hero, cta_text: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors rounded-md"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Phone Number</label>
              <input
                type="text"
                value={hero.phone}
                onChange={(e) => setHero({ ...hero, phone: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors rounded-md"
              />
            </div>
          </div>
          <button onClick={saveHero} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-brand-yellow text-navy-900 font-bold text-[13px] tracking-[0.08em] uppercase hover:bg-brand-gold transition-colors disabled:opacity-50 rounded-md">
            <Save className="w-4 h-4" />
            Save Hero
          </button>
        </div>
      )}

      {/* About Editor */}
      {activeTab === 'about' && (
        <div className="space-y-8">
          <div className="space-y-5">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Headline</label>
              <input
                type="text"
                value={about.headline}
                onChange={(e) => setAbout({ ...about, headline: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors rounded-md"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Description</label>
              <textarea
                value={about.description}
                onChange={(e) => setAbout({ ...about, description: e.target.value })}
                rows={4}
                className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors resize-none rounded-md"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Founder Name</label>
                <input
                  type="text"
                  value={about.founder_name}
                  onChange={(e) => setAbout({ ...about, founder_name: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors rounded-md"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Founder Title</label>
                <input
                  type="text"
                  value={about.founder_title}
                  onChange={(e) => setAbout({ ...about, founder_title: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.06]" />

          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm">Statistics ({about.stats.length})</h3>
            <button
              onClick={() => setAbout({ ...about, stats: [...about.stats, { value: '', label: '' }] })}
              className="inline-flex items-center gap-1.5 text-brand-teal text-xs font-semibold hover:text-brand-teal/80 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Stat
            </button>
          </div>

          <div className="space-y-3">
            {about.stats.map((stat, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_2fr_auto] gap-3 items-center">
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => {
                    const newStats = [...about.stats];
                    newStats[idx] = { ...stat, value: e.target.value };
                    setAbout({ ...about, stats: newStats });
                  }}
                  placeholder="Value"
                  className="bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors rounded-md"
                />
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => {
                    const newStats = [...about.stats];
                    newStats[idx] = { ...stat, label: e.target.value };
                    setAbout({ ...about, stats: newStats });
                  }}
                  placeholder="Label"
                  className="bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors rounded-md"
                />
                <button
                  onClick={() => setAbout({ ...about, stats: about.stats.filter((_, i) => i !== idx) })}
                  className="p-1.5 text-white/30 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <button onClick={saveAbout} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-brand-yellow text-navy-900 font-bold text-[13px] tracking-[0.08em] uppercase hover:bg-brand-gold transition-colors disabled:opacity-50 rounded-md">
            <Save className="w-4 h-4" />
            Save About
          </button>
        </div>
      )}

      {/* Reviews Editor */}
      {activeTab === 'reviews' && (
        <div className="space-y-8">
          <div className="space-y-5">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Headline</label>
              <input
                type="text"
                value={reviewsHeader.headline}
                onChange={(e) => setReviewsHeader({ ...reviewsHeader, headline: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors rounded-md"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Subtitle</label>
              <textarea
                value={reviewsHeader.subtitle}
                onChange={(e) => setReviewsHeader({ ...reviewsHeader, subtitle: e.target.value })}
                rows={2}
                className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors resize-none rounded-md"
              />
            </div>
            <button onClick={saveReviewsHeader} disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-yellow text-navy-900 font-bold text-[12px] tracking-[0.08em] uppercase hover:bg-brand-gold transition-colors disabled:opacity-50 rounded-md">
              <Save className="w-3.5 h-3.5" />
              Save Header
            </button>
          </div>

          <div className="border-t border-white/[0.06]" />

          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm">Reviews ({reviews.length})</h3>
            <button onClick={addReview} className="inline-flex items-center gap-1.5 text-brand-teal text-xs font-semibold hover:text-brand-teal/80 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add Review
            </button>
          </div>

          {reviews.map((review) => (
            <div key={review.id} className="space-y-3 pb-8 border-b border-white/[0.06] last:border-b-0 last:pb-0">
              <textarea
                value={review.text}
                onChange={(e) => updateReview(review.id, { text: e.target.value })}
                rows={3}
                placeholder="Review text..."
                className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors resize-none rounded-md"
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={review.author}
                  onChange={(e) => updateReview(review.id, { author: e.target.value })}
                  placeholder="Author"
                  className="bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors rounded-md"
                />
                <input
                  type="text"
                  value={review.source}
                  onChange={(e) => updateReview(review.id, { source: e.target.value })}
                  placeholder="Source"
                  className="bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors rounded-md"
                />
                <select
                  value={review.rating}
                  onChange={(e) => updateReview(review.id, { rating: Number(e.target.value) })}
                  className="bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors rounded-md"
                >
                  {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                </select>
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => { updateReview(review.id, { is_active: !review.is_active }); }}
                  className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors ${review.is_active ? 'text-emerald-400' : 'text-white/30'}`}
                >
                  {review.is_active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  {review.is_active ? 'Visible' : 'Hidden'}
                </button>
                <div className="flex items-center gap-3">
                  <button onClick={() => saveReview(review)} className="text-brand-teal text-xs font-semibold hover:text-brand-teal/80 transition-colors">
                    Save
                  </button>
                  <button onClick={() => deleteReview(review.id)} className="text-white/30 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reels Editor */}
      {activeTab === 'reels' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm">Facebook Reels ({reels.length})</h3>
            <button onClick={addReel} className="inline-flex items-center gap-1.5 text-brand-teal text-xs font-semibold hover:text-brand-teal/80 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add Reel
            </button>
          </div>

          {reels.map((reel) => (
            <div key={reel.id} className="flex items-center gap-3 pb-4 border-b border-white/[0.06] last:border-b-0 last:pb-0">
              <input
                type="text"
                value={reel.url}
                onChange={(e) => updateReel(reel.id, { url: e.target.value })}
                placeholder="https://www.facebook.com/reel/..."
                className="flex-1 bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors rounded-md"
              />
              <button
                onClick={() => { updateReel(reel.id, { is_active: !reel.is_active }); saveReel({ ...reel, is_active: !reel.is_active }); }}
                className={`p-2 transition-colors ${reel.is_active ? 'text-emerald-400' : 'text-white/30'}`}
              >
                {reel.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button onClick={() => saveReel(reel)} className="text-brand-teal text-xs font-semibold hover:text-brand-teal/80 px-2 py-1 transition-colors">
                Save
              </button>
              <button onClick={() => deleteReel(reel.id)} className="p-2 text-white/30 hover:text-red-400 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
