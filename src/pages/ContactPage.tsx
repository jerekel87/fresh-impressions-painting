import { useEffect, useState } from 'react';
import { CheckCircle, Phone, Mail, MapPin, Clock, User, MessageSquare, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import textureBg from '../assets/DSC_TEXTURE_S_3.jpg';

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

      {/* Contact Form and Info Section */}
      <section className="py-16 sm:py-24 md:py-32 bg-[#f4f7fa] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden bg-white shadow-xl">
                {/* Texture Background */}
                <div className="absolute inset-0 opacity-[0.03]">
                  <img src={textureBg} alt="" className="w-full h-full object-cover" />
                </div>

                <div className="relative p-8 sm:p-10 lg:p-12">
                  {!submitted ? (
                    <>
                      <span className="inline-block text-brand-teal font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                        Get a Free Estimate
                      </span>
                      <h2
                        className="font-display uppercase text-3xl sm:text-4xl font-bold text-navy-900 mb-8"
                        style={{ lineHeight: 1.05 }}
                      >
                        Send us a message
                      </h2>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                              First Name
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-200 bg-[#f4f7fa] text-navy-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal transition-all duration-300"
                              placeholder="John"
                            />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                              Last Name
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-200 bg-[#f4f7fa] text-navy-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal transition-all duration-300"
                              placeholder="Smith"
                            />
                          </div>
                        </div>

                        {/* Email and Phone Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-200 bg-[#f4f7fa] text-navy-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal transition-all duration-300"
                              placeholder="john@example.com"
                            />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-200 bg-[#f4f7fa] text-navy-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal transition-all duration-300"
                              placeholder="(817) 555-0123"
                            />
                          </div>
                        </div>

                        {/* Service Dropdown */}
                        <div>
                          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                            Service Needed
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 bg-[#f4f7fa] text-navy-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal transition-all duration-300 appearance-none"
                          >
                            <option value="">Select a service...</option>
                            {serviceOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Message */}
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                            Tell Us About Your Project
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            className="w-full px-4 py-3 border border-gray-200 bg-[#f4f7fa] text-navy-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal transition-all duration-300 resize-none"
                            placeholder="Describe your project, timeline, and any specific details..."
                          />
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="group inline-flex items-center gap-3 bg-brand-yellow text-navy-900 font-display uppercase font-bold text-sm tracking-wide px-8 py-4 hover:bg-yellow-400 transition-all duration-300 hover:shadow-lg"
                        >
                          Send Message
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3
                        className="font-display uppercase text-2xl sm:text-3xl font-bold text-navy-900 mb-4"
                        style={{ lineHeight: 1.05 }}
                      >
                        Message Sent
                      </h3>
                      <p className="text-gray-600 text-base leading-[1.85] max-w-sm mx-auto">
                        Thank you for reaching out. We will review your project details and get back to you within 24 hours.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* Phone Card */}
              <div className="group bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-brand-teal/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-teal/20 transition-colors duration-300">
                    <Phone className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div>
                    <h3 className="font-display uppercase text-lg font-bold text-navy-900 mb-1 tracking-wide">
                      Phone
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">Call or text anytime</p>
                    <a
                      href="tel:8172439116"
                      className="text-brand-teal font-semibold text-base hover:text-brand-teal/80 transition-colors duration-300"
                    >
                      (817) 243-9116
                    </a>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="group bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-brand-teal/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-teal/20 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div>
                    <h3 className="font-display uppercase text-lg font-bold text-navy-900 mb-1 tracking-wide">
                      Email
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">We reply within 24 hours</p>
                    <a
                      href="mailto:info@freshimpressionspainting.com"
                      className="text-brand-teal font-semibold text-base hover:text-brand-teal/80 transition-colors duration-300 break-all"
                    >
                      info@freshimpressionspainting.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Service Area Card */}
              <div className="group bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-brand-teal/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-teal/20 transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div>
                    <h3 className="font-display uppercase text-lg font-bold text-navy-900 mb-1 tracking-wide">
                      Service Area
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">Based in Granbury, TX</p>
                    <p className="text-navy-900 font-medium text-base">
                      Hood County and surrounding areas
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time Card */}
              <div className="group bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-brand-teal/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-teal/20 transition-colors duration-300">
                    <Clock className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div>
                    <h3 className="font-display uppercase text-lg font-bold text-navy-900 mb-1 tracking-wide">
                      Response Time
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">Fast and reliable</p>
                    <p className="text-navy-900 font-medium text-base">
                      Within 24 hours, guaranteed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map and Business Hours Section */}
      <section className="py-16 sm:py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Map Area */}
            <div>
              <span className="inline-block text-brand-teal font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                Our Location
              </span>
              <h2
                className="font-display uppercase text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 mb-8"
                style={{ lineHeight: 1.05 }}
              >
                Serving Granbury<br />
                and beyond
              </h2>
              <p className="text-gray-600 text-base leading-[1.85] mb-8 max-w-lg">
                Fresh Impressions Painting proudly serves Granbury, TX and the greater Hood County area. We also serve surrounding communities including Weatherford, Stephenville, Glen Rose, and the greater DFW metroplex.
              </p>

              {/* Map Placeholder */}
              <div className="relative w-full h-[320px] sm:h-[380px] bg-[#f4f7fa] border border-gray-200 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-10 h-10 text-brand-teal mx-auto mb-3" />
                    <p className="font-display uppercase text-lg font-bold text-navy-900 tracking-wide">
                      Granbury, TX
                    </p>
                    <p className="text-gray-500 text-sm mt-1">Hood County</p>
                  </div>
                </div>
                {/* Decorative map grid lines */}
                <div className="absolute inset-0 opacity-[0.08]">
                  <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                    {[...Array(48)].map((_, i) => (
                      <div key={i} className="border border-gray-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="lg:pt-12">
              <span className="inline-block text-brand-yellow font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                Business Hours
              </span>
              <h2
                className="font-display uppercase text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 mb-8"
                style={{ lineHeight: 1.05 }}
              >
                When we are<br />
                available
              </h2>
              <p className="text-gray-600 text-base leading-[1.85] mb-10 max-w-lg">
                We are available for estimates and consultations during regular business hours. Emergency and flexible scheduling available upon request.
              </p>

              {/* Hours List */}
              <div className="space-y-0 border-t border-gray-200">
                {[
                  { day: 'Monday', hours: '8:00 AM - 5:00 PM' },
                  { day: 'Tuesday', hours: '8:00 AM - 5:00 PM' },
                  { day: 'Wednesday', hours: '8:00 AM - 5:00 PM' },
                  { day: 'Thursday', hours: '8:00 AM - 5:00 PM' },
                  { day: 'Friday', hours: '8:00 AM - 5:00 PM' },
                  { day: 'Saturday', hours: 'By Appointment' },
                  { day: 'Sunday', hours: 'Closed' },
                ].map((item) => (
                  <div
                    key={item.day}
                    className="flex items-center justify-between py-4 border-b border-gray-200"
                  >
                    <span className="text-navy-900 font-medium text-base">{item.day}</span>
                    <span className={`text-sm font-medium ${item.hours === 'Closed' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quick Contact CTA */}
              <div className="mt-10 p-6 bg-navy-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/10 rounded-full blur-[60px] translate-x-1/3 -translate-y-1/3" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <MessageSquare className="w-5 h-5 text-brand-yellow" />
                    <span className="text-white font-display uppercase text-sm font-bold tracking-wide">
                      Need a Quick Response?
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
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
