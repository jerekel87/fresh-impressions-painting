import { useEffect } from 'react';
import { Star, Shield, Heart, Eye } from 'lucide-react';
import { useSeo } from '../lib/useSeo';
import Navbar from '../components/Navbar';
import EstimateForm from '../components/EstimateForm';
import Footer from '../components/Footer';
import familyPhoto from '../assets/Photo_Apr_27_2026,_5_25_00_PM.jpg';
import sprayingPhoto from '../assets/Photo_Apr_27_2026,_4_53_17_PM_(1).jpg';
import liftPhoto from '../assets/Photo_Nov_04_2025,_11_14_05_AM.jpg';

export default function AboutPage() {
  useSeo('about');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-navy-900 pt-[100px] sm:pt-[132px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end">
            <div>
              <span className="inline-block text-brand-yellow font-semibold text-xs uppercase tracking-[0.2em] mb-5">
                About Us
              </span>
              <h1
                className="font-display uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white"
                style={{ lineHeight: 1.05 }}
              >
                Built on faith,<br />
                driven by craft.
              </h1>
            </div>
            <div className="lg:pb-2">
              <p className="text-white/50 text-base sm:text-lg leading-[1.85] max-w-md">
                The story behind Fresh Impressions Painting and the values that guide every project we take on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="py-16 sm:py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Photo collage */}
            <div className="relative">
              <div className="grid grid-cols-12 grid-rows-12 gap-3 sm:gap-4 h-[420px] sm:h-[640px] lg:h-[720px]">
                <div className="col-span-7 row-span-12 overflow-hidden">
                  <img
                    src={familyPhoto}
                    alt="Ian Rosenkranz with his wife, daughter, and dog"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="col-span-5 row-span-6 overflow-hidden">
                  <img
                    src={liftPhoto}
                    alt="Ian working on a lift"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="col-span-5 row-span-6 overflow-hidden">
                  <img
                    src={sprayingPhoto}
                    alt="Ian spray painting an exterior"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right: Story */}
            <div className="lg:pt-8">
              <div className="inline-flex items-center gap-0.5 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-sm font-medium text-gray-600 ml-2">5-Star Rated</span>
              </div>

              <h2
                className="font-display uppercase text-4xl md:text-5xl lg:text-7xl font-bold text-navy-900 mb-8"
                style={{ lineHeight: 1.05 }}
              >
                A decade of discipline,<br className="hidden sm:block" />
                detail, and devotion.
              </h2>

              <div className="space-y-6 text-gray-600 text-[15px] sm:text-base leading-[1.85]">
                <p>
                  Owner Ian Rosenkranz has proudly served in the painting industry since 2015 and founded Fresh Impressions in 2022 with a clear mission: to help families and businesses transform their spaces with expert craftsmanship, lasting quality, and a fresh new look. As a devoted husband and father to one daughter, Ian's faith in God, commitment to family, and dedication to integrity are the foundation of both his life and his business.
                </p>
                <p>
                  From a young age, Ian developed discipline, focus, and attention to detail through martial arts -- qualities that naturally carried into his professional career. Over the years, those strengths have grown into a refined expertise in surface preparation, product knowledge, precision application, and creating beautiful, durable finishes designed to stand the test of time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values / Philosophy Section */}
      <section className="py-20 sm:py-28 md:py-36 bg-navy-900 relative overflow-hidden">
        {/* Decorative gradient orb */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-teal/[0.04] rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-yellow/[0.03] rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-end mb-16 sm:mb-20">
            <div>
              <span className="inline-block text-brand-yellow font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                Our Values
              </span>
              <h2
                className="font-display uppercase text-4xl md:text-5xl lg:text-7xl font-bold text-white"
                style={{ lineHeight: 1.05 }}
              >
                More than color<br className="hidden md:block" /> on walls.
              </h2>
            </div>
            <div>
              <p className="text-white/50 text-base sm:text-lg leading-[1.85] max-w-lg lg:ml-auto">
                Ian is passionate about serving others and believes in treating every customer with honesty, respect, and genuine care. A paint project is about creating a space that feels renewed, welcoming, and uniquely yours.
              </p>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06]">
            {/* Value 1 - Integrity */}
            <div className="group bg-navy-900 p-8 sm:p-10 lg:p-12 relative overflow-hidden hover:bg-[#132d44] transition-colors duration-500">
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
                <span className="font-display text-[64px] sm:text-[80px] font-bold text-white/[0.03] leading-none group-hover:text-white/[0.06] transition-colors duration-500">01</span>
              </div>
              <div className="relative">
                <div className="w-10 h-10 border border-brand-teal/30 flex items-center justify-center mb-6 group-hover:border-brand-teal/60 group-hover:bg-brand-teal/10 transition-all duration-500">
                  <Shield className="w-4.5 h-4.5 text-brand-teal" />
                </div>
                <h3 className="font-display uppercase text-xl sm:text-2xl font-bold text-white mb-3 tracking-wide">
                  Integrity
                </h3>
                <p className="text-white/40 text-[15px] leading-[1.8] max-w-sm group-hover:text-white/60 transition-colors duration-500">
                  Guided by faith and strong work ethic, every project is approached with complete honesty and transparency from quote to final walkthrough.
                </p>
              </div>
            </div>

            {/* Value 2 - Attention to Detail */}
            <div className="group bg-navy-900 p-8 sm:p-10 lg:p-12 relative overflow-hidden hover:bg-[#132d44] transition-colors duration-500">
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
                <span className="font-display text-[64px] sm:text-[80px] font-bold text-white/[0.03] leading-none group-hover:text-white/[0.06] transition-colors duration-500">02</span>
              </div>
              <div className="relative">
                <div className="w-10 h-10 border border-brand-teal/30 flex items-center justify-center mb-6 group-hover:border-brand-teal/60 group-hover:bg-brand-teal/10 transition-all duration-500">
                  <Eye className="w-4.5 h-4.5 text-brand-teal" />
                </div>
                <h3 className="font-display uppercase text-xl sm:text-2xl font-bold text-white mb-3 tracking-wide">
                  Attention to Detail
                </h3>
                <p className="text-white/40 text-[15px] leading-[1.8] max-w-sm group-hover:text-white/60 transition-colors duration-500">
                  Years of discipline refined into expertise -- meticulous surface prep, product knowledge, and precision application on every surface.
                </p>
              </div>
            </div>

            {/* Value 3 - Genuine Care */}
            <div className="group bg-navy-900 p-8 sm:p-10 lg:p-12 relative overflow-hidden hover:bg-[#132d44] transition-colors duration-500">
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
                <span className="font-display text-[64px] sm:text-[80px] font-bold text-white/[0.03] leading-none group-hover:text-white/[0.06] transition-colors duration-500">03</span>
              </div>
              <div className="relative">
                <div className="w-10 h-10 border border-brand-teal/30 flex items-center justify-center mb-6 group-hover:border-brand-teal/60 group-hover:bg-brand-teal/10 transition-all duration-500">
                  <Heart className="w-4.5 h-4.5 text-brand-teal" />
                </div>
                <h3 className="font-display uppercase text-xl sm:text-2xl font-bold text-white mb-3 tracking-wide">
                  Genuine Care
                </h3>
                <p className="text-white/40 text-[15px] leading-[1.8] max-w-sm group-hover:text-white/60 transition-colors duration-500">
                  Every customer is treated with respect and compassion. Your space matters to us because it matters to you and your family.
                </p>
              </div>
            </div>

            {/* Value 4 - Excellence */}
            <div className="group bg-navy-900 p-8 sm:p-10 lg:p-12 relative overflow-hidden hover:bg-[#132d44] transition-colors duration-500">
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
                <span className="font-display text-[64px] sm:text-[80px] font-bold text-white/[0.03] leading-none group-hover:text-white/[0.06] transition-colors duration-500">04</span>
              </div>
              <div className="relative">
                <div className="w-10 h-10 border border-brand-teal/30 flex items-center justify-center mb-6 group-hover:border-brand-teal/60 group-hover:bg-brand-teal/10 transition-all duration-500">
                  <Star className="w-4.5 h-4.5 text-brand-teal" />
                </div>
                <h3 className="font-display uppercase text-xl sm:text-2xl font-bold text-white mb-3 tracking-wide">
                  Excellence
                </h3>
                <p className="text-white/40 text-[15px] leading-[1.8] max-w-sm group-hover:text-white/60 transition-colors duration-500">
                  Premium materials and proven techniques that create beautiful, durable finishes designed to stand the test of time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EstimateForm />


      <Footer />
    </div>
  );
}
