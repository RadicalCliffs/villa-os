import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import { NavHeader } from '@/components/nav-header';
import { Footer } from '@/components/footer';
import { ScrollAnimate } from '@/components/ui/scroll-animate';

export const metadata: Metadata = {
  title: 'Resources - VillaOS',
  description: 'Guides, articles, and insights for Phuket villa managers. Learn how to scale operations, optimize listings, and grow revenue.',
};

const articles = [
  {
    title: 'How to Scale from 5 to 50 Villas Without Losing Your Mind',
    excerpt: 'The systems, staff structures, and technology you need to grow your villa portfolio sustainably. Real lessons from managers who made the leap.',
    readTime: '6 min',
    date: 'March 12, 2026',
    slug: '/resources/scaling-villas',
    category: 'Operations',
    image: '/images/villas/d4de4cf3-02fd-490a-b199-70d96b9d2037.png',
  },
  {
    title: 'The Complete Guide to Villa Owner Reports',
    excerpt: 'What owners actually want to see, how often to send reports, and the metrics that build trust and reduce complaints.',
    readTime: '5 min',
    date: 'February 28, 2026',
    slug: '/resources',
    category: 'Reporting',
    image: '/images/villas/d70b590e-d65e-46fe-a568-443b278b9900.png',
  },
  {
    title: 'Phuket Villa Market 2026: Trends & Opportunities',
    excerpt: 'Occupancy rates, average daily rates, and emerging neighborhoods. Where the smart money is going this year.',
    readTime: '8 min',
    date: 'January 15, 2026',
    slug: '/resources',
    category: 'Market',
    image: '/images/villas/da646e21-6ecb-4c5d-856a-60a206bc3636.png',
  },
  {
    title: 'Airbnb vs Booking.com: Optimizing Your Listing Mix',
    excerpt: 'Commission structures, guest demographics, and cancellation policies compared. How to balance your distribution across platforms.',
    readTime: '7 min',
    date: 'December 20, 2025',
    slug: '/resources',
    category: 'Distribution',
    image: '/images/villas/daa7b0fe-7a4e-4962-8e75-334d7e5352c6.png',
  },
];

export default function ResourcesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavHeader />

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-700 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Resources</h1>
          <p className="mt-4 text-lg text-emerald-100/70 max-w-xl mx-auto">
            Practical guides and market insights for Phuket villa managers.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article, i) => (
              <ScrollAnimate key={article.title} direction="up" delay={i * 100}>
              <Link
                href={article.slug}
                className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow block"
              >
                <div className="relative h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-block bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="h-3 w-3" /> {article.readTime}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors mb-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{article.date}</span>
                    <span className="text-emerald-600 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2.5 transition-all duration-300">
                      Read <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </div>
                </div>
              </Link>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-emerald-700 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Get new articles in your inbox</h2>
          <p className="text-emerald-100/70 mb-6">Monthly insights for villa managers. No spam.</p>
          <form className="flex gap-2 max-w-md mx-auto" action="#">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus-glow"
            />
            <button type="submit" className="bg-white text-emerald-800 hover:bg-emerald-50 px-6 py-2.5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
