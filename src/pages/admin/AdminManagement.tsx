import { useEffect, useState, useCallback } from 'react';
import { UserPlus, Check, AlertCircle, Trash2, Shield } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
}

export default function AdminManagement() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');

  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (session) setCurrentUserId(session.user.id);
    const { data } = await supabase.from('admin_users').select('*').order('created_at');
    if (data) setAdmins(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchAdmins(); }, [fetchAdmins]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setCreating(true);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setError('You must be logged in.');
      setCreating(false);
      return;
    }

    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-admin`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      setError(result.error || 'Failed to create admin.');
    } else {
      setSuccess(`Admin "${email}" created successfully.`);
      setEmail('');
      setPassword('');
      setShowForm(false);
      fetchAdmins();
      setTimeout(() => setSuccess(''), 4000);
    }
    setCreating(false);
  };

  const handleDelete = async (admin: AdminUser) => {
    if (admin.id === currentUserId) return;
    if (!confirm(`Remove admin access for ${admin.email}? This cannot be undone.`)) return;

    const { error: err } = await supabase.from('admin_users').delete().eq('id', admin.id);
    if (err) {
      setError(err.message);
    } else {
      setAdmins(admins.filter(a => a.id !== admin.id));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-white font-display uppercase text-2xl font-bold tracking-wide">Admin Users</h2>
          <p className="text-white/40 text-sm mt-1">Manage who has access to this dashboard</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-teal text-white font-semibold text-xs tracking-[0.05em] hover:bg-brand-teal/80 transition-colors rounded-md"
        >
          <UserPlus className="w-4 h-4" />
          Add Admin
        </button>
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-400 text-sm rounded-md">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
          <button onClick={() => setError('')} className="ml-auto text-red-400/60 hover:text-red-400">&times;</button>
        </div>
      )}

      {success && (
        <div className="mb-6 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-emerald-400 text-sm rounded-md">
          <Check className="w-4 h-4 flex-shrink-0" />
          {success}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleCreate} className="mb-8 border border-white/[0.06] rounded-lg p-5 space-y-4">
          <h3 className="text-white font-medium text-sm flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-brand-teal" />
            Create New Admin
          </h3>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="newadmin@example.com"
              className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-colors rounded-md"
              required
              minLength={8}
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={creating}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-teal text-white font-semibold text-xs tracking-[0.05em] hover:bg-brand-teal/80 transition-colors disabled:opacity-50 rounded-md"
            >
              {creating ? (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <UserPlus className="w-3.5 h-3.5" />
              )}
              {creating ? 'Creating...' : 'Create Admin'}
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setEmail(''); setPassword(''); }}
              className="px-4 py-2.5 text-white/40 hover:text-white text-xs font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="border border-white/[0.06] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">User</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">Added</th>
              <th className="w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {admins.map((admin) => (
              <tr key={admin.id} className="hover:bg-white/[0.02]">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-teal/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-brand-teal text-xs font-bold">{admin.email.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{admin.email}</p>
                      {admin.id === currentUserId && (
                        <span className="text-brand-teal text-[10px] font-medium">You</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-white/30 text-xs">
                  {new Date(admin.created_at).toLocaleDateString()}
                </td>
                <td className="px-5 py-4 text-right">
                  {admin.id !== currentUserId && (
                    <button
                      onClick={() => handleDelete(admin)}
                      className="text-white/20 hover:text-red-400 transition-colors"
                      title="Remove admin"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  {admin.id === currentUserId && (
                    <Shield className="w-4 h-4 text-white/10 inline" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
