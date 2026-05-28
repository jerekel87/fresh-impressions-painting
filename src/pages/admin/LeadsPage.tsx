import { useEffect, useState, useCallback } from 'react';
import { Mail, Phone, Clock, ChevronDown, X, MessageSquare, Save, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  service_type: string;
  description: string;
  status: string;
  notes: string;
  created_at: string;
}

const STATUS_OPTIONS = [
  { value: 'new', label: 'New', color: 'bg-sky-500/20 text-sky-400 border-sky-500/30' },
  { value: 'contacted', label: 'Contacted', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  { value: 'quoted', label: 'Quoted', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { value: 'won', label: 'Won', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  { value: 'lost', label: 'Lost', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
];

function getStatusStyle(status: string) {
  return STATUS_OPTIONS.find(s => s.value === status)?.color || STATUS_OPTIONS[0].color;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [error, setError] = useState('');

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setLeads(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    const { error: err } = await supabase
      .from('leads')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (err) {
      setError(err.message);
    } else {
      setLeads(leads.map(l => l.id === id ? { ...l, ...updates } : l));
      if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, ...updates });
    }
  };

  const filteredLeads = filterStatus === 'all' ? leads : leads.filter(l => l.status === filterStatus);

  const newCount = leads.filter(l => l.status === 'new').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-white font-display uppercase text-2xl font-bold tracking-wide">
            Leads
            {newCount > 0 && (
              <span className="ml-3 inline-flex items-center justify-center w-6 h-6 bg-sky-500/20 text-sky-400 text-xs font-bold rounded-full">
                {newCount}
              </span>
            )}
          </h2>
          <p className="text-white/40 text-sm mt-1">{leads.length} total submissions</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-400 text-sm rounded-md">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
          <button onClick={() => setError('')} className="ml-auto text-red-400/60 hover:text-red-400">&times;</button>
        </div>
      )}

      {/* Status filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
            filterStatus === 'all'
              ? 'bg-white/10 text-white border border-white/20'
              : 'bg-white/[0.03] text-white/40 border border-white/[0.06] hover:text-white/60'
          }`}
        >
          All ({leads.length})
        </button>
        {STATUS_OPTIONS.map(opt => {
          const count = leads.filter(l => l.status === opt.value).length;
          return (
            <button
              key={opt.value}
              onClick={() => setFilterStatus(opt.value)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all border ${
                filterStatus === opt.value ? opt.color : 'bg-white/[0.03] text-white/40 border-white/[0.06] hover:text-white/60'
              }`}
            >
              {opt.label} ({count})
            </button>
          );
        })}
      </div>

      {filteredLeads.length === 0 ? (
        <div className="text-center py-16">
          <MessageSquare className="w-10 h-10 text-white/10 mx-auto mb-3" />
          <p className="text-white/30 text-sm">No leads yet</p>
        </div>
      ) : (
        <div className="border border-white/[0.06] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">Contact</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">Service</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">Status</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className="hover:bg-white/[0.02] cursor-pointer transition-colors"
                >
                  <td className="px-5 py-4">
                    <p className="text-white text-sm font-medium">
                      {lead.first_name} {lead.last_name}
                      {lead.status === 'new' && (
                        <span className="ml-2 inline-block w-2 h-2 bg-sky-400 rounded-full" />
                      )}
                    </p>
                    <p className="text-white/30 text-xs mt-0.5">{lead.email || lead.phone}</p>
                  </td>
                  <td className="px-5 py-4 text-white/50 text-xs">{lead.service_type || '-'}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded border ${getStatusStyle(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-white/30 text-xs">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {timeAgo(lead.created_at)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Lead detail drawer */}
      {selectedLead && (
        <LeadDrawer
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={(updates) => updateLead(selectedLead.id, updates)}
        />
      )}
    </div>
  );
}

function LeadDrawer({ lead, onClose, onUpdate }: { lead: Lead; onClose: () => void; onUpdate: (updates: Partial<Lead>) => void }) {
  const [notes, setNotes] = useState(lead.notes);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setNotes(lead.notes); }, [lead.notes]);

  const saveNotes = async () => {
    setSaving(true);
    await onUpdate({ notes });
    setSaving(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0b1620] border-l border-white/[0.06] z-50 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-bold text-lg">{lead.first_name} {lead.last_name}</h3>
            <button onClick={onClose} className="text-white/30 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Contact info */}
          <div className="space-y-3 mb-6">
            {lead.email && (
              <a href={`mailto:${lead.email}`} className="flex items-center gap-3 text-white/60 hover:text-brand-teal text-sm transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                {lead.email}
              </a>
            )}
            {lead.phone && (
              <a href={`tel:${lead.phone}`} className="flex items-center gap-3 text-white/60 hover:text-brand-teal text-sm transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                {lead.phone}
              </a>
            )}
            <div className="flex items-center gap-3 text-white/40 text-xs">
              <Clock className="w-4 h-4 flex-shrink-0" />
              {new Date(lead.created_at).toLocaleString()}
            </div>
          </div>

          {/* Service & description */}
          {lead.service_type && (
            <div className="mb-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-1">Service Requested</p>
              <p className="text-white text-sm">{lead.service_type}</p>
            </div>
          )}
          {lead.description && (
            <div className="mb-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-1">Project Description</p>
              <p className="text-white/70 text-sm leading-relaxed">{lead.description}</p>
            </div>
          )}

          <div className="border-t border-white/[0.06] my-6" />

          {/* Status */}
          <div className="mb-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-2">Status</p>
            <div className="relative">
              <select
                value={lead.status}
                onChange={(e) => onUpdate({ status: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors rounded-md appearance-none"
              >
                {STATUS_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
            </div>
          </div>

          {/* Notes */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-2">Internal Notes</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Add notes about this lead..."
              className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors rounded-md resize-none leading-relaxed"
            />
            <button
              onClick={saveNotes}
              disabled={saving || notes === lead.notes}
              className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-brand-yellow text-navy-900 font-bold text-xs tracking-[0.08em] uppercase hover:bg-brand-gold transition-colors disabled:opacity-50 rounded-md"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? 'Saving...' : 'Save Notes'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
