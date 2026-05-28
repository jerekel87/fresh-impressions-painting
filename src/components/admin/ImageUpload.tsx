import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  compact?: boolean;
}

export default function ImageUpload({ value, onChange, folder = 'general', label, compact = false }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setUploading(true);

    const ext = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error } = await supabase.storage.from('images').upload(fileName, file, {
      cacheControl: '31536000',
      upsert: false,
    });

    if (!error) {
      const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName);
      onChange(urlData.publicUrl);
    }
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const clearImage = () => {
    onChange('');
  };

  if (compact) {
    return (
      <div className="space-y-2">
        {label && <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">{label}</label>}
        <div className="flex items-center gap-3">
          {value ? (
            <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border border-white/[0.08]">
              <img src={value} alt="" className="w-full h-full object-cover" />
              <button onClick={clearImage} className="absolute top-0.5 right-0.5 w-4 h-4 bg-black/70 rounded-full flex items-center justify-center">
                <X className="w-2.5 h-2.5 text-white" />
              </button>
            </div>
          ) : (
            <div className="w-16 h-16 rounded-md border border-dashed border-white/[0.12] flex items-center justify-center flex-shrink-0">
              <ImageIcon className="w-4 h-4 text-white/20" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <button
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/[0.05] border border-white/[0.1] rounded-md text-white/60 hover:text-white hover:border-white/[0.2] transition-colors disabled:opacity-50"
            >
              {uploading ? (
                <div className="w-3 h-3 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
              ) : (
                <Upload className="w-3 h-3" />
              )}
              {uploading ? 'Uploading...' : value ? 'Replace' : 'Upload'}
            </button>
            {value && (
              <p className="text-[10px] text-white/20 mt-1 truncate">{value.split('/').pop()}</p>
            )}
          </div>
        </div>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {label && <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">{label}</label>}
      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-white/[0.08]">
          <img src={value} alt="" className="w-full h-40 object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              onClick={() => inputRef.current?.click()}
              className="px-3 py-2 bg-white/20 backdrop-blur-sm rounded-md text-white text-xs font-medium hover:bg-white/30 transition-colors"
            >
              <Upload className="w-3.5 h-3.5 inline mr-1.5" />
              Replace
            </button>
            <button
              onClick={clearImage}
              className="px-3 py-2 bg-red-500/30 backdrop-blur-sm rounded-md text-white text-xs font-medium hover:bg-red-500/50 transition-colors"
            >
              <X className="w-3.5 h-3.5 inline mr-1.5" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
            dragOver
              ? 'border-brand-teal/50 bg-brand-teal/5'
              : 'border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.02]'
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
              <p className="text-white/40 text-xs">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-6 h-6 text-white/20" />
              <p className="text-white/40 text-xs">
                Drop image here or <span className="text-brand-teal">browse</span>
              </p>
              <p className="text-white/20 text-[10px]">PNG, JPG, WebP up to 10MB</p>
            </div>
          )}
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
    </div>
  );
}
