import { useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { useSeo } from '../lib/useSeo';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServiceAreas from '../components/ServiceAreas';
import AboutUs from '../components/AboutUs';
import ServicesPreview from '../components/ServicesPreview';

const ServiceAreaMap = lazy(() => import('../components/ServiceAreaMap'));
const ReviewsTicker = lazy(() => import('../components/ReviewsTicker'));
const ReelsShowcase = lazy(() => import('../components/ReelsShowcase'));
const EstimateForm = lazy(() => import('../components/EstimateForm'));
const Footer = lazy(() => import('../components/Footer'));

export default function HomePage() {
  useSeo('home');
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
      <Suspense fallback={null}>
        <ServiceAreaMap />
        <ReviewsTicker />
        <ReelsShowcase />
        <EstimateForm />
        <Footer />
      </Suspense>
    </div>
  );
}
