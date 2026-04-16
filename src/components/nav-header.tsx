'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Moon, Sun, LogOut, User } from 'lucide-react';
import { useAuth } from '@/lib/supabase/auth-context';
import { useTheme } from '@/components/theme-provider';

const dashboardLinks = [
  { href: '/', label: 'Dashboard' },
  { href: '/tasks', label: 'Tasks' },
  { href: '/reports/b0000000-0000-0000-0000-000000000001', label: 'Reports' },
];

const marketingLinks = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/resources', label: 'Resources' },
];

export function NavHeader() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isMarketingPage = ['/welcome', '/features', '/pricing', '/about', '/contact', '/resources', '/terms', '/privacy'].some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  );

  const navLinks = isMarketingPage
    ? marketingLinks
    : user
      ? dashboardLinks
      : marketingLinks;

  return (
    <header
      className={`sticky top-0 z-50 text-white print:hidden transition-all duration-300 ${
        scrolled
          ? 'bg-emerald-900/95 backdrop-blur-xl shadow-lg'
          : 'bg-gradient-to-r from-emerald-800 to-green-600 shadow-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={user && !isMarketingPage ? '/' : '/welcome'} className="flex items-center gap-2">
            <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 8L16 24L28 8" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M26 7c-2 2-3 5-2 8" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M27 6c-4 1-6 4-6 7" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-tight leading-tight">VillaOS</h1>
              <span className="hidden lg:block text-[10px] font-semibold tracking-wider uppercase text-[#D4A843]">
                Your Villas. On Autopilot.
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((l) => {
              const isActive = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative py-1 transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full animate-fade-in" />
                  )}
                </Link>
              );
            })}

            <button onClick={toggleTheme} className="text-white/70 hover:text-white" title="Toggle theme">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                {isMarketingPage && (
                  <Link href="/" className="text-white/80 hover:text-white text-sm">Dashboard</Link>
                )}
                <span className="text-white/70 text-xs flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {user.email?.split('@')[0]}
                </span>
                <button onClick={signOut} className="text-white/70 hover:text-white" title="Sign out">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-white text-emerald-700 hover:bg-emerald-50 px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors"
              >
                Get Started
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 space-y-2 animate-slide-in-mobile">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block py-2 text-white/80 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            {user && isMarketingPage && (
              <Link href="/" className="block py-2 text-white/80 hover:text-white" onClick={() => setMobileOpen(false)}>
                Dashboard
              </Link>
            )}
            <div className="flex items-center gap-4 pt-2 border-t border-white/20">
              <button onClick={toggleTheme} className="text-white/70 hover:text-white">
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              {user ? (
                <button onClick={signOut} className="text-white/70 hover:text-white text-sm flex items-center gap-1">
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              ) : (
                <Link href="/login" className="text-white/70 hover:text-white text-sm" onClick={() => setMobileOpen(false)}>
                  Get Started
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
