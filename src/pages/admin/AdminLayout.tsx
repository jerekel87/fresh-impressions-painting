import { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, LogOut, Menu, X, Users, MapPin, Phone, Search, Paintbrush, Inbox, Settings, ShieldCheck, Globe } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import logo from '../../assets/freshimpressionspainting-web-logo.png';

export default function AdminLayout() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/admin/login', { replace: true });
        return;
      }
      supabase.from('admin_users').select('id').eq('id', session.user.id).maybeSingle().then(({ data }) => {
        if (!data) {
          supabase.auth.signOut();
          navigate('/admin/login', { replace: true });
          return;
        }
        setUser({ email: session.user.email || '' });
        setLoading(false);
      });
    });
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#10263C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const contentNav = [
    { to: '/admin', icon: Home, label: 'Home Page', end: true },
    { to: '/admin/about', icon: Users, label: 'About Page', end: false },
    { to: '/admin/areas', icon: MapPin, label: 'Areas Page', end: false },
    { to: '/admin/contact', icon: Phone, label: 'Contact Page', end: false },
    { to: '/admin/services', icon: Paintbrush, label: 'Services', end: false },
    { to: '/admin/footer', icon: Globe, label: 'Footer & Social', end: false },
    { to: '/admin/seo', icon: Search, label: 'SEO', end: false },
  ];

  const businessNav = [
    { to: '/admin/leads', icon: Inbox, label: 'Leads', end: false },
  ];

  const systemNav = [
    { to: '/admin/settings', icon: Settings, label: 'Profile', end: false },
    { to: '/admin/admins', icon: ShieldCheck, label: 'Admin Users', end: false },
  ];

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#10263C] flex flex-col transform transition-transform duration-300 lg:transform-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="px-4 py-4 border-b border-white/[0.08] flex items-center justify-between">
          <img src={logo} alt="Fresh Impressions" className="h-12 opacity-90" />
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/40 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 pt-6 overflow-y-auto">
          <p className="px-6 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
            Content
          </p>
          <nav className="divide-y divide-white/[0.06]">
            {contentNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-2.5 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'text-white bg-white/[0.05] border-l-2 border-brand-teal'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/[0.03] border-l-2 border-transparent'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <p className="px-6 mt-6 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
            Business
          </p>
          <nav className="divide-y divide-white/[0.06]">
            {businessNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-2.5 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'text-white bg-white/[0.05] border-l-2 border-brand-teal'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/[0.03] border-l-2 border-transparent'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <p className="px-6 mt-6 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
            System
          </p>
          <nav className="divide-y divide-white/[0.06]">
            {systemNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-2.5 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'text-white bg-white/[0.05] border-l-2 border-brand-teal'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/[0.03] border-l-2 border-transparent'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="px-4 py-4 border-t border-white/[0.08]">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-brand-teal/20 flex items-center justify-center flex-shrink-0">
              <span className="text-brand-teal text-xs font-bold">{user?.email?.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/80 text-xs font-medium truncate">{user?.email}</p>
              <p className="text-white/40 text-[10px]">Administrator</p>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="text-white/30 hover:text-red-400 transition-colors flex-shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        {/* Top bar */}
        <header className="flex-shrink-0 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-900">
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#10263C]" />
                <h1 className="text-gray-900 font-semibold text-sm">Content Management</h1>
              </div>
            </div>
            <a
              href="/"
              target="_blank"
              className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-400 hover:text-gray-700 transition-colors"
            >
              View Site &rarr;
            </a>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
