import { useEffect, useState, useCallback } from 'react';
import { Save, Plus, Trash2, Check, AlertCircle, MapPin } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface HeroContent {
  headline: string;
  subtitle: string;
}

interface County {
  name: string;
  mainCity: string;
  cities: string[];
  description: string;
  isHQ: boolean;
}

interface CountiesContent {
  headline: string;
  subtitle: string;
  counties: County[];
}

type Tab = 'hero' | 'counties';

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

export default function AreasEditor() {
  const [activeTab, setActiveTab] = useState<Tab>('hero');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [hero, setHero] = useState<HeroContent>({ headline: '', subtitle: '' });
  const [counties, setCounties] = useState<CountiesContent>({ headline: '', subtitle: '', counties: [] });

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('site_content').select('*').eq('page', 'areas');

    if (data) {
      for (const row of data) {
        if (row.section === 'hero') setHero(row.content as HeroContent);
        if (row.section === 'counties') setCounties(row.content as CountiesContent);
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
      .upsert({ page: 'areas', section, content, updated_at: new Date().toISOString() }, { onConflict: 'page,section' });

    if (err) {
      setError(`Failed to save: ${err.message}`);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  const updateCounty = (idx: number, updates: Partial<County>) => {
    const updated = [...counties.counties];
    updated[idx] = { ...updated[idx], ...updates };
    setCounties({ ...counties, counties: updated });
  };

  const addCounty = () => {
    setCounties({
      ...counties,
      counties: [...counties.counties, { name: '', mainCity: '', cities: [], description: '', isHQ: false }],
    });
  };

  const removeCounty = (idx: number) => {
    setCounties({ ...counties, counties: counties.counties.filter((_, i) => i !== idx) });
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
    { id: 'counties', label: 'Counties' },
  ];

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-white font-display uppercase text-2xl font-bold tracking-wide">Areas Page</h2>
          <p className="text-white/40 text-sm mt-1">Edit the service areas displayed on the site</p>
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
                  placeholder="Five counties. One standard of excellence."
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Subtitle</label>
                <textarea
                  value={hero.subtitle}
                  onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                  rows={2}
                  placeholder="From our headquarters in Granbury..."
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

      {activeTab === 'counties' && (
        <div className="space-y-6">
          <div className="bg-white/[0.02] border border-white/[0.06] p-6">
            <h3 className="text-white font-semibold text-sm mb-5">Section Header</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Headline</label>
                <input
                  type="text"
                  value={counties.headline}
                  onChange={(e) => setCounties({ ...counties, headline: e.target.value })}
                  placeholder="Counties we proudly serve."
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Subtitle</label>
                <textarea
                  value={counties.subtitle}
                  onChange={(e) => setCounties({ ...counties, subtitle: e.target.value })}
                  rows={2}
                  placeholder="We provide the same level of attention..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.06] p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-semibold text-sm">Counties ({counties.counties.length})</h3>
              <button onClick={addCounty} className="inline-flex items-center gap-1.5 text-brand-teal text-xs font-semibold hover:text-brand-teal/80 transition-colors">
                <Plus className="w-3.5 h-3.5" /> Add County
              </button>
            </div>

            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
              {counties.counties.map((county, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/[0.06] p-4 space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-white/20 text-xs font-bold">{String(idx + 1).padStart(2, '0')}</span>
                      {county.isHQ && (
                        <span className="inline-flex items-center gap-1 text-brand-yellow text-[10px] font-bold uppercase tracking-wider">
                          <MapPin className="w-3 h-3" /> HQ
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCounty(idx, { isHQ: !county.isHQ })}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 transition-colors ${county.isHQ ? 'text-brand-yellow bg-brand-yellow/10' : 'text-white/30 hover:text-white/60'}`}
                      >
                        {county.isHQ ? 'HQ' : 'Set HQ'}
                      </button>
                      <button onClick={() => removeCounty(idx)} className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-1.5">County Name</label>
                      <input
                        type="text"
                        value={county.name}
                        onChange={(e) => updateCounty(idx, { name: e.target.value })}
                        placeholder="Hood County"
                        className="w-full bg-white/[0.04] border border-white/[0.06] px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-1.5">Main City</label>
                      <input
                        type="text"
                        value={county.mainCity}
                        onChange={(e) => updateCounty(idx, { mainCity: e.target.value })}
                        placeholder="Granbury"
                        className="w-full bg-white/[0.04] border border-white/[0.06] px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-1.5">Description</label>
                    <textarea
                      value={county.description}
                      onChange={(e) => updateCounty(idx, { description: e.target.value })}
                      rows={2}
                      placeholder="Full coverage with priority scheduling..."
                      className="w-full bg-white/[0.04] border border-white/[0.06] px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-1.5">Cities (comma-separated)</label>
                    <input
                      type="text"
                      value={county.cities.join(', ')}
                      onChange={(e) => updateCounty(idx, { cities: e.target.value.split(',').map(c => c.trim()).filter(Boolean) })}
                      placeholder="Granbury, Acton, Tolar, Lipan"
                      className="w-full bg-white/[0.04] border border-white/[0.06] px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => saveContent('counties', counties)} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal text-white font-semibold text-[13px] tracking-[0.05em] hover:bg-brand-teal/80 transition-colors disabled:opacity-50">
            <Save className="w-4 h-4" />
            Save Counties
          </button>
        </div>
      )}
    </div>
  );
}
