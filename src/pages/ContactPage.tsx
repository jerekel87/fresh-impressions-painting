import { useEffect, useState } from 'react';
import { CheckCircle, Phone, Mail, MapPin, Clock, User, MessageSquare, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import textureBg from '../assets/DSC_TEXTURE_S_3.jpg';

const serviceOptions = [
  'Interior Painting',
  'Exterior Painting',
  'Cabinet Refinishing',
  'Drywall Repair',
  'Staining',
  'Lime Wash',
  'Commercial',
  'Other',
];

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

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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

      {/* Form Section */}
      <section className="py-20 sm:py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${textureBg})` }} />
        <div className="absolute inset-0 bg-white/40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left - Text content */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="inline-block text-brand-teal font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                Get Started
              </span>
              <h2
                className="font-display uppercase text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6"
                style={{ lineHeight: 1.05 }}
              >
                Request a free estimate.
              </h2>
              <p className="text-gray-500 text-[15px] sm:text-base leading-[1.85] mb-10 max-w-md">
                Tell us about your project and we will provide a detailed, no-obligation quote. Most estimates are delivered within one business day.
              </p>

              {/* Trust signals */}
              <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200">
                <div className="bg-white p-5">
                  <span className="block font-display text-3xl sm:text-4xl font-bold text-navy-900">24h</span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mt-1">Response Time</span>
                </div>
                <div className="bg-white p-5">
                  <span className="block font-display text-3xl sm:text-4xl font-bold text-navy-900">$0</span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mt-1">Estimate Cost</span>
                </div>
                <div className="bg-white p-5">
                  <span className="block font-display text-3xl sm:text-4xl font-bold text-navy-900">5.0</span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mt-1">Google Rating</span>
                </div>
                <div className="bg-white p-5">
                  <span className="block font-display text-3xl sm:text-4xl font-bold text-navy-900">0</span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mt-1">Obligations</span>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-8 sm:p-10 lg:p-12">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-4 bg-[#f4f7fa] border border-gray-200 text-navy-900 text-[15px] placeholder:text-gray-400 focus:border-brand-teal/50 focus:ring-0 outline-none transition-all"
                          placeholder="First name"
                        />
                      </div>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-4 bg-[#f4f7fa] border border-gray-200 text-navy-900 text-[15px] placeholder:text-gray-400 focus:border-brand-teal/50 focus:ring-0 outline-none transition-all"
                          placeholder="Last name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-4 bg-[#f4f7fa] border border-gray-200 text-navy-900 text-[15px] placeholder:text-gray-400 focus:border-brand-teal/50 focus:ring-0 outline-none transition-all"
                          placeholder="Email address"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-4 bg-[#f4f7fa] border border-gray-200 text-navy-900 text-[15px] placeholder:text-gray-400 focus:border-brand-teal/50 focus:ring-0 outline-none transition-all"
                          placeholder="Phone number"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-4 bg-[#f4f7fa] border border-gray-200 text-navy-900 text-[15px] focus:border-brand-teal/50 focus:ring-0 outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select a service...</option>
                        {serviceOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-400" strokeWidth={1.5} />
                      <textarea
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-4 bg-[#f4f7fa] border border-gray-200 text-navy-900 text-[15px] placeholder:text-gray-400 focus:border-brand-teal/50 focus:ring-0 outline-none transition-all resize-none"
                        placeholder="Tell us about your project — scope, timeline, and any specific details..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="group w-full inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-brand-yellow hover:bg-[#e6b930] text-navy-900 font-bold text-[13px] tracking-[0.12em] uppercase transition-all duration-300"
                    >
                      SEND MESSAGE
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>

                    <p className="text-gray-400 text-xs text-center pt-1">
                      No contracts, no obligation. We respond within 24 hours.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-16">
                    <CheckCircle className="w-14 h-14 text-brand-teal mx-auto mb-6" />
                    <h3
                      className="font-display uppercase text-2xl sm:text-3xl font-bold text-navy-900 mb-4"
                      style={{ lineHeight: 1.05 }}
                    >
                      Message sent.
                    </h3>
                    <p className="text-gray-500 text-base leading-[1.85] max-w-sm mx-auto">
                      Thank you for reaching out. We will review your project details and get back to you within 24 hours.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

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

              {/* Quick CTA */}
              <div className="bg-navy-900 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="w-5 h-5 text-brand-yellow" />
                  <span className="text-white font-display uppercase text-sm font-bold tracking-wide">
                    Need a quick response?
                  </span>
                </div>
                <p className="text-white/50 text-sm leading-[1.7] mb-4">
                  Call or text us directly for the fastest response on your project inquiry.
                </p>
                <a
                  href="tel:8172439116"
                  className="inline-flex items-center gap-2 text-brand-yellow font-semibold text-sm hover:text-yellow-300 transition-colors duration-300"
                >
                  <Phone className="w-4 h-4" />
                  (817) 243-9116
                </a>
              </div>
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
