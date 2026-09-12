import { useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { useSeo } from '../lib/useSeo';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

const ServiceAreas = lazy(() => import('../components/ServiceAreas'));
const AboutUs = lazy(() => import('../components/AboutUs'));
const ServicesPreview = lazy(() => import('../components/ServicesPreview'));
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
      <main>
        <Hero />
        {/* Reserve a screenful while the below-the-fold sections load. Without
            it the footer can paint inside the viewport for a moment and then
            collapse away once the real sections arrive, which measured as a
            0.15 layout shift on the runs where the footer chunk won the race. */}
        <Suspense fallback={<div className="min-h-screen" />}>
          <ServiceAreas />
          <AboutUs />
          <ServicesPreview />
          <ServiceAreaMap />
          <ReviewsTicker />
          <ReelsShowcase />
          <EstimateForm />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
