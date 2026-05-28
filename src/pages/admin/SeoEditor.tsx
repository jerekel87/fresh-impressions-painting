import { useEffect, useState, useCallback } from 'react';
import { Save, Check, AlertCircle, Globe, FileText, Tag, Code, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface SeoEntry {
  id: string;
  page: string;
  title: string;
  description: string;
  keywords: string;
  og_title: string;
  og_description: string;
  og_image: string;
  canonical_url: string;
  robots: string;
  structured_data: object;
  custom_head: string;
}

const PAGE_LABELS: Record<string, string> = {
  global: 'Global (Site-Wide Defaults)',
  home: 'Home Page',
  about: 'About Page',
  areas: 'Service Areas Page',
  contact: 'Contact Page',
  services: 'Services Page',
};

const PAGE_ORDER = ['global', 'home', 'about', 'areas', 'contact', 'services'];

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

function CharCount({ value, max }: { value: string; max: number }) {
  const len = value.length;
  const color = len === 0 ? 'text-white/20' : len <= max ? 'text-emerald-400/70' : 'text-amber-400/70';
  return <span className={`text-[10px] font-mono ${color}`}>{len}/{max}</span>;
}

export default function SeoEditor() {
  const [activePage, setActivePage] = useState('global');
  const [entries, setEntries] = useState<Record<string, SeoEntry>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<'meta' | 'social' | 'advanced'>('meta');

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('seo_settings').select('*');
    if (data) {
      const map: Record<string, SeoEntry> = {};
      for (const row of data) {
        map[row.page] = row as SeoEntry;
      }
      setEntries(map);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const current = entries[activePage];

  const updateField = (field: keyof SeoEntry, value: string | object) => {
    if (!current) return;
    setEntries({ ...entries, [activePage]: { ...current, [field]: value } });
  };

  const saveEntry = async () => {
    if (!current) return;
    setSaving(true);
    setSaved(false);
    setError('');

    const { error: err } = await supabase
      .from('seo_settings')
      .update({
        title: current.title,
        description: current.description,
        keywords: current.keywords,
        og_title: current.og_title,
        og_description: current.og_description,
        og_image: current.og_image,
        canonical_url: current.canonical_url,
        robots: current.robots,
        structured_data: current.structured_data,
        custom_head: current.custom_head,
        updated_at: new Date().toISOString(),
      })
      .eq('id', current.id);

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

  const sections: { id: 'meta' | 'social' | 'advanced'; label: string; icon: typeof Globe }[] = [
    { id: 'meta', label: 'Meta Tags', icon: Tag },
    { id: 'social', label: 'Social / Open Graph', icon: Globe },
    { id: 'advanced', label: 'Advanced', icon: Code },
  ];

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-white font-display uppercase text-2xl font-bold tracking-wide">SEO Settings</h2>
          <p className="text-white/40 text-sm mt-1">Configure search engine optimization for each page</p>
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

      {/* Page selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {PAGE_ORDER.map((page) => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all duration-150 ${
              activePage === page
                ? 'bg-brand-teal/20 text-brand-teal border border-brand-teal/30'
                : 'bg-white/[0.03] text-white/40 border border-white/[0.06] hover:text-white/70 hover:border-white/[0.12]'
            }`}
          >
            {PAGE_LABELS[page] || page}
          </button>
        ))}
      </div>

      {/* Section tabs */}
      <div className="flex gap-1 mb-8 border-b border-white/[0.06]">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
              activeSection === section.id
                ? 'text-brand-teal border-brand-teal'
                : 'text-white/40 border-transparent hover:text-white/70 hover:border-white/10'
            }`}
          >
            <section.icon className="w-3.5 h-3.5" />
            {section.label}
          </button>
        ))}
      </div>

      {!current ? (
        <p className="text-white/30 text-sm">No SEO entry found for this page.</p>
      ) : (
        <>
          {/* Meta Tags Section */}
          {activeSection === 'meta' && (
            <div className="space-y-6">
              {/* SERP Preview */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-3.5 h-3.5 text-white/30" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">Search Preview</span>
                </div>
                <div className="bg-white rounded-lg p-4 space-y-1">
                  <p className="text-[#1a0dab] text-lg font-medium leading-tight truncate">
                    {current.title || 'Page Title'}
                  </p>
                  <p className="text-[#006621] text-sm truncate">
                    {current.canonical_url || 'https://freshimpressionspainting.com'}
                  </p>
                  <p className="text-[#545454] text-sm line-clamp-2">
                    {current.description || 'Meta description will appear here...'}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/[0.06]" />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">Page Title (Title Tag)</label>
                  <CharCount value={current.title} max={60} />
                </div>
                <input
                  type="text"
                  value={current.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="Page Title | Brand Name"
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors rounded-md"
                />
                <p className="mt-1.5 text-white/20 text-[11px]">Optimal: 50-60 characters. Include primary keyword near the beginning.</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">Meta Description</label>
                  <CharCount value={current.description} max={160} />
                </div>
                <textarea
                  value={current.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={3}
                  placeholder="A compelling description of this page for search results..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm leading-relaxed focus:outline-none focus:border-brand-teal/50 transition-colors resize-none rounded-md"
                />
                <p className="mt-1.5 text-white/20 text-[11px]">Optimal: 120-160 characters. Include a call to action and primary keywords.</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">Keywords</label>
                </div>
                <textarea
                  value={current.keywords}
                  onChange={(e) => updateField('keywords', e.target.value)}
                  rows={2}
                  placeholder="keyword one, keyword two, keyword three"
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors resize-none rounded-md"
                />
                <p className="mt-1.5 text-white/20 text-[11px]">Comma-separated. Focus on 5-10 relevant terms per page.</p>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Canonical URL</label>
                <input
                  type="text"
                  value={current.canonical_url}
                  onChange={(e) => updateField('canonical_url', e.target.value)}
                  placeholder="https://freshimpressionspainting.com/about"
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors rounded-md"
                />
                <p className="mt-1.5 text-white/20 text-[11px]">The preferred URL for this page. Helps prevent duplicate content issues.</p>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Robots Directive</label>
                <select
                  value={current.robots}
                  onChange={(e) => updateField('robots', e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors rounded-md"
                >
                  <option value="index, follow">index, follow (Recommended)</option>
                  <option value="index, nofollow">index, nofollow</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                </select>
                <p className="mt-1.5 text-white/20 text-[11px]">Controls how search engines index and follow links on this page.</p>
              </div>

              <button onClick={saveEntry} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal text-white font-semibold text-[13px] tracking-[0.05em] hover:bg-brand-teal/80 transition-colors disabled:opacity-50 rounded-md">
                <Save className="w-4 h-4" />
                Save Meta Tags
              </button>
            </div>
          )}

          {/* Social / Open Graph Section */}
          {activeSection === 'social' && (
            <div className="space-y-6">
              {/* OG Preview */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-3.5 h-3.5 text-white/30" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">Social Share Preview</span>
                </div>
                <div className="bg-[#18212b] border border-white/[0.08] rounded-lg overflow-hidden max-w-sm">
                  {current.og_image && (
                    <div className="aspect-[1.91/1] bg-white/[0.04] flex items-center justify-center">
                      <img src={current.og_image} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    </div>
                  )}
                  {!current.og_image && (
                    <div className="aspect-[1.91/1] bg-white/[0.04] flex items-center justify-center">
                      <span className="text-white/15 text-xs">No image set</span>
                    </div>
                  )}
                  <div className="p-3 space-y-1">
                    <p className="text-white/30 text-[10px] uppercase tracking-wider">freshimpressionspainting.com</p>
                    <p className="text-white font-semibold text-sm leading-tight">
                      {current.og_title || current.title || 'Page Title'}
                    </p>
                    <p className="text-white/50 text-xs line-clamp-2">
                      {current.og_description || current.description || 'Description'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/[0.06]" />

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">OG Title</label>
                <input
                  type="text"
                  value={current.og_title}
                  onChange={(e) => updateField('og_title', e.target.value)}
                  placeholder="Leave empty to use page title"
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors rounded-md"
                />
                <p className="mt-1.5 text-white/20 text-[11px]">Overrides the page title when shared on social media. Leave blank to use the page title.</p>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">OG Description</label>
                <textarea
                  value={current.og_description}
                  onChange={(e) => updateField('og_description', e.target.value)}
                  rows={3}
                  placeholder="Leave empty to use meta description"
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors resize-none rounded-md"
                />
                <p className="mt-1.5 text-white/20 text-[11px]">Overrides the meta description on social platforms. Leave blank to use the meta description.</p>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">OG Image URL</label>
                <input
                  type="text"
                  value={current.og_image}
                  onChange={(e) => updateField('og_image', e.target.value)}
                  placeholder="https://example.com/images/share-image.jpg"
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors rounded-md"
                />
                <p className="mt-1.5 text-white/20 text-[11px]">Recommended size: 1200x630px. This image appears when the page is shared on Facebook, Twitter, LinkedIn, etc.</p>
              </div>

              <button onClick={saveEntry} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal text-white font-semibold text-[13px] tracking-[0.05em] hover:bg-brand-teal/80 transition-colors disabled:opacity-50 rounded-md">
                <Save className="w-4 h-4" />
                Save Social Settings
              </button>
            </div>
          )}

          {/* Advanced Section */}
          {activeSection === 'advanced' && (
            <div className="space-y-6">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Structured Data (JSON-LD)</label>
                <textarea
                  value={typeof current.structured_data === 'string' ? current.structured_data : JSON.stringify(current.structured_data, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      updateField('structured_data', parsed);
                    } catch {
                      updateField('structured_data', e.target.value as unknown as object);
                    }
                  }}
                  rows={12}
                  placeholder='{"@context": "https://schema.org", "@type": "LocalBusiness", ...}'
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm font-mono leading-relaxed focus:outline-none focus:border-brand-teal/50 transition-colors resize-none rounded-md"
                />
                <p className="mt-1.5 text-white/20 text-[11px]">JSON-LD structured data for rich snippets. Must be valid JSON. This helps Google understand your business and may show rich results.</p>
              </div>

              <div className="border-t border-white/[0.06]" />

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Custom Head HTML</label>
                <textarea
                  value={current.custom_head}
                  onChange={(e) => updateField('custom_head', e.target.value)}
                  rows={6}
                  placeholder='<!-- Custom meta tags, verification codes, analytics scripts -->'
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm font-mono leading-relaxed focus:outline-none focus:border-brand-teal/50 transition-colors resize-none rounded-md"
                />
                <p className="mt-1.5 text-white/20 text-[11px]">Additional HTML injected into the page head. Use for Google Search Console verification, analytics scripts, or custom meta tags.</p>
              </div>

              <button onClick={saveEntry} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal text-white font-semibold text-[13px] tracking-[0.05em] hover:bg-brand-teal/80 transition-colors disabled:opacity-50 rounded-md">
                <Save className="w-4 h-4" />
                Save Advanced Settings
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
