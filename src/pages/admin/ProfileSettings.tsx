import { useState } from 'react';
import { Save, Check, AlertCircle, Lock } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function ProfileSettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaved(false);

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    setSaving(true);

    const { error: err } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (err) {
      setError(err.message);
    } else {
      setSaved(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSaved(false), 4000);
    }
    setSaving(false);
  };

  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <h2 className="text-gray-900 font-display uppercase text-2xl font-bold tracking-wide">Profile Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Update your account password</p>
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm rounded-md">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
          <button onClick={() => setError('')} className="ml-auto text-red-400/60 hover:text-red-400">&times;</button>
        </div>
      )}

      {saved && (
        <div className="mb-6 flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-3 text-emerald-700 text-sm rounded-md">
          <Check className="w-4 h-4 flex-shrink-0" />
          Password updated successfully.
        </div>
      )}

      <form onSubmit={handleChangePassword} className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-6 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-[#10263C]" />
            <h3 className="text-gray-900 font-medium text-sm">Change Password</h3>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
              required
              minLength={8}
            />
            <p className="mt-1.5 text-gray-400 text-[11px]">Minimum 8 characters</p>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-white border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#10263C] focus:ring-1 focus:ring-[#10263C] transition-colors rounded-md"
              required
              minLength={8}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#10263C] text-white font-bold text-[13px] tracking-[0.08em] uppercase hover:bg-[#0c2236] transition-colors disabled:opacity-50 rounded-md"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
}
