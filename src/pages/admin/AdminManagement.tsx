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
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
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
        <div className="w-6 h-6 border-2 border-[#10263C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-gray-900 font-display uppercase text-2xl font-bold tracking-wide">Admin Users</h2>
          <p className="text-gray-500 text-sm mt-1">Manage who has access to this dashboard</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#10263C] text-white font-bold text-xs tracking-[0.08em] uppercase hover:bg-[#0c2236] transition-colors rounded-md"
        >
          <UserPlus className="w-4 h-4" />
          Add Admin
        </button>
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm rounded-md">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
          <button onClick={() => setError('')} className="ml-auto text-red-400/60 hover:text-red-700">&times;</button>
        </div>
      )}

      {success && (
        <div className="mb-6 flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-3 text-emerald-700 text-sm rounded-md">
          <Check className="w-4 h-4 flex-shrink-0" />
          {success}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleCreate} className="mb-8 border border-gray-200 rounded-lg p-5 space-y-4">
          <h3 className="text-gray-900 font-medium text-sm flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-[#10263C]" />
            Create New Admin
          </h3>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="newadmin@example.com"
              className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md placeholder:text-gray-400"
              required
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md placeholder:text-gray-400"
              required
              minLength={8}
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={creating}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#10263C] text-white font-bold text-xs tracking-[0.08em] uppercase hover:bg-[#0c2236] transition-colors disabled:opacity-50 rounded-md"
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
              className="px-4 py-2.5 text-gray-500 hover:text-gray-900 text-xs font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-500">User</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-500">Added</th>
              <th className="w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {admins.map((admin) => (
              <tr key={admin.id} className="hover:bg-gray-50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#10263C]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#10263C] text-xs font-bold">{admin.email.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-gray-900 text-sm font-medium">{admin.email}</p>
                      {admin.id === currentUserId && (
                        <span className="text-[#10263C] text-[10px] font-medium">You</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-gray-400 text-xs">
                  {new Date(admin.created_at).toLocaleDateString()}
                </td>
                <td className="px-5 py-4 text-right">
                  {admin.id !== currentUserId && (
                    <button
                      onClick={() => handleDelete(admin)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove admin"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  {admin.id === currentUserId && (
                    <Shield className="w-4 h-4 text-gray-200 inline" />
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
