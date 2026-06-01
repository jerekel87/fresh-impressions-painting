import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { X, Phone, ArrowRight, ChevronDown } from 'lucide-react';
import logo from '../assets/freshimpressionspainting-web-logo.png';

const services = [
  { title: 'Interior Painting', slug: 'interior-painting' },
  { title: 'Exterior Painting', slug: 'exterior-painting' },
  { title: 'Brick And Stone Lime Wash', slug: 'brick-and-stone-lime-wash' },
  { title: 'Cabinet Finishing And Refinishing', slug: 'cabinet-finishing-and-refinishing' },
  { title: 'Commercial Painting', slug: 'commercial-painting' },
  { title: 'Drywall Repair And Finishing', slug: 'drywall-repair-and-finishing' },
  { title: 'Metal Finishing And Refinishing', slug: 'metal-finishing-and-refinishing' },
  { title: 'New Construction Painting', slug: 'new-construction-painting' },
  { title: 'Staining', slug: 'staining' },
];

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'SERVICES', href: '/#services', hasDropdown: true },
  { label: 'AREAS', href: '/areas' },
  { label: 'REVIEWS', href: '/#reviews' },
  { label: 'CONTACT', href: '/contact' },
];

function NavAnchor({ href, className, onClick, children }: { href: string; className?: string; onClick?: () => void; children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();

    if (href === '/') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
      }
      return;
    }

    if (href.includes('#')) {
      const hash = href.split('#')[1];
      if (location.pathname === '/') {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/', { state: { scrollTo: hash } });
      }
      return;
    }

    navigate(href);
  };

  return <a href={href} className={className} onClick={handleClick}>{children}</a>;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const servicesBtnRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [dropdownLeft, setDropdownLeft] = useState<number | null>(null);
  const location = useLocation();
  const getActiveFromPath = (pathname: string) => {
    if (pathname === '/about') return '/about';
    if (pathname === '/contact') return '/contact';
    if (pathname === '/areas') return '/areas';
    if (pathname.startsWith('/services/')) return '/#services';
    return '/';
  };
  const [activeLink, setActiveLink] = useState(getActiveFromPath(location.pathname));

  useEffect(() => {
    setActiveLink(getActiveFromPath(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const update = () => {
      if (servicesBtnRef.current && navRef.current) {
        const btnRect = servicesBtnRef.current.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();
        setDropdownLeft(btnRect.left - navRect.left);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => setServicesOpen(false), 150);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-0">
      {/* Accent stripe */}
      <div className="h-[3px] bg-brand-yellow" />

      {/* Slim top bar - hides on scroll, hidden on mobile */}
      <div
        className={`hidden sm:block bg-navy-900 overflow-hidden transition-[max-height,opacity] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          scrolled ? 'max-h-0 opacity-0 duration-500' : 'max-h-11 opacity-100 duration-700'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-11">
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="#2b98be" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
            </svg>
            <div className="flex items-center gap-1 text-white/40 text-[13px] tracking-[0.06em] uppercase font-medium">
              <a href="#service-areas" className="hover:text-white/70 transition-colors duration-200">Hood</a>
              <span>,</span>
              <a href="#service-areas" className="hover:text-white/70 transition-colors duration-200">Johnson</a>
              <span>,</span>
              <a href="#service-areas" className="hover:text-white/70 transition-colors duration-200">Parker</a>
              <span>,</span>
              <a href="#service-areas" className="hover:text-white/70 transition-colors duration-200">Erath</a>
              <span>and</span>
              <a href="#service-areas" className="hover:text-white/70 transition-colors duration-200">Somervell</a>
            </div>
          </div>
          <a
            href="tel:+18172439116"
            className="flex items-center gap-2 text-white/60 hover:text-brand-yellow transition-colors duration-300"
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="#2b98be" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1.003 1.003 0 0 1 1.01-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <span className="text-[13px] font-semibold tracking-[0.08em]">(817) 243-9116</span>
          </a>
        </div>
      </div>

      {/* Main navigation bar */}
      <nav
        ref={navRef}
        className={`relative transition-all duration-700 ease-in-out ${
          scrolled
            ? 'bg-[#0c2236] shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
            : 'bg-[#0c2236]'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div
            className={`flex items-center justify-between transition-all duration-700 ${
              scrolled ? 'h-[60px] sm:h-[72px]' : 'h-[72px] sm:h-[88px]'
            }`}
          >
            {/* Logo */}
            <NavAnchor href="/" className="flex-shrink-0 relative">
              <img
                src={logo}
                alt="Fresh Impressions Painting"
                className={`w-auto max-w-[160px] sm:max-w-none transition-all duration-700 ${
                  scrolled ? 'h-8 sm:h-11 lg:h-12' : 'h-10 sm:h-13 lg:h-[60px]'
                }`}
                width={160}
                height={60}
                decoding="async"
              />
            </NavAnchor>

            {/* Center nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                link.hasDropdown ? (
                  <div
                    key={link.label}
                    ref={dropdownRef}
                    onMouseEnter={handleServicesEnter}
                    onMouseLeave={handleServicesLeave}
                  >
                    <button
                      ref={servicesBtnRef}
                      className={`relative px-5 py-2.5 text-[14px] font-semibold transition-all duration-300 group flex items-center gap-1 ${
                        activeLink === link.href
                          ? 'text-brand-yellow'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                      <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-brand-yellow transition-all duration-300 ${
                          activeLink === link.href
                            ? 'w-5'
                            : 'w-0 group-hover:w-5'
                        }`}
                      />
                    </button>
                  </div>
                ) : (
                  <NavAnchor
                    key={link.label}
                    href={link.href}
                    onClick={() => setActiveLink(link.href)}
                    className={`relative px-5 py-2.5 text-[14px] font-semibold transition-all duration-300 group ${
                      activeLink === link.href
                        ? 'text-brand-yellow'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-brand-yellow transition-all duration-300 ${
                        activeLink === link.href
                          ? 'w-5'
                          : 'w-0 group-hover:w-5'
                      }`}
                    />
                  </NavAnchor>
                )
              ))}
            </div>

            {/* Right side CTA */}
            <div className="hidden lg:flex items-center gap-5">
              <a
                href="tel:+18172439116"
                className={`flex items-center gap-2 text-white/70 hover:text-brand-yellow transition-all duration-500 ${
                  scrolled ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
                }`}
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#2b98be" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1.003 1.003 0 0 1 1.01-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span className="text-[12px] font-semibold tracking-[0.06em]">(817) 243-9116</span>
              </a>
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2.5 px-7 py-3 bg-brand-yellow text-navy-900 font-bold text-[13px] tracking-[0.12em] uppercase"
              >
                GET ESTIMATE
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 text-white"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-[2px] bg-current transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-[4px]' : ''
                }`}
              />
              <span
                className={`block w-6 h-[2px] bg-current transition-all duration-300 ${
                  isOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block w-6 h-[2px] bg-current transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-[4px]' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Dropdown — anchored to nav bottom, aligned to Services button */}
        <div
          className={`absolute top-full transition-all duration-300 hidden lg:block ${
            servicesOpen
              ? 'opacity-100 visible translate-y-0 pointer-events-auto'
              : 'opacity-0 invisible -translate-y-2 pointer-events-none'
          }`}
          style={{ left: dropdownLeft !== null ? dropdownLeft : undefined }}
          onMouseEnter={handleServicesEnter}
          onMouseLeave={handleServicesLeave}
        >
          <div className="bg-[#0a1e30] border border-white/10 border-t-0 shadow-[0_25px_80px_rgba(0,0,0,0.6)] w-[280px] overflow-hidden">
            {services.map((service, idx) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                onClick={() => { setServicesOpen(false); }}
                className={`group/item flex items-center px-5 py-[18px] text-white/75 hover:text-white hover:bg-white/[0.06] transition-all duration-200 ${
                  idx !== services.length - 1 ? 'border-b border-white/[0.06]' : ''
                }`}
              >
                <span className="text-[14px] font-medium tracking-[-0.01em]">{service.title}</span>
                <svg className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover/item:opacity-70 group-hover/item:translate-x-0 transition-all duration-200 text-brand-yellow flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

      </nav>

      {/* Mobile fullscreen menu */}
      <div
        className={`lg:hidden fixed inset-0 top-0 bg-navy-900 transition-all duration-500 flex flex-col ${
          isOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ zIndex: 100 }}
      >
        {/* Yellow accent stripe */}
        <div className="h-[3px] bg-brand-yellow flex-shrink-0" />

        {/* Mobile menu header */}
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-white/[0.06]">
          <img src={logo} alt="Fresh Impressions Painting" className="h-10 w-auto" width={107} height={40} loading="lazy" decoding="async" />
          <button
            onClick={() => setIsOpen(false)}
            className="w-11 h-11 flex items-center justify-center text-white"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile links */}
        <div className="flex-1 flex flex-col justify-center px-10 overflow-y-auto">
          {navLinks.map((link, idx) => (
            link.hasDropdown ? (
              <div key={link.label} className="border-b border-white/[0.04]">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="group flex items-center justify-between w-full py-5"
                >
                  <span
                    style={{
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                      transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 80}ms`,
                    }}
                  >
                    <span className="text-white font-bold text-2xl group-hover:text-brand-yellow transition-colors duration-300">
                      {link.label}
                    </span>
                  </span>
                  <ChevronDown className={`w-5 h-5 text-white/40 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    mobileServicesOpen ? 'max-h-[500px] opacity-100 pb-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pl-4 space-y-1">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="block py-2.5 text-white/50 text-[15px] font-medium hover:text-brand-yellow transition-colors duration-200"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavAnchor
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center py-5 border-b border-white/[0.04]"
              >
                <span
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 80}ms`,
                  }}
                >
                  <span className="text-white font-bold text-2xl group-hover:text-brand-yellow transition-colors duration-300">
                    {link.label}
                  </span>
                </span>
              </NavAnchor>
            )
          ))}
        </div>

        {/* Mobile footer */}
        <div className="px-10 pb-10 space-y-5">
          <a
            href="tel:+18172439116"
            className="flex items-center gap-3 text-white/60"
          >
            <Phone className="w-4 h-4 text-brand-yellow" />
            <span className="font-semibold tracking-wide">(817) 243-9116</span>
          </a>
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-3 w-full py-4 bg-brand-yellow text-navy-900 font-bold text-[13px] tracking-[0.12em] uppercase"
          >
            GET ESTIMATE
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
