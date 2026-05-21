import { Facebook, Instagram, ArrowUpRight } from 'lucide-react';
import logo from '../assets/freshimpressionspainting-web-logo.png';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Service Areas', href: '#service-areas' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  'Interior Painting',
  'Exterior Painting',
  'Cabinet Refinishing',
  'Drywall Repair',
  'Staining',
  'Commercial',
];

export default function Footer() {
  return (
    <footer className="bg-[#0b1e2f]">
      {/* Top CTA band */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h3
                className="font-display uppercase text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3"
                style={{ lineHeight: 1.1 }}
              >
                Let's start your project.
              </h3>
              <p className="text-white/40 text-base sm:text-lg max-w-md">
                Get a free, no-obligation estimate for your next painting project.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-yellow text-navy-900 font-bold text-[13px] tracking-[0.12em] uppercase hover:bg-brand-gold transition-colors duration-300 self-start lg:self-center"
            >
              REQUEST ESTIMATE
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6">

          {/* Brand column */}
          <div className="lg:col-span-4">
            <a href="#home" className="inline-block mb-5">
              <img src={logo} alt="Fresh Impressions Painting" className="h-12 w-auto" />
            </a>
            <p className="text-white/50 text-sm leading-[1.8] max-w-xs mb-6">
              Expert residential and commercial painting across North Central Texas. Quality craftsmanship, lasting results.
            </p>
            <div className="flex items-center gap-2.5">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/[0.05] border border-white/[0.08] hover:bg-brand-yellow hover:border-brand-yellow flex items-center justify-center text-white/60 hover:text-navy-900 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/[0.05] border border-white/[0.08] hover:bg-brand-yellow hover:border-brand-yellow flex items-center justify-center text-white/60 hover:text-navy-900 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-5">
              Get In Touch
            </h4>
            <ul className="space-y-5">
              <li>
                <a
                  href="tel:+18172439116"
                  className="group flex items-center gap-3.5 text-white/60 hover:text-white text-sm transition-colors duration-200"
                >
                  <svg className="w-5 h-5 flex-shrink-0 text-brand-teal" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.01-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.01l-2.2 2.21z"/>
                  </svg>
                  (817) 243-9116
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@freshimpressionspainting.com"
                  className="group flex items-center gap-3.5 text-white/60 hover:text-white text-sm transition-colors duration-200"
                >
                  <svg className="w-5 h-5 flex-shrink-0 text-brand-teal" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span className="break-all">info@freshimpressions&#8203;painting.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3.5 text-white/60 text-sm">
                  <svg className="w-5 h-5 flex-shrink-0 text-brand-teal" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                  </svg>
                  Granbury, TX & Surrounding Counties
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/30 text-xs">
              &copy; {new Date().getFullYear()} Fresh Impressions Painting. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
