import { useEffect, useState, useCallback } from 'react';
import { Save, Check, AlertCircle, Plus, Trash2, ChevronDown, ChevronRight, GripVertical } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import ImageUpload from '../../components/admin/ImageUpload';

interface Highlight { label: string; value: string; }
interface ProcessStep { step: string; title: string; body: string; }
interface BeforeAfter { before: string; after: string; caption: string; }
interface Faq { q: string; a: string; }

interface ServiceEntry {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  about_title: string;
  description: string[];
  highlights: Highlight[];
  process: ProcessStep[];
  before_after: BeforeAfter[];
  faqs: Faq[];
}

export default function ServicesEditor() {
  const [services, setServices] = useState<ServiceEntry[]>([]);
  const [activeSlug, setActiveSlug] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string>('basics');

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('services').select('*').order('title');
    if (data) {
      setServices(data as ServiceEntry[]);
      if (!activeSlug && data.length > 0) setActiveSlug(data[0].slug);
    }
    setLoading(false);
  }, [activeSlug]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const current = services.find(s => s.slug === activeSlug);

  const updateService = (updates: Partial<ServiceEntry>) => {
    setServices(services.map(s => s.slug === activeSlug ? { ...s, ...updates } : s));
  };

  const saveService = async () => {
    if (!current) return;
    setSaving(true);
    setSaved(false);
    setError('');

    const { error: err } = await supabase
      .from('services')
      .update({
        title: current.title,
        tagline: current.tagline,
        about_title: current.about_title,
        description: current.description,
        highlights: current.highlights,
        process: current.process,
        before_after: current.before_after,
        faqs: current.faqs,
        updated_at: new Date().toISOString(),
      })
      .eq('id', current.id);

    if (err) setError(`Failed to save: ${err.message}`);
    else { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-[#10263C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const sections = [
    { id: 'basics', label: 'Basic Info' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'process', label: 'Process Steps' },
    { id: 'beforeafter', label: 'Before & After' },
    { id: 'faqs', label: 'FAQs' },
  ];

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-gray-900 font-display uppercase text-2xl font-bold tracking-wide">Service Pages</h2>
          <p className="text-gray-500 text-sm mt-1">Edit content for each service page</p>
        </div>
        <div className="flex items-center gap-3">
          {saving && (
            <span className="inline-flex items-center gap-1.5 text-[#10263C] text-xs font-medium">
              <div className="w-3 h-3 border-2 border-[#10263C] border-t-transparent rounded-full animate-spin" />
              Saving...
            </span>
          )}
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-medium">
              <Check className="w-3.5 h-3.5" />
              Saved
            </span>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm rounded-md">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
          <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600">&times;</button>
        </div>
      )}

      {/* Service selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {services.map((s) => (
          <button
            key={s.slug}
            onClick={() => setActiveSlug(s.slug)}
            className={`px-3 py-2 text-xs font-semibold rounded-md transition-all duration-150 ${
              activeSlug === s.slug
                ? 'bg-[#10263C]/10 text-[#10263C] border border-[#10263C]/30'
                : 'bg-gray-50 text-gray-400 border border-gray-200 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {!current ? (
        <p className="text-gray-400 text-sm">Select a service to edit.</p>
      ) : (
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === section.id ? '' : section.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-900 font-medium text-sm">{section.label}</span>
                {expandedSection === section.id ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>

              {expandedSection === section.id && (
                <div className="px-5 pb-5 space-y-5 border-t border-gray-100">
                  {section.id === 'basics' && (
                    <BasicsSection current={current} updateService={updateService} />
                  )}
                  {section.id === 'highlights' && (
                    <HighlightsSection current={current} updateService={updateService} />
                  )}
                  {section.id === 'process' && (
                    <ProcessSection current={current} updateService={updateService} />
                  )}
                  {section.id === 'beforeafter' && (
                    <BeforeAfterSection current={current} updateService={updateService} />
                  )}
                  {section.id === 'faqs' && (
                    <FaqsSection current={current} updateService={updateService} />
                  )}
                </div>
              )}
            </div>
          ))}

          <button onClick={saveService} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-[#10263C] text-white font-bold text-[13px] tracking-[0.08em] uppercase hover:bg-[#0c2236] transition-colors disabled:opacity-50 rounded-md mt-4">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, multiline }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean }) {
  const cls = "w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md";
  return (
    <div className="pt-4">
      <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} placeholder={placeholder} className={`${cls} resize-none leading-relaxed`} />
      ) : (
        <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      )}
    </div>
  );
}

function BasicsSection({ current, updateService }: { current: ServiceEntry; updateService: (u: Partial<ServiceEntry>) => void }) {
  return (
    <>
      <InputField label="Title" value={current.title} onChange={(v) => updateService({ title: v })} />
      <InputField label="Tagline" value={current.tagline} onChange={(v) => updateService({ tagline: v })} placeholder="Short description shown below the title" />
      <InputField label="About Section Title" value={current.about_title} onChange={(v) => updateService({ about_title: v })} placeholder="e.g. 'More than paint on a wall.'" />
      <div className="pt-4">
        <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Description Paragraphs</label>
        {current.description.map((para, i) => (
          <div key={i} className="flex gap-2 mb-3">
            <textarea
              value={para}
              onChange={(e) => {
                const desc = [...current.description];
                desc[i] = e.target.value;
                updateService({ description: desc });
              }}
              rows={3}
              className="flex-1 bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md resize-none leading-relaxed"
            />
            <button onClick={() => updateService({ description: current.description.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-500 px-2 self-start mt-3">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        <button onClick={() => updateService({ description: [...current.description, ''] })} className="inline-flex items-center gap-1.5 text-[#10263C] text-xs font-semibold hover:text-[#10263C]/70">
          <Plus className="w-3.5 h-3.5" /> Add Paragraph
        </button>
      </div>
    </>
  );
}

function HighlightsSection({ current, updateService }: { current: ServiceEntry; updateService: (u: Partial<ServiceEntry>) => void }) {
  return (
    <div className="pt-4 space-y-3">
      {current.highlights.map((h, i) => (
        <div key={i} className="flex gap-3 items-start">
          <GripVertical className="w-4 h-4 text-gray-300 mt-3 flex-shrink-0" />
          <input
            type="text"
            value={h.label}
            onChange={(e) => {
              const hl = [...current.highlights];
              hl[i] = { ...hl[i], label: e.target.value };
              updateService({ highlights: hl });
            }}
            placeholder="Label"
            className="w-1/3 bg-white border border-gray-300 px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
          />
          <input
            type="text"
            value={h.value}
            onChange={(e) => {
              const hl = [...current.highlights];
              hl[i] = { ...hl[i], value: e.target.value };
              updateService({ highlights: hl });
            }}
            placeholder="Value"
            className="flex-1 bg-white border border-gray-300 px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
          />
          <button onClick={() => updateService({ highlights: current.highlights.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-500 px-1 mt-2.5">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
      <button onClick={() => updateService({ highlights: [...current.highlights, { label: '', value: '' }] })} className="inline-flex items-center gap-1.5 text-[#10263C] text-xs font-semibold hover:text-[#10263C]/70">
        <Plus className="w-3.5 h-3.5" /> Add Highlight
      </button>
    </div>
  );
}

function ProcessSection({ current, updateService }: { current: ServiceEntry; updateService: (u: Partial<ServiceEntry>) => void }) {
  return (
    <div className="pt-4 space-y-4">
      {current.process.map((p, i) => (
        <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs font-mono">Step {p.step || String(i + 1).padStart(2, '0')}</span>
            <button onClick={() => updateService({ process: current.process.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-500">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <input
            type="text"
            value={p.title}
            onChange={(e) => {
              const proc = [...current.process];
              proc[i] = { ...proc[i], title: e.target.value };
              updateService({ process: proc });
            }}
            placeholder="Step title"
            className="w-full bg-white border border-gray-300 px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
          />
          <textarea
            value={p.body}
            onChange={(e) => {
              const proc = [...current.process];
              proc[i] = { ...proc[i], body: e.target.value };
              updateService({ process: proc });
            }}
            rows={2}
            placeholder="Step description"
            className="w-full bg-white border border-gray-300 px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md resize-none leading-relaxed"
          />
        </div>
      ))}
      <button onClick={() => updateService({ process: [...current.process, { step: String(current.process.length + 1).padStart(2, '0'), title: '', body: '' }] })} className="inline-flex items-center gap-1.5 text-[#10263C] text-xs font-semibold hover:text-[#10263C]/70">
        <Plus className="w-3.5 h-3.5" /> Add Step
      </button>
    </div>
  );
}

function BeforeAfterSection({ current, updateService }: { current: ServiceEntry; updateService: (u: Partial<ServiceEntry>) => void }) {
  return (
    <div className="pt-4 space-y-4">
      {current.before_after.map((ba, i) => (
        <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs">Comparison {i + 1}</span>
            <button onClick={() => updateService({ before_after: current.before_after.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-500">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ImageUpload
              value={ba.before}
              onChange={(url) => {
                const arr = [...current.before_after];
                arr[i] = { ...arr[i], before: url };
                updateService({ before_after: arr });
              }}
              folder={`services/${current.slug}/before-after`}
              label="Before"
              variant="light"
            />
            <ImageUpload
              value={ba.after}
              onChange={(url) => {
                const arr = [...current.before_after];
                arr[i] = { ...arr[i], after: url };
                updateService({ before_after: arr });
              }}
              folder={`services/${current.slug}/before-after`}
              label="After"
              variant="light"
            />
          </div>
          <input
            type="text"
            value={ba.caption}
            onChange={(e) => {
              const arr = [...current.before_after];
              arr[i] = { ...arr[i], caption: e.target.value };
              updateService({ before_after: arr });
            }}
            placeholder="Caption"
            className="w-full bg-white border border-gray-300 px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
          />
        </div>
      ))}
      <button onClick={() => updateService({ before_after: [...current.before_after, { before: '', after: '', caption: '' }] })} className="inline-flex items-center gap-1.5 text-[#10263C] text-xs font-semibold hover:text-[#10263C]/70">
        <Plus className="w-3.5 h-3.5" /> Add Comparison
      </button>
    </div>
  );
}

function FaqsSection({ current, updateService }: { current: ServiceEntry; updateService: (u: Partial<ServiceEntry>) => void }) {
  return (
    <div className="pt-4 space-y-4">
      {current.faqs.map((faq, i) => (
        <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs">FAQ {i + 1}</span>
            <button onClick={() => updateService({ faqs: current.faqs.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-500">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <input
            type="text"
            value={faq.q}
            onChange={(e) => {
              const arr = [...current.faqs];
              arr[i] = { ...arr[i], q: e.target.value };
              updateService({ faqs: arr });
            }}
            placeholder="Question"
            className="w-full bg-white border border-gray-300 px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
          />
          <textarea
            value={faq.a}
            onChange={(e) => {
              const arr = [...current.faqs];
              arr[i] = { ...arr[i], a: e.target.value };
              updateService({ faqs: arr });
            }}
            rows={3}
            placeholder="Answer"
            className="w-full bg-white border border-gray-300 px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md resize-none leading-relaxed"
          />
        </div>
      ))}
      <button onClick={() => updateService({ faqs: [...current.faqs, { q: '', a: '' }] })} className="inline-flex items-center gap-1.5 text-[#10263C] text-xs font-semibold hover:text-[#10263C]/70">
        <Plus className="w-3.5 h-3.5" /> Add FAQ
      </button>
    </div>
  );
}
