import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AreasPage = lazy(() => import('./pages/AreasPage'));
const LoginPage = lazy(() => import('./pages/admin/LoginPage'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const HomeEditor = lazy(() => import('./pages/admin/HomeEditor'));
const AboutEditor = lazy(() => import('./pages/admin/AboutEditor'));
const AreasEditor = lazy(() => import('./pages/admin/AreasEditor'));
const ContactEditor = lazy(() => import('./pages/admin/ContactEditor'));
const SeoEditor = lazy(() => import('./pages/admin/SeoEditor'));
const ServicesEditor = lazy(() => import('./pages/admin/ServicesEditor'));
const LeadsPage = lazy(() => import('./pages/admin/LeadsPage'));
const ProfileSettings = lazy(() => import('./pages/admin/ProfileSettings'));
const AdminManagement = lazy(() => import('./pages/admin/AdminManagement'));
const FooterEditor = lazy(() => import('./pages/admin/FooterEditor'));

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" /></div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/areas" element={<AreasPage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<HomeEditor />} />
          <Route path="about" element={<AboutEditor />} />
          <Route path="areas" element={<AreasEditor />} />
          <Route path="contact" element={<ContactEditor />} />
          <Route path="services" element={<ServicesEditor />} />
          <Route path="seo" element={<SeoEditor />} />
          <Route path="footer" element={<FooterEditor />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="settings" element={<ProfileSettings />} />
          <Route path="admins" element={<AdminManagement />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
