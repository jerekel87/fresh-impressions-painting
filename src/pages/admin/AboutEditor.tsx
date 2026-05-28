import { useEffect, useState, useCallback } from 'react';
import { Save, Plus, Trash2, Check, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface HeroContent {
  headline: string;
  subtitle: string;
}

interface StoryContent {
  paragraph1: string;
  paragraph2: string;
}

interface Value {
  title: string;
  description: string;
}

interface ValuesContent {
  headline: string;
  subtitle: string;
  values: Value[];
}

type Tab = 'hero' | 'story' | 'values';

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

export default function AboutEditor() {
  const [activeTab, setActiveTab] = useState<Tab>('hero');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [hero, setHero] = useState<HeroContent>({ headline: '', subtitle: '' });
  const [story, setStory] = useState<StoryContent>({ paragraph1: '', paragraph2: '' });
  const [values, setValues] = useState<ValuesContent>({ headline: '', subtitle: '', values: [] });

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('site_content').select('*').eq('page', 'about');

    if (data) {
      for (const row of data) {
        if (row.section === 'hero') setHero(row.content as HeroContent);
        if (row.section === 'story') setStory(row.content as StoryContent);
        if (row.section === 'values') setValues(row.content as ValuesContent);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const saveContent = async (section: string, content: object) => {
    setSaving(true);
    setSaved(false);
    setError('');

    const { error: err } = await supabase
      .from('site_content')
      .upsert({ page: 'about', section, content, updated_at: new Date().toISOString() }, { onConflict: 'page,section' });

    if (err) {
      setError(`Failed to save: ${err.message}`);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
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
    { id: 'story', label: 'Story' },
    { id: 'values', label: 'Values' },
  ];

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-white font-display uppercase text-2xl font-bold tracking-wide">About Page</h2>
          <p className="text-white/40 text-sm mt-1">Edit the content shown on the About page</p>
        </div>
        <StatusBadge saving={saving} saved={saved} />
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-400 text-sm">
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

      {activeTab === 'hero' && (
        <div className="space-y-6">
          <div className="bg-white/[0.02] border border-white/[0.06] p-6">
            <h3 className="text-white font-semibold text-sm mb-5">Hero Banner</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Headline</label>
                <textarea
                  value={hero.headline}
                  onChange={(e) => setHero({ ...hero, headline: e.target.value })}
                  rows={2}
                  placeholder="Built on faith, driven by craft."
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Subtitle</label>
                <textarea
                  value={hero.subtitle}
                  onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                  rows={2}
                  placeholder="The story behind Fresh Impressions Painting..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors resize-none"
                />
              </div>
            </div>
          </div>
          <button onClick={() => saveContent('hero', hero)} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal text-white font-semibold text-[13px] tracking-[0.05em] hover:bg-brand-teal/80 transition-colors disabled:opacity-50">
            <Save className="w-4 h-4" />
            Save Hero
          </button>
        </div>
      )}

      {activeTab === 'story' && (
        <div className="space-y-6">
          <div className="bg-white/[0.02] border border-white/[0.06] p-6">
            <h3 className="text-white font-semibold text-sm mb-5">Story Section</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Paragraph 1</label>
                <textarea
                  value={story.paragraph1}
                  onChange={(e) => setStory({ ...story, paragraph1: e.target.value })}
                  rows={5}
                  placeholder="Owner Ian Rosenkranz has proudly served..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Paragraph 2</label>
                <textarea
                  value={story.paragraph2}
                  onChange={(e) => setStory({ ...story, paragraph2: e.target.value })}
                  rows={5}
                  placeholder="From a young age, Ian developed discipline..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors resize-none"
                />
              </div>
            </div>
          </div>
          <button onClick={() => saveContent('story', story)} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal text-white font-semibold text-[13px] tracking-[0.05em] hover:bg-brand-teal/80 transition-colors disabled:opacity-50">
            <Save className="w-4 h-4" />
            Save Story
          </button>
        </div>
      )}

      {activeTab === 'values' && (
        <div className="space-y-6">
          <div className="bg-white/[0.02] border border-white/[0.06] p-6">
            <h3 className="text-white font-semibold text-sm mb-5">Values Section Header</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Headline</label>
                <input
                  type="text"
                  value={values.headline}
                  onChange={(e) => setValues({ ...values, headline: e.target.value })}
                  placeholder="More than color on walls."
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Subtitle</label>
                <textarea
                  value={values.subtitle}
                  onChange={(e) => setValues({ ...values, subtitle: e.target.value })}
                  rows={3}
                  placeholder="Ian is passionate about serving others..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.06] p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-semibold text-sm">Values ({values.values.length})</h3>
              <button
                onClick={() => setValues({ ...values, values: [...values.values, { title: '', description: '' }] })}
                className="inline-flex items-center gap-1.5 text-brand-teal text-xs font-semibold hover:text-brand-teal/80 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Value
              </button>
            </div>

            <div className="space-y-4">
              {values.values.map((value, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/[0.06] p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-white/20 text-xs font-bold mt-3 w-5">{String(idx + 1).padStart(2, '0')}</span>
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        value={value.title}
                        onChange={(e) => {
                          const newValues = [...values.values];
                          newValues[idx] = { ...value, title: e.target.value };
                          setValues({ ...values, values: newValues });
                        }}
                        placeholder="Value title (e.g., Integrity)"
                        className="w-full bg-white/[0.04] border border-white/[0.06] px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors"
                      />
                      <textarea
                        value={value.description}
                        onChange={(e) => {
                          const newValues = [...values.values];
                          newValues[idx] = { ...value, description: e.target.value };
                          setValues({ ...values, values: newValues });
                        }}
                        rows={2}
                        placeholder="Value description..."
                        className="w-full bg-white/[0.04] border border-white/[0.06] px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors resize-none"
                      />
                    </div>
                    <button
                      onClick={() => setValues({ ...values, values: values.values.filter((_, i) => i !== idx) })}
                      className="w-9 h-9 flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => saveContent('values', values)} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal text-white font-semibold text-[13px] tracking-[0.05em] hover:bg-brand-teal/80 transition-colors disabled:opacity-50">
            <Save className="w-4 h-4" />
            Save Values
          </button>
        </div>
      )}
    </div>
  );
}
