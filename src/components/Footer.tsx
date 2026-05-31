import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import logo from '../assets/freshimpressionspainting-web-logo.png';
import { supabase } from '../lib/supabase';
import { useSocialLinks } from '../lib/useSocialLinks';

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

interface FooterContent {
  description: string;
  cta_headline: string;
  cta_subtitle: string;
  cta_button_text: string;
  copyright: string;
}

export default function Footer() {
  const social = useSocialLinks();
  const [footer, setFooter] = useState<FooterContent>({
    description: 'Expert residential and commercial painting across North Central Texas. Quality craftsmanship, lasting results.',
    cta_headline: "Let's start your project.",
    cta_subtitle: 'Get a free, no-obligation estimate for your next painting project.',
    cta_button_text: 'REQUEST ESTIMATE',
    copyright: 'Fresh Impressions Painting',
  });

  useEffect(() => {
    supabase.from('site_content').select('section, content').eq('page', 'global').then(({ data }) => {
      if (data) {
        for (const row of data) {
          if (row.section === 'footer') setFooter(row.content as FooterContent);
        }
      }
    });
  }, []);

  const socialIcons = [
    { key: 'facebook', url: social.facebook, label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
    { key: 'instagram', url: social.instagram, label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
    { key: 'nextdoor', url: social.nextdoor, label: 'Nextdoor', path: 'M12.012 2C6.506 2 2.04 6.506 2.04 12.012c0 5.506 4.466 9.988 9.972 9.988 5.506 0 9.988-4.482 9.988-9.988C22 6.506 17.518 2 12.012 2zm4.108 14.508h-2.556v-4.326c0-.924-.462-1.386-1.17-1.386-.792 0-1.386.594-1.386 1.518v4.194H8.452V9.384h2.424v1.062h.036c.396-.66 1.254-1.254 2.34-1.254 1.782 0 2.868 1.062 2.868 3.174v4.142z' },
    { key: 'google', url: social.google, label: 'Google', path: 'M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' },
    { key: 'yelp', url: social.yelp, label: 'Yelp', path: 'M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.905-4.308c.564-.83 1.956-.54 2.1.44l.436 2.932c.072.49-.036.956-.27 1.133zm-7.842 3.96l1.72 4.89c.336.96-.78 1.824-1.684 1.3l-2.712-1.57c-.452-.262-.692-.72-.642-1.21l.396-2.63c.108-.72 1.2-1.14 1.776-.78h.002zm-1.248-4.86l-4.332-2.1c-.84-.408-.636-1.8.312-2.1l2.844-.9c.474-.15.984-.024 1.344.33l2.148 2.1c.504.492.192 1.38-.504 1.38l-1.812-.71zm-3.204 3.216l-4.716 1.14c-.918.222-1.62-.876-1.056-1.656l1.692-2.34c.282-.39.744-.57 1.224-.474l2.856.57c.72.144 1.008 1.116.48 1.62l-.48.14v1zm3.18-9.528L10.39 1.05c-.36-.96.636-1.92 1.5-1.44l2.592 1.44c.432.24.66.708.612 1.2l-.288 2.94c-.072.732-1.08 1.056-1.56.48l-.702-.888v.04z' },
    { key: 'tiktok', url: social.tiktok, label: 'TikTok', path: 'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.88 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.82.11V9.4a6.37 6.37 0 00-.82-.05A6.34 6.34 0 003.15 15.7 6.34 6.34 0 009.49 22a6.34 6.34 0 006.34-6.34V9.01a8.2 8.2 0 004.76 1.52V7.09a4.85 4.85 0 01-1-.4z' },
  ].filter(icon => icon.url);

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
                {footer.cta_headline}
              </h3>
              <p className="text-white/40 text-base sm:text-lg max-w-md">
                {footer.cta_subtitle}
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-yellow text-navy-900 font-bold text-[13px] tracking-[0.12em] uppercase hover:bg-brand-gold transition-colors duration-300 self-start lg:self-center"
            >
              {footer.cta_button_text}
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
              <img src={logo} alt="Fresh Impressions Painting" className="h-12 w-auto" width={128} height={48} loading="lazy" />
            </a>
            <p className="text-white/50 text-sm leading-[1.8] max-w-xs mb-6">
              {footer.description}
            </p>
            <div className="flex items-center gap-3">
              {socialIcons.map((icon) => (
                <a
                  key={icon.key}
                  href={icon.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-navy-900 hover:bg-brand-yellow transition-colors duration-300"
                  aria-label={icon.label}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d={icon.path} />
                  </svg>
                </a>
              ))}
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
              &copy; {new Date().getFullYear()} {footer.copyright}. All rights reserved.
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
