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
