import { useState } from 'react';
import { CheckCircle, Phone, Mail, MapPin, Clock, User, MessageSquare, ArrowRight } from 'lucide-react';
import textureBg from '../assets/DSC_TEXTURE_S_3.jpg';
import { supabase } from '../lib/supabase';

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

export default function EstimateForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    serviceType: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await supabase.from('leads').insert({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      service_type: formData.serviceType,
      description: formData.description,
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <CheckCircle className="w-16 h-16 text-brand-teal mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-navy-900 mb-3">We've got your request.</h3>
          <p className="text-gray-500 text-base">
            Expect a call or email within 24 hours to discuss your project in detail.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${textureBg})` }} />
      <div className="absolute inset-0 bg-white/30" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left side - Form */}
          <div className="bg-white/90 backdrop-blur-sm border border-[#e8e0d8] p-6 sm:p-8 lg:p-10">
            <h3 className="font-display uppercase text-3xl sm:text-4xl font-bold text-navy-900 leading-tight mb-2">
              Request a <span className="text-brand-teal">free quote.</span>
            </h3>
            <p className="text-gray-500 text-[15px] mb-8">
              Fill out the form below and we'll be in touch shortly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 text-navy-900 text-[15px] placeholder:text-gray-400 focus:border-brand-teal/50 focus:ring-0 outline-none transition-all"
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
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 text-navy-900 text-[15px] placeholder:text-gray-400 focus:border-brand-teal/50 focus:ring-0 outline-none transition-all"
                    placeholder="Last name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 text-navy-900 text-[15px] placeholder:text-gray-400 focus:border-brand-teal/50 focus:ring-0 outline-none transition-all"
                  placeholder="Email address"
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 text-navy-900 text-[15px] placeholder:text-gray-400 focus:border-brand-teal/50 focus:ring-0 outline-none transition-all"
                  placeholder="Phone number"
                />
              </div>

              {/* Service select */}
              <div className="relative">
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 text-navy-900 text-[15px] focus:border-brand-teal/50 focus:ring-0 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-gray-400">Select services</option>
                  {serviceOptions.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Description */}
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-400" strokeWidth={1.5} />
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 text-navy-900 text-[15px] placeholder:text-gray-400 focus:border-brand-teal/50 focus:ring-0 outline-none transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="group w-full inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-brand-yellow hover:bg-[#e6b930] text-navy-900 font-bold text-[13px] tracking-[0.12em] uppercase transition-all duration-300 disabled:opacity-60"
              >
                {submitting ? 'SUBMITTING...' : 'GET ESTIMATE'}
                {!submitting && <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />}
              </button>

              <p className="text-gray-400 text-xs text-center pt-1">
                No contracts, no obligation. We respond within 24 hours.
              </p>
            </form>
          </div>

          {/* Right side - Info */}
          <div className="flex flex-col justify-center lg:pt-8">
            {/* Headline */}
            <h2 className="font-display uppercase text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 text-navy-900" style={{ lineHeight: 1.05 }}>
              Ready to transform<br />
              your space?
            </h2>

            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-12">
              Whether it's a single room or an entire property, we'd love to hear about your vision. Reach out and we'll provide a detailed, no-obligation quote.
            </p>

            {/* Contact details - Grid layout */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <a href="tel:+18172439116" className="group bg-white/80 backdrop-blur-sm border border-[#e8e0d8] p-4 sm:p-5 hover:bg-white transition-colors">
                <Phone className="w-5 h-5 text-brand-teal mb-3" strokeWidth={1.5} />
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-1">Call or Text</span>
                <span className="text-navy-900 font-medium text-[14px] group-hover:text-brand-teal transition-colors">(817) 243-9116</span>
              </a>

              <a href="mailto:info@freshimpressionspainting.com" className="group bg-white/80 backdrop-blur-sm border border-[#e8e0d8] p-4 sm:p-5 hover:bg-white transition-colors overflow-hidden">
                <Mail className="w-5 h-5 text-brand-teal mb-3" strokeWidth={1.5} />
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-1">Email</span>
                <span className="text-navy-900 font-medium text-[13px] sm:text-[14px] group-hover:text-brand-teal transition-colors break-all leading-tight">info@freshimpressions&#8203;painting.com</span>
              </a>

              <div className="bg-white/80 backdrop-blur-sm border border-[#e8e0d8] p-4 sm:p-5">
                <MapPin className="w-5 h-5 text-brand-teal mb-3" strokeWidth={1.5} />
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-1">Service Area</span>
                <span className="text-navy-900 font-medium text-[14px]">North Central Texas</span>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-[#e8e0d8] p-4 sm:p-5">
                <Clock className="w-5 h-5 text-brand-teal mb-3" strokeWidth={1.5} />
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-1">Response Time</span>
                <span className="text-navy-900 font-medium text-[14px]">Within one business day</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
