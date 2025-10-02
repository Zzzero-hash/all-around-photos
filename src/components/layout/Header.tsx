'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-primary-900 hover:text-primary-700 transition-colors"
          >
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">AP</span>
            </div>
            <span className="font-bold text-lg hidden sm:block">
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/quote"
              className="text-primary-600 hover:text-primary-700 px-4 py-2 rounded-lg font-medium transition-colors border border-primary-600 hover:bg-primary-50"
            >
              Get Quote
            </Link>
            <Link
              href="/book"
              className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Book Session
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-neutral-700 hover:text-primary-600 hover:bg-neutral-100 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={cn(
                  'block w-5 h-0.5 bg-current transition-all duration-300',
                  isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                )}
              />
              <span
                className={cn(
                  'block w-5 h-0.5 bg-current transition-all duration-300',
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                )}
              />
              <span
                className={cn(
                  'block w-5 h-0.5 bg-current transition-all duration-300',
                  isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                )}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <nav className="py-4 space-y-2 border-t border-neutral-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 rounded-lg transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <div className="px-4 pt-4 border-t border-neutral-200 space-y-2">
              <Link
                href="/quote"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center border border-primary-600 text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Get Quote
              </Link>
              <Link
                href="/book"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Book Session
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}