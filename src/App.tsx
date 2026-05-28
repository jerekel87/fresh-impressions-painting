import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicePage from './pages/ServicePage';
import ContactPage from './pages/ContactPage';
import AreasPage from './pages/AreasPage';
import LoginPage from './pages/admin/LoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import HomeEditor from './pages/admin/HomeEditor';
import AboutEditor from './pages/admin/AboutEditor';
import AreasEditor from './pages/admin/AreasEditor';
import ContactEditor from './pages/admin/ContactEditor';
import SeoEditor from './pages/admin/SeoEditor';
import ServicesEditor from './pages/admin/ServicesEditor';

function App() {
  return (
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
      </Route>
    </Routes>
  );
}

export default App;
