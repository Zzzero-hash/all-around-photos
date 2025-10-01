import Link from 'next/link';
import { SITE_CONFIG, CONTACT_INFO } from '@/lib/constants';

const footerNavigation = {
  services: [
    { name: 'Commercial Inspections', href: '/services/commercial' },
    { name: 'Residential Inspections', href: '/services/residential' },
    { name: 'Real Estate Photography', href: '/services/real-estate' },
    { name: 'Event Photography', href: '/services/events' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
    { name: 'Client Login', href: '/client-gallery' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

const certifications = [
  'FAA Part 107 Certified',
  'Fully Insured',
  'Professional Drone Pilot',
];

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">AP</span>
              </div>
              <span className="font-bold text-lg text-white">
                {SITE_CONFIG.name}
              </span>
            </div>
            <p className="text-sm mb-4 leading-relaxed">
              Professional drone photography and inspection services for commercial and residential properties.
            </p>
            
            {/* Certifications */}
            <div className="space-y-2">
              <h4 className="font-semibold text-white text-sm">Certifications</h4>
              {certifications.map((cert) => (
                <div key={cert} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent-500 rounded-full" />
                  <span className="text-sm">{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {footerNavigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-white">Phone</p>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-sm hover:text-white transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Email</p>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-sm hover:text-white transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Address</p>
                <p className="text-sm">{CONTACT_INFO.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm">
                © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
              </p>
              <div className="flex space-x-4">
                {footerNavigation.legal.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Social Links Placeholder */}
            <div className="flex space-x-4">
              <span className="text-sm">Follow us:</span>
              {/* Social media icons would go here */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}