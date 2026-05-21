import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServiceAreas from '../components/ServiceAreas';
import AboutUs from '../components/AboutUs';
import ServicesPreview from '../components/ServicesPreview';
import ServiceAreaMap from '../components/ServiceAreaMap';
import ReviewsTicker from '../components/ReviewsTicker';
import ReelsShowcase from '../components/ReelsShowcase';
import EstimateForm from '../components/EstimateForm';
import Footer from '../components/Footer';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const hash = (location.state as { scrollTo?: string })?.scrollTo;
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ServiceAreas />
      <AboutUs />
      <ServicesPreview />
      <ServiceAreaMap />
      <ReviewsTicker />
      <ReelsShowcase />
      <EstimateForm />
      <Footer />
    </div>
  );
}
