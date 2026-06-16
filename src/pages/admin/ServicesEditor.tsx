import { useEffect, useState, useCallback, useRef } from 'react';
import { Save, Check, AlertCircle, Plus, Trash2, ChevronDown, ChevronRight, GripVertical, Upload, Video } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import ImageUpload from '../../components/admin/ImageUpload';

interface Highlight { label: string; value: string; }
interface ProcessStep { step: string; title: string; body: string; }
interface BeforeAfter { before: string; after: string; caption: string; }
interface Faq { q: string; a: string; }
interface PhotoSeriesEntry { seriesLabel: string; caption: string; images: string[]; }

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
  hero_image: string | null;
  warning_video: string | null;
  photo_series: PhotoSeriesEntry[];
  gallery_images: string[];
  about_image: string | null;
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
    const { data } = await supabase
      .from('services')
      .select('*')
      .order('title');
    if (data) {
      const normalized = (data as ServiceEntry[]).map(s => ({
        ...s,
        hero_image: s.hero_image ?? null,
        warning_video: s.warning_video ?? null,
        photo_series: s.photo_series ?? [],
        gallery_images: s.gallery_images ?? [],
        about_image: s.about_image ?? null,
      }));
      setServices(normalized);
      if (!activeSlug && normalized.length > 0) setActiveSlug(normalized[0].slug);
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
        hero_image: current.hero_image,
        warning_video: current.warning_video,
        photo_series: current.photo_series,
        gallery_images: current.gallery_images,
        about_image: current.about_image,
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

  const hasWarningVideo = [
    'cabinet-finishing-and-refinishing',
    'metal-finishing-and-refinishing',
    'exterior-painting',
    'drywall-repair-and-finishing',
  ].includes(current?.slug ?? '');
  const isNewConstruction = current?.slug === 'new-construction-painting';

  const sections = [
    { id: 'basics', label: 'Basic Info' },
    { id: 'gallery', label: 'Scrolling Gallery' },
    ...(hasWarningVideo ? [{ id: 'warningvideo', label: 'Warning Video' }] : []),
    { id: 'highlights', label: 'Highlights' },
    { id: 'process', label: 'Process Steps' },
    { id: 'beforeafter', label: 'Before & After' },
    ...(isNewConstruction ? [{ id: 'photoseries', label: 'Photo Series' }] : []),
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
            onClick={() => { setActiveSlug(s.slug); setExpandedSection('basics'); }}
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
                  {section.id === 'gallery' && (
                    <GallerySection current={current} updateService={updateService} />
                  )}
                  {section.id === 'warningvideo' && (
                    <WarningVideoSection current={current} updateService={updateService} />
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
                  {section.id === 'photoseries' && (
                    <PhotoSeriesSection current={current} updateService={updateService} />
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
        <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">Hero Image</label>
        <p className="text-[11px] text-gray-400 mb-3">Upload to override the default static hero banner image for this service page.</p>
        <ImageUpload
          value={current.hero_image ?? ''}
          onChange={(url) => updateService({ hero_image: url || null })}
          folder={`services/${current.slug}/hero`}
          label=""
          variant="light"
        />
      </div>
      <div className="pt-4">
        <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">About Section Image</label>
        <p className="text-[11px] text-gray-400 mb-3">Shown in the about section on the right side. Falls back to the hero image if not set.</p>
        <ImageUpload
          value={current.about_image ?? ''}
          onChange={(url) => updateService({ about_image: url || null })}
          folder={`services/${current.slug}/about`}
          label=""
          variant="light"
        />
      </div>
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

function GallerySection({ current, updateService }: { current: ServiceEntry; updateService: (u: Partial<ServiceEntry>) => void }) {
  const updateImage = (idx: number, url: string) => {
    const imgs = [...current.gallery_images];
    imgs[idx] = url;
    updateService({ gallery_images: imgs });
  };

  const removeImage = (idx: number) => {
    updateService({ gallery_images: current.gallery_images.filter((_, i) => i !== idx) });
  };

  const addImage = () => {
    updateService({ gallery_images: [...current.gallery_images, ''] });
  };

  return (
    <div className="pt-4 space-y-4">
      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-700 text-[11px] leading-relaxed">
          These images scroll right-to-left just below the hero banner on this service page. When saved, they replace the default static gallery. Add as many as you like — 8 or more is ideal for a smooth loop.
        </p>
      </div>

      {current.gallery_images.length === 0 && (
        <p className="text-gray-400 text-sm text-center py-6 border border-dashed border-gray-200 rounded-lg">
          No images yet. The default static gallery images will be shown. Add images below to override them.
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {current.gallery_images.map((img, idx) => (
          <div key={idx} className="relative group">
            <ImageUpload
              value={img}
              onChange={(url) => updateImage(idx, url)}
              folder={`services/${current.slug}/gallery`}
              label={`Image ${idx + 1}`}
              variant="light"
            />
            <button
              onClick={() => removeImage(idx)}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
            >
              <Trash2 className="w-2.5 h-2.5" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addImage}
        className="inline-flex items-center gap-1.5 text-[#10263C] text-xs font-semibold hover:text-[#10263C]/70"
      >
        <Plus className="w-3.5 h-3.5" /> Add Gallery Image
      </button>
    </div>
  );
}

const WARNING_VIDEO_INFO: Record<string, { label: string; description: string }> = {
  'cabinet-finishing-and-refinishing': {
    label: 'Cabinet Warning Video',
    description: 'This video plays automatically in the "Don\'t let this be your cabinets" section. Upload footage showing bad cabinet finish work.',
  },
  'metal-finishing-and-refinishing': {
    label: 'Metal Finishing Warning Video',
    description: 'This video plays automatically in the "Don\'t let rust win" section. Upload footage showing rusted or poorly coated metal surfaces.',
  },
  'exterior-painting': {
    label: 'Exterior Painting Warning Video',
    description: 'This video plays automatically in the "Don\'t let shortcuts cost you twice" section. Upload footage showing peeling or failed exterior paint work.',
  },
  'drywall-repair-and-finishing': {
    label: 'Drywall Warning Video',
    description: 'This video plays automatically in the "Don\'t settle for repairs that show" section. Upload footage showing visible patches, bad texture matching, or poor drywall repairs.',
  },
};

function WarningVideoSection({ current, updateService }: { current: ServiceEntry; updateService: (u: Partial<ServiceEntry>) => void }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadVideo = async (file: File) => {
    if (!file.type.startsWith('video/')) {
      setUploadError('Please select a video file.');
      return;
    }
    setUploading(true);
    setUploadError('');

    const ext = file.name.split('.').pop();
    const fileName = `services/${current.slug}/video/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error } = await supabase.storage.from('images').upload(fileName, file, {
      cacheControl: '31536000',
      upsert: false,
    });

    if (error) {
      setUploadError(`Upload failed: ${error.message}`);
    } else {
      const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName);
      updateService({ warning_video: urlData.publicUrl });
    }
    setUploading(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadVideo(file);
  };

  return (
    <div className="pt-4 space-y-4">
      <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <Video className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-amber-800 text-xs font-semibold mb-1">
            {WARNING_VIDEO_INFO[current.slug]?.label ?? 'Warning Video'}
          </p>
          <p className="text-amber-700 text-[11px] leading-relaxed">
            {WARNING_VIDEO_INFO[current.slug]?.description ?? 'Upload a video that autoplays muted in the warning section on this service page.'}
          </p>
        </div>
      </div>

      {uploadError && (
        <p className="text-red-600 text-xs">{uploadError}</p>
      )}

      {current.warning_video ? (
        <div className="space-y-3">
          <video
            src={current.warning_video}
            className="w-full rounded-lg border border-gray-200 bg-black"
            style={{ maxHeight: 280 }}
            controls
            muted
          />
          <div className="flex gap-2">
            <button
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-gray-100 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5" />
              {uploading ? 'Uploading...' : 'Replace Video'}
            </button>
            <button
              onClick={() => updateService({ warning_video: null })}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-red-50 border border-red-200 rounded-md text-red-600 hover:bg-red-100 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-[#10263C] border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-gray-500">Uploading video...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Video className="w-8 h-8 text-gray-300" />
              <p className="text-sm text-gray-500">Drop video here or <span className="text-[#10263C] font-medium">browse</span></p>
              <p className="text-[11px] text-gray-400">MP4, MOV, WebM — video will autoplay muted</p>
            </div>
          )}
        </div>
      )}

      <div className="pt-1">
        <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Or paste a video URL</label>
        <input
          type="url"
          value={current.warning_video ?? ''}
          onChange={(e) => updateService({ warning_video: e.target.value || null })}
          placeholder="https://..."
          className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
        />
      </div>

      <input ref={inputRef} type="file" accept="video/*" className="hidden" onChange={handleFileSelect} />
    </div>
  );
}

function PhotoSeriesSection({ current, updateService }: { current: ServiceEntry; updateService: (u: Partial<ServiceEntry>) => void }) {
  const updateSeries = (updated: PhotoSeriesEntry[]) => updateService({ photo_series: updated });

  const addSeries = () => updateSeries([...current.photo_series, { seriesLabel: '', caption: '', images: ['', ''] }]);
  const removeSeries = (idx: number) => updateSeries(current.photo_series.filter((_, i) => i !== idx));

  const updateSeriesField = (idx: number, field: keyof PhotoSeriesEntry, value: string) => {
    const updated = [...current.photo_series];
    updated[idx] = { ...updated[idx], [field]: value };
    updateSeries(updated);
  };

  const updateImage = (seriesIdx: number, imgIdx: number, url: string) => {
    const updated = [...current.photo_series];
    const images = [...updated[seriesIdx].images];
    images[imgIdx] = url;
    updated[seriesIdx] = { ...updated[seriesIdx], images };
    updateSeries(updated);
  };

  const addImage = (seriesIdx: number) => {
    const updated = [...current.photo_series];
    updated[seriesIdx] = { ...updated[seriesIdx], images: [...updated[seriesIdx].images, ''] };
    updateSeries(updated);
  };

  const removeImage = (seriesIdx: number, imgIdx: number) => {
    const updated = [...current.photo_series];
    updated[seriesIdx] = {
      ...updated[seriesIdx],
      images: updated[seriesIdx].images.filter((_, i) => i !== imgIdx),
    };
    updateSeries(updated);
  };

  return (
    <div className="pt-4 space-y-6">
      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-700 text-[11px] leading-relaxed">
          Photo series display as a slideshow of images from the same job. Each series appears as its own slot in the "Full job walkthroughs" section below the before &amp; after comparisons. These override the default static series from the codebase when saved.
        </p>
      </div>

      {current.photo_series.length === 0 && (
        <p className="text-gray-400 text-sm text-center py-6 border border-dashed border-gray-200 rounded-lg">
          No photo series yet. Add one below to override the default series.
        </p>
      )}

      {current.photo_series.map((series, sIdx) => (
        <div key={sIdx} className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
            <span className="text-gray-700 text-xs font-semibold uppercase tracking-wider">Series {sIdx + 1}</span>
            <button onClick={() => removeSeries(sIdx)} className="text-red-400 hover:text-red-500">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-1.5">Series Label</label>
                <input
                  type="text"
                  value={series.seriesLabel}
                  onChange={(e) => updateSeriesField(sIdx, 'seriesLabel', e.target.value)}
                  placeholder="e.g. Series N-2"
                  className="w-full bg-white border border-gray-300 px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-1.5">Caption</label>
                <input
                  type="text"
                  value={series.caption}
                  onChange={(e) => updateSeriesField(sIdx, 'caption', e.target.value)}
                  placeholder="e.g. Complete new construction home"
                  className="w-full bg-white border border-gray-300 px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">
                Photos ({series.images.length})
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {series.images.map((img, imgIdx) => (
                  <div key={imgIdx} className="relative group">
                    <ImageUpload
                      value={img}
                      onChange={(url) => updateImage(sIdx, imgIdx, url)}
                      folder={`services/${current.slug}/series`}
                      label={`Photo ${imgIdx + 1}`}
                      variant="light"
                    />
                    {series.images.length > 2 && (
                      <button
                        onClick={() => removeImage(sIdx, imgIdx)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={() => addImage(sIdx)}
                className="mt-3 inline-flex items-center gap-1.5 text-[#10263C] text-xs font-semibold hover:text-[#10263C]/70"
              >
                <Plus className="w-3.5 h-3.5" /> Add Photo to Series
              </button>
            </div>
          </div>
        </div>
      ))}

      <button onClick={addSeries} className="inline-flex items-center gap-1.5 text-[#10263C] text-xs font-semibold hover:text-[#10263C]/70">
        <Plus className="w-3.5 h-3.5" /> Add Photo Series
      </button>
    </div>
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
