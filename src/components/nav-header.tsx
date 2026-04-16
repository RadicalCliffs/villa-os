'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Menu, X, Moon, Sun, LogOut, User } from 'lucide-react';
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

  const isMarketingPage = ['/welcome', '/features', '/pricing', '/about', '/contact', '/resources', '/terms', '/privacy'].some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  );

  const navLinks = isMarketingPage
    ? marketingLinks
    : user
      ? dashboardLinks
      : marketingLinks;

  return (
    <header className="bg-gradient-to-r from-emerald-800 to-green-600 text-white shadow-lg print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={user && !isMarketingPage ? '/' : '/welcome'} className="flex items-center gap-3">
            <Home className="h-8 w-8" />
            <h1 className="text-xl font-bold tracking-tight">VillaOS</h1>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`transition-colors ${
                  pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href))
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}

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
          <nav className="md:hidden pb-4 space-y-2">
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
