import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicePage from './pages/ServicePage';
import ContactPage from './pages/ContactPage';
import AreasPage from './pages/AreasPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services/:slug" element={<ServicePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/areas" element={<AreasPage />} />
    </Routes>
  );
}

export default App;
