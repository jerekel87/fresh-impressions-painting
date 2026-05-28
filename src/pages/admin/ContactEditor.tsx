import { useEffect, useState, useCallback } from 'react';
import { Save, Plus, Trash2, Check, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface HeroContent {
  headline: string;
  subtitle: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  headquarters: string;
  response_time: string;
}

interface BusinessHour {
  day: string;
  hours: string;
}

interface HoursContent {
  headline: string;
  subtitle: string;
  hours: BusinessHour[];
  service_area_note: string;
}

type Tab = 'hero' | 'contact_info' | 'hours';

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

export default function ContactEditor() {
  const [activeTab, setActiveTab] = useState<Tab>('hero');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [hero, setHero] = useState<HeroContent>({ headline: '', subtitle: '' });
  const [contactInfo, setContactInfo] = useState<ContactInfo>({ phone: '', email: '', headquarters: '', response_time: '' });
  const [hours, setHours] = useState<HoursContent>({ headline: '', subtitle: '', hours: [], service_area_note: '' });

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('site_content').select('*').eq('page', 'contact');

    if (data) {
      for (const row of data) {
        if (row.section === 'hero') setHero(row.content as HeroContent);
        if (row.section === 'contact_info') setContactInfo(row.content as ContactInfo);
        if (row.section === 'hours') setHours(row.content as HoursContent);
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
      .upsert({ page: 'contact', section, content, updated_at: new Date().toISOString() }, { onConflict: 'page,section' });

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
    { id: 'contact_info', label: 'Contact Info' },
    { id: 'hours', label: 'Business Hours' },
  ];

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-gray-900 font-display uppercase text-2xl font-bold tracking-wide">Contact Page</h2>
          <p className="text-gray-500 text-sm mt-1">Edit contact details and business hours</p>
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
              placeholder="Let's talk about your project."
              className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors resize-none rounded-md"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Subtitle</label>
            <textarea
              value={hero.subtitle}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              rows={2}
              placeholder="Ready to transform your space?..."
              className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors resize-none rounded-md"
            />
          </div>
          <button onClick={() => saveContent('hero', hero)} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-[#10263C] text-white font-bold text-[13px] tracking-[0.08em] uppercase hover:bg-[#0c2236] transition-colors disabled:opacity-50 rounded-md">
            <Save className="w-4 h-4" />
            Save Hero
          </button>
        </div>
      )}

      {activeTab === 'contact_info' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Phone Number</label>
              <input
                type="text"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                placeholder="(817) 243-9116"
                className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Email</label>
              <input
                type="text"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                placeholder="info@freshimpressionspainting.com"
                className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Headquarters</label>
              <input
                type="text"
                value={contactInfo.headquarters}
                onChange={(e) => setContactInfo({ ...contactInfo, headquarters: e.target.value })}
                placeholder="Granbury, TX"
                className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Response Time</label>
              <input
                type="text"
                value={contactInfo.response_time}
                onChange={(e) => setContactInfo({ ...contactInfo, response_time: e.target.value })}
                placeholder="Within 24 hours"
                className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
              />
            </div>
          </div>
          <button onClick={() => saveContent('contact_info', contactInfo)} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-[#10263C] text-white font-bold text-[13px] tracking-[0.08em] uppercase hover:bg-[#0c2236] transition-colors disabled:opacity-50 rounded-md">
            <Save className="w-4 h-4" />
            Save Contact Info
          </button>
        </div>
      )}

      {activeTab === 'hours' && (
        <div className="space-y-8">
          {/* Section header */}
          <div className="space-y-5">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Headline</label>
              <input
                type="text"
                value={hours.headline}
                onChange={(e) => setHours({ ...hours, headline: e.target.value })}
                placeholder="Business hours."
                className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Subtitle</label>
              <textarea
                value={hours.subtitle}
                onChange={(e) => setHours({ ...hours, subtitle: e.target.value })}
                rows={2}
                placeholder="We are available for estimates..."
                className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors resize-none rounded-md"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Schedule list header */}
          <div className="flex items-center justify-between">
            <h3 className="text-gray-900 font-semibold text-sm">Schedule ({hours.hours.length})</h3>
            <button
              onClick={() => setHours({ ...hours, hours: [...hours.hours, { day: '', hours: '' }] })}
              className="inline-flex items-center gap-1.5 text-[#10263C] text-xs font-semibold hover:text-[#10263C]/70 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Day
            </button>
          </div>

          {/* Schedule rows */}
          <div className="space-y-3">
            {hours.hours.map((item, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center">
                <input
                  type="text"
                  value={item.day}
                  onChange={(e) => {
                    const updated = [...hours.hours];
                    updated[idx] = { ...item, day: e.target.value };
                    setHours({ ...hours, hours: updated });
                  }}
                  placeholder="Monday"
                  className="bg-white border border-gray-300 px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
                />
                <input
                  type="text"
                  value={item.hours}
                  onChange={(e) => {
                    const updated = [...hours.hours];
                    updated[idx] = { ...item, hours: e.target.value };
                    setHours({ ...hours, hours: updated });
                  }}
                  placeholder="8:00 AM - 5:00 PM"
                  className="bg-white border border-gray-300 px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
                />
                <button
                  onClick={() => setHours({ ...hours, hours: hours.hours.filter((_, i) => i !== idx) })}
                  className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Service area note */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Service Area Note</label>
            <textarea
              value={hours.service_area_note}
              onChange={(e) => setHours({ ...hours, service_area_note: e.target.value })}
              rows={3}
              placeholder="Fresh Impressions Painting proudly serves..."
              className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors resize-none rounded-md"
            />
          </div>

          <button onClick={() => saveContent('hours', hours)} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-[#10263C] text-white font-bold text-[13px] tracking-[0.08em] uppercase hover:bg-[#0c2236] transition-colors disabled:opacity-50 rounded-md">
            <Save className="w-4 h-4" />
            Save Hours
          </button>
        </div>
      )}
    </div>
  );
}
