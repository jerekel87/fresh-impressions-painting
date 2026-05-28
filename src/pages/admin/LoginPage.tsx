import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import logo from '../../assets/freshimpressionspainting-web-logo.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError('Invalid email or password.');
      setLoading(false);
      return;
    }

    const { data: adminData } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', data.user.id)
      .maybeSingle();

    if (!adminData) {
      await supabase.auth.signOut();
      setError('You do not have admin access.');
      setLoading(false);
      return;
    }

    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#0a1e30] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <img src={logo} alt="Fresh Impressions Painting" className="h-10 mx-auto mb-8 opacity-80" />
          <h1 className="font-display uppercase text-2xl font-bold text-white tracking-wide">
            Admin Portal
          </h1>
          <p className="text-white/40 text-sm mt-2">Sign in to manage your website content</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-brand-teal/50 focus:bg-white/[0.06] transition-all duration-300"
              placeholder="admin@freshimpressionspainting.com"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-brand-teal/50 focus:bg-white/[0.06] transition-all duration-300"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand-yellow text-navy-900 font-bold text-[13px] tracking-[0.1em] uppercase hover:bg-brand-gold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-white/30 text-xs hover:text-white/50 transition-colors">
            &larr; Back to website
          </a>
        </div>
      </div>
    </div>
  );
}
