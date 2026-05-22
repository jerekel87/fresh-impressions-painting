import { useEffect } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import EstimateForm from '../components/EstimateForm';
import Footer from '../components/Footer';

const hours = [
  { day: 'Monday', hours: '8:00 AM - 5:00 PM' },
  { day: 'Tuesday', hours: '8:00 AM - 5:00 PM' },
  { day: 'Wednesday', hours: '8:00 AM - 5:00 PM' },
  { day: 'Thursday', hours: '8:00 AM - 5:00 PM' },
  { day: 'Friday', hours: '8:00 AM - 5:00 PM' },
  { day: 'Saturday', hours: 'By Appointment' },
  { day: 'Sunday', hours: 'Closed' },
];

export default function ContactPage() {
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
                Contact Us
              </span>
              <h1
                className="font-display uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white"
                style={{ lineHeight: 1.05 }}
              >
                Let's talk about<br />
                your project.
              </h1>
            </div>
            <div className="lg:pb-2">
              <p className="text-white/50 text-base sm:text-lg leading-[1.85] max-w-md">
                Ready to transform your space? Reach out today for a free estimate. We typically respond within 24 hours and are happy to answer any questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Strip */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100">
            <a href="tel:8172439116" className="group bg-white py-8 sm:py-10 px-5 sm:px-8 hover:bg-[#f4f7fa] transition-colors duration-300">
              <Phone className="w-5 h-5 text-brand-teal mb-4" strokeWidth={1.5} />
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-1.5">Call or Text</span>
              <span className="text-navy-900 font-semibold text-[15px] group-hover:text-brand-teal transition-colors duration-300">(817) 243-9116</span>
            </a>
            <a href="mailto:info@freshimpressionspainting.com" className="group bg-white py-8 sm:py-10 px-5 sm:px-8 hover:bg-[#f4f7fa] transition-colors duration-300">
              <Mail className="w-5 h-5 text-brand-teal mb-4" strokeWidth={1.5} />
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-1.5">Email</span>
              <span className="text-navy-900 font-semibold text-[15px] group-hover:text-brand-teal transition-colors duration-300 break-all">info@freshimpressions<wbr />painting.com</span>
            </a>
            <div className="bg-white py-8 sm:py-10 px-5 sm:px-8">
              <MapPin className="w-5 h-5 text-brand-teal mb-4" strokeWidth={1.5} />
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-1.5">Headquarters</span>
              <span className="text-navy-900 font-semibold text-[15px]">Granbury, TX</span>
            </div>
            <div className="bg-white py-8 sm:py-10 px-5 sm:px-8">
              <Clock className="w-5 h-5 text-brand-teal mb-4" strokeWidth={1.5} />
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-1.5">Response</span>
              <span className="text-navy-900 font-semibold text-[15px]">Within 24 hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* Estimate Form - same as home page */}
      <EstimateForm />

      {/* Business Hours + Location */}
      <section className="py-20 sm:py-28 md:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left - Hours */}
            <div className="lg:col-span-5">
              <span className="inline-block text-brand-teal font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                Availability
              </span>
              <h2
                className="font-display uppercase text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6"
                style={{ lineHeight: 1.05 }}
              >
                Business hours.
              </h2>
              <p className="text-gray-500 text-[15px] leading-[1.85] mb-10 max-w-md">
                We are available for estimates and consultations during regular business hours. Flexible scheduling available upon request.
              </p>

              {/* Call/Text CTA */}
              <a
                href="tel:8172439116"
                className="group flex items-center gap-4 p-6 bg-[#f4f7fa] border border-gray-100 hover:border-brand-teal/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-brand-teal/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-brand-teal" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="block text-navy-900 font-semibold text-[15px] group-hover:text-brand-teal transition-colors duration-300">
                    (817) 243-9116
                  </span>
                  <span className="block text-gray-400 text-sm mt-0.5">
                    Call or text for the fastest response
                  </span>
                </div>
              </a>
            </div>

            {/* Right - Schedule */}
            <div className="lg:col-span-7">
              <div className="border-t border-gray-200">
                {hours.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-center justify-between py-5 sm:py-6 border-b border-gray-100 group"
                  >
                    <span className="text-navy-900 font-medium text-base sm:text-lg">{item.day}</span>
                    <span className={`text-sm sm:text-base font-medium ${
                      item.hours === 'Closed'
                        ? 'text-gray-300'
                        : item.hours === 'By Appointment'
                        ? 'text-brand-teal'
                        : 'text-gray-600'
                    }`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>

              {/* Service area note */}
              <div className="mt-10 flex items-start gap-4 p-6 bg-[#f4f7fa]">
                <MapPin className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <span className="block text-navy-900 font-semibold text-[15px] mb-1">Service Area</span>
                  <p className="text-gray-500 text-sm leading-[1.7]">
                    Fresh Impressions Painting proudly serves Granbury, TX and the greater Hood County area, including Weatherford, Stephenville, Glen Rose, Cleburne, and the surrounding communities across five North Central Texas counties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
