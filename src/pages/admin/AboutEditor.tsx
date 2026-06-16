import { useEffect, useState, useCallback } from 'react';
import { Save, Plus, Trash2, Check, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import ImageUpload from '../../components/admin/ImageUpload';

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

interface PhotosContent {
  photo1: string;
  photo2: string;
  photo3: string;
}

type Tab = 'hero' | 'story' | 'photos' | 'values';

function StatusBadge({ saving, saved }: { saving: boolean; saved: boolean }) {
  if (saving) return (
    <span className="inline-flex items-center gap-1.5 text-[#10263C] text-xs font-medium">
      <div className="w-3 h-3 border-2 border-[#10263C] border-t-transparent rounded-full animate-spin" />
      Saving...
    </span>
  );
  if (saved) return (
    <span className="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-medium">
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
  const [photos, setPhotos] = useState<PhotosContent>({ photo1: '', photo2: '', photo3: '' });
  const [values, setValues] = useState<ValuesContent>({ headline: '', subtitle: '', values: [] });

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('site_content').select('*').eq('page', 'about');

    if (data) {
      for (const row of data) {
        if (row.section === 'hero') setHero(row.content as HeroContent);
        if (row.section === 'story') setStory(row.content as StoryContent);
        if (row.section === 'photos') setPhotos(row.content as PhotosContent);
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
        <div className="w-6 h-6 border-2 border-[#10263C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'hero', label: 'Hero' },
    { id: 'story', label: 'Story' },
    { id: 'photos', label: 'Photos' },
    { id: 'values', label: 'Values' },
  ];

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-gray-900 font-display uppercase text-2xl font-bold tracking-wide">About Page</h2>
          <p className="text-gray-500 text-sm mt-1">Edit the content shown on the About page</p>
        </div>
        <StatusBadge saving={saving} saved={saved} />
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm rounded-md">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
          <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600">&times;</button>
        </div>
      )}

      <div className="flex gap-1 mb-8 border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-[#10263C] border-[#10263C]'
                : 'text-gray-400 border-transparent hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'hero' && (
        <div className="space-y-5">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Headline</label>
            <textarea
              value={hero.headline}
              onChange={(e) => setHero({ ...hero, headline: e.target.value })}
              rows={2}
              placeholder="Built on faith, driven by craft."
              className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors resize-none rounded-md"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Subtitle</label>
            <textarea
              value={hero.subtitle}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              rows={2}
              placeholder="The story behind Fresh Impressions Painting..."
              className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors resize-none rounded-md"
            />
          </div>
          <button onClick={() => saveContent('hero', hero)} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-[#10263C] text-white font-bold text-[13px] tracking-[0.08em] uppercase hover:bg-[#0c2236] transition-colors disabled:opacity-50 rounded-md">
            <Save className="w-4 h-4" />
            Save Hero
          </button>
        </div>
      )}

      {activeTab === 'story' && (
        <div className="space-y-5">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Paragraph 1</label>
            <textarea
              value={story.paragraph1}
              onChange={(e) => setStory({ ...story, paragraph1: e.target.value })}
              rows={6}
              placeholder="Owner Ian Rosenkranz has proudly served..."
              className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm leading-relaxed focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors resize-none rounded-md"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Paragraph 2</label>
            <textarea
              value={story.paragraph2}
              onChange={(e) => setStory({ ...story, paragraph2: e.target.value })}
              rows={6}
              placeholder="From a young age, Ian developed discipline..."
              className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm leading-relaxed focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors resize-none rounded-md"
            />
          </div>
          <button onClick={() => saveContent('story', story)} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-[#10263C] text-white font-bold text-[13px] tracking-[0.08em] uppercase hover:bg-[#0c2236] transition-colors disabled:opacity-50 rounded-md">
            <Save className="w-4 h-4" />
            Save Story
          </button>
        </div>
      )}

      {activeTab === 'photos' && (
        <div className="space-y-6">
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700 text-[11px] leading-relaxed">
              These three images form the photo collage on the About page. <strong>Photo 1</strong> takes up the full left column. <strong>Photos 2 and 3</strong> stack in the right column. Leave a slot empty to keep the current default image.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-1">Photo 1 — Large Left Column</label>
              <p className="text-[11px] text-gray-400 mb-3">Full-height portrait image. Best with a person or job site shot.</p>
              <ImageUpload
                value={photos.photo1}
                onChange={(url) => setPhotos({ ...photos, photo1: url })}
                folder="about/photos"
                label=""
                variant="light"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-1">Photo 2 — Top Right</label>
              <p className="text-[11px] text-gray-400 mb-3">Upper half of the right column.</p>
              <ImageUpload
                value={photos.photo2}
                onChange={(url) => setPhotos({ ...photos, photo2: url })}
                folder="about/photos"
                label=""
                variant="light"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-1">Photo 3 — Bottom Right</label>
              <p className="text-[11px] text-gray-400 mb-3">Lower half of the right column.</p>
              <ImageUpload
                value={photos.photo3}
                onChange={(url) => setPhotos({ ...photos, photo3: url })}
                folder="about/photos"
                label=""
                variant="light"
              />
            </div>
          </div>

          <button onClick={() => saveContent('photos', photos)} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-[#10263C] text-white font-bold text-[13px] tracking-[0.08em] uppercase hover:bg-[#0c2236] transition-colors disabled:opacity-50 rounded-md">
            <Save className="w-4 h-4" />
            Save Photos
          </button>
        </div>
      )}

      {activeTab === 'values' && (
        <div className="space-y-8">
          {/* Section header fields */}
          <div className="space-y-5">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Headline</label>
              <input
                type="text"
                value={values.headline}
                onChange={(e) => setValues({ ...values, headline: e.target.value })}
                placeholder="More than color on walls."
                className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Subtitle</label>
              <textarea
                value={values.subtitle}
                onChange={(e) => setValues({ ...values, subtitle: e.target.value })}
                rows={3}
                placeholder="Ian is passionate about serving others..."
                className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors resize-none rounded-md"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Values list header */}
          <div className="flex items-center justify-between">
            <h3 className="text-gray-900 font-semibold text-sm">Values ({values.values.length})</h3>
            <button
              onClick={() => setValues({ ...values, values: [...values.values, { title: '', description: '' }] })}
              className="inline-flex items-center gap-1.5 text-[#10263C] text-xs font-semibold hover:text-[#10263C]/70 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Value
            </button>
          </div>

          {/* Values - flat list with dividers */}
          {values.values.map((value, idx) => (
            <div key={idx} className="space-y-3 pb-8 border-b border-gray-200 last:border-b-0 last:pb-0">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs font-mono">{String(idx + 1).padStart(2, '0')}</span>
                <button
                  onClick={() => setValues({ ...values, values: values.values.filter((_, i) => i !== idx) })}
                  className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-1.5">Title</label>
                <input
                  type="text"
                  value={value.title}
                  onChange={(e) => {
                    const newValues = [...values.values];
                    newValues[idx] = { ...value, title: e.target.value };
                    setValues({ ...values, values: newValues });
                  }}
                  placeholder="Integrity"
                  className="w-full bg-white border border-gray-300 px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-1.5">Description</label>
                <textarea
                  value={value.description}
                  onChange={(e) => {
                    const newValues = [...values.values];
                    newValues[idx] = { ...value, description: e.target.value };
                    setValues({ ...values, values: newValues });
                  }}
                  rows={3}
                  placeholder="Value description..."
                  className="w-full bg-white border border-gray-300 px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors resize-none rounded-md"
                />
              </div>
            </div>
          ))}

          <button onClick={() => saveContent('values', values)} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-[#10263C] text-white font-bold text-[13px] tracking-[0.08em] uppercase hover:bg-[#0c2236] transition-colors disabled:opacity-50 rounded-md">
            <Save className="w-4 h-4" />
            Save Values
          </button>
        </div>
      )}
    </div>
  );
}
