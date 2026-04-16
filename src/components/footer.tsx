'use client';

import Link from 'next/link';
// Brand mark used inline

const productLinks = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/welcome#integrations', label: 'Integrations' },
];

const companyLinks = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const resourceLinks = [
  { href: '/resources', label: 'Blog' },
  { href: '/resources', label: 'Guides' },
  { href: '/contact', label: 'Support' },
];

const legalLinks = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
];

export function Footer() {
  return (
    <footer className="bg-emerald-950 text-white print:hidden">
      {/* Gradient separator line */}
      <div className="h-1 bg-gradient-to-r from-[#0D2818] via-[#059669] via-[#10B981] to-[#D4A843]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/welcome" className="flex items-center gap-2 mb-4">
              <svg className="h-7 w-7" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 8L16 24L28 8" stroke="#10B981" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M26 7c-2 2-3 5-2 8" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                <path d="M27 6c-4 1-6 4-6 7" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
              </svg>
              <span className="text-xl font-bold">VillaOS</span>
            </Link>
            <p className="text-emerald-300/70 text-sm leading-relaxed">
              The operating system for Phuket villa managers. Manage properties, tasks, and owners from one dashboard.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-emerald-300 uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-emerald-100/60 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-emerald-300 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-emerald-100/60 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-emerald-300 uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-emerald-100/60 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-emerald-300 uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-emerald-100/60 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-emerald-800/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-1">Stay up to date</h3>
              <p className="text-emerald-100/50 text-sm">Get villa management tips and product updates.</p>
            </div>
            <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@example.com"
                className="bg-emerald-900/50 border border-emerald-700/50 rounded-lg px-4 py-2 text-sm text-white placeholder-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-64"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-emerald-800/50 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-emerald-100/40 text-sm">
            &copy; {new Date().getFullYear()} VillaOS. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {/* Social links */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-emerald-100/40 hover:text-white transition-colors" aria-label="Facebook">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-emerald-100/40 hover:text-white transition-colors" aria-label="Instagram">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C8.808 0 8.408.015 7.122.072 5.838.129 4.942.333 4.162.63c-.805.31-1.488.726-2.168 1.406C1.314 2.716.898 3.399.588 4.204.29 4.984.087 5.88.029 7.164-.028 8.45-.028 8.85-.028 12.06c0 3.21.015 3.61.072 4.896.057 1.284.261 2.18.558 2.96.31.805.726 1.488 1.406 2.168.68.68 1.363 1.096 2.168 1.406.78.297 1.676.5 2.96.558 1.286.057 1.686.072 4.896.072s3.61-.015 4.896-.072c1.284-.057 2.18-.261 2.96-.558.805-.31 1.488-.726 2.168-1.406.68-.68 1.096-1.363 1.406-2.168.297-.78.5-1.676.558-2.96.057-1.286.072-1.686.072-4.896s-.015-3.61-.072-4.896c-.057-1.284-.261-2.18-.558-2.96-.31-.805-.726-1.488-1.406-2.168C20.74 1.314 20.057.898 19.252.588 18.472.29 17.576.087 16.292.029 15.006-.028 14.606-.028 11.396-.028h.621zM11.4 2.163c3.147 0 3.52.012 4.764.069 1.15.052 1.773.245 2.188.407.55.213.942.469 1.353.88.412.412.667.804.88 1.354.162.415.355 1.038.407 2.188.057 1.244.069 1.617.069 4.764s-.012 3.52-.069 4.764c-.052 1.15-.245 1.773-.407 2.188-.213.55-.469.942-.88 1.353-.412.412-.804.667-1.354.88-.415.162-1.038.355-2.188.407-1.244.057-1.617.069-4.764.069s-3.52-.012-4.764-.069c-1.15-.052-1.773-.245-2.188-.407-.55-.213-.942-.469-1.353-.88-.412-.412-.667-.804-.88-1.354-.162-.415-.355-1.038-.407-2.188C2.175 15.52 2.163 15.147 2.163 12s.012-3.52.069-4.764c.052-1.15.245-1.773.407-2.188.213-.55.469-.942.88-1.353.412-.412.804-.667 1.354-.88.415-.162 1.038-.355 2.188-.407C8.305 2.175 8.678 2.163 11.825 2.163H12zm0 3.537a6.3 6.3 0 100 12.6 6.3 6.3 0 000-12.6zM12 16.1a4.1 4.1 0 110-8.2 4.1 4.1 0 010 8.2zm8.042-10.473a1.473 1.473 0 11-2.946 0 1.473 1.473 0 012.946 0z"/></svg>
            </a>
            <a href="https://line.me" target="_blank" rel="noopener noreferrer" className="text-emerald-100/40 hover:text-white transition-colors" aria-label="Line">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
