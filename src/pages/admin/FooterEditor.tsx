import { useEffect, useState, useCallback } from 'react';
import { Save, Check, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface SocialLinks {
  facebook: string;
  instagram: string;
  nextdoor: string;
  google: string;
  yelp: string;
  tiktok: string;
}

interface FooterContent {
  description: string;
  cta_headline: string;
  cta_subtitle: string;
  cta_button_text: string;
  copyright: string;
}

interface QuoteSection {
  headline: string;
  headline_accent: string;
  subtitle: string;
}

type Tab = 'social' | 'footer' | 'quote';

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

export default function FooterEditor() {
  const [activeTab, setActiveTab] = useState<Tab>('social');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [social, setSocial] = useState<SocialLinks>({
    facebook: '', instagram: '', nextdoor: '', google: '', yelp: '', tiktok: '',
  });
  const [footer, setFooter] = useState<FooterContent>({
    description: '', cta_headline: '', cta_subtitle: '', cta_button_text: '', copyright: '',
  });
  const [quote, setQuote] = useState<QuoteSection>({
    headline: '', headline_accent: '', subtitle: '',
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('site_content').select('*').eq('page', 'global');
    if (data) {
      for (const row of data) {
        if (row.section === 'social_links') setSocial(row.content as SocialLinks);
        if (row.section === 'footer') setFooter(row.content as FooterContent);
        if (row.section === 'quote_section') setQuote(row.content as QuoteSection);
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
      .upsert({ page: 'global', section, content, updated_at: new Date().toISOString() }, { onConflict: 'page,section' });
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
    { id: 'social', label: 'Social Links' },
    { id: 'footer', label: 'Footer' },
    { id: 'quote', label: 'Quote Section' },
  ];

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-gray-900 font-display uppercase text-2xl font-bold tracking-wide">Footer & Global</h2>
          <p className="text-gray-500 text-sm mt-1">Social links, footer content, and quote form section</p>
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

      <div className="flex gap-1 mb-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-xs font-semibold tracking-[0.08em] uppercase transition-all relative ${
              activeTab === tab.id
                ? 'text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#10263C]'
                : 'text-gray-500 hover:text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'social' && (
        <div className="space-y-5">
          <SocialField label="Facebook" value={social.facebook} onChange={(v) => setSocial({ ...social, facebook: v })} placeholder="https://www.facebook.com/yourpage" />
          <SocialField label="Instagram" value={social.instagram} onChange={(v) => setSocial({ ...social, instagram: v })} placeholder="https://www.instagram.com/yourpage" />
          <SocialField label="Nextdoor" value={social.nextdoor} onChange={(v) => setSocial({ ...social, nextdoor: v })} placeholder="https://nextdoor.com/..." />
          <SocialField label="Google Business" value={social.google} onChange={(v) => setSocial({ ...social, google: v })} placeholder="https://g.page/yourbusiness" />
          <SocialField label="Yelp" value={social.yelp} onChange={(v) => setSocial({ ...social, yelp: v })} placeholder="https://www.yelp.com/biz/..." />
          <SocialField label="TikTok" value={social.tiktok} onChange={(v) => setSocial({ ...social, tiktok: v })} placeholder="https://www.tiktok.com/@yourpage" />
          <button onClick={() => saveContent('social_links', social)} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-[#10263C] text-white font-bold text-[13px] tracking-[0.08em] uppercase hover:bg-[#0c2236] transition-colors disabled:opacity-50 rounded-md">
            <Save className="w-4 h-4" />
            Save Social Links
          </button>
        </div>
      )}

      {activeTab === 'footer' && (
        <div className="space-y-5">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Footer Description</label>
            <textarea
              value={footer.description}
              onChange={(e) => setFooter({ ...footer, description: e.target.value })}
              rows={3}
              placeholder="Expert residential and commercial painting..."
              className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors resize-none rounded-md"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">CTA Headline</label>
            <input
              type="text"
              value={footer.cta_headline}
              onChange={(e) => setFooter({ ...footer, cta_headline: e.target.value })}
              placeholder="Let's start your project."
              className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">CTA Subtitle</label>
            <input
              type="text"
              value={footer.cta_subtitle}
              onChange={(e) => setFooter({ ...footer, cta_subtitle: e.target.value })}
              placeholder="Get a free, no-obligation estimate..."
              className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">CTA Button Text</label>
            <input
              type="text"
              value={footer.cta_button_text}
              onChange={(e) => setFooter({ ...footer, cta_button_text: e.target.value })}
              placeholder="REQUEST ESTIMATE"
              className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Copyright Name</label>
            <input
              type="text"
              value={footer.copyright}
              onChange={(e) => setFooter({ ...footer, copyright: e.target.value })}
              placeholder="Fresh Impressions Painting"
              className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
            />
          </div>
          <button onClick={() => saveContent('footer', footer)} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-[#10263C] text-white font-bold text-[13px] tracking-[0.08em] uppercase hover:bg-[#0c2236] transition-colors disabled:opacity-50 rounded-md">
            <Save className="w-4 h-4" />
            Save Footer
          </button>
        </div>
      )}

      {activeTab === 'quote' && (
        <div className="space-y-5">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Headline</label>
            <input
              type="text"
              value={quote.headline}
              onChange={(e) => setQuote({ ...quote, headline: e.target.value })}
              placeholder="Request a"
              className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
            />
            <p className="mt-1.5 text-gray-400 text-[11px]">Text before the accent color word(s)</p>
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Headline Accent</label>
            <input
              type="text"
              value={quote.headline_accent}
              onChange={(e) => setQuote({ ...quote, headline_accent: e.target.value })}
              placeholder="free quote."
              className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
            />
            <p className="mt-1.5 text-gray-400 text-[11px]">Text displayed in accent color</p>
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Subtitle</label>
            <input
              type="text"
              value={quote.subtitle}
              onChange={(e) => setQuote({ ...quote, subtitle: e.target.value })}
              placeholder="Fill out the form below and we'll be in touch shortly."
              className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
            />
          </div>
          <button onClick={() => saveContent('quote_section', quote)} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-[#10263C] text-white font-bold text-[13px] tracking-[0.08em] uppercase hover:bg-[#0c2236] transition-colors disabled:opacity-50 rounded-md">
            <Save className="w-4 h-4" />
            Save Quote Section
          </button>
        </div>
      )}
    </div>
  );
}

function SocialField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">{label}</label>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
      />
    </div>
  );
}
