import type { Metadata } from 'next';
import Image from 'next/image';
import { Heart, Eye, Globe2, BarChart3, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { NavHeader } from '@/components/nav-header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'About - VillaOS',
  description: 'Built by villa managers, for villa managers. Learn the story behind VillaOS and our mission to professionalize Phuket\'s villa management industry.',
};

const founders = [
  {
    name: 'Kittisak Phanwattana',
    role: 'CEO & Co-Founder',
    bio: 'Managed 30+ villas across Rawai and Nai Harn for eight years before building VillaOS. Knows every pain point firsthand.',
    initials: 'KP',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Emma Richardson',
    role: 'CTO & Co-Founder',
    bio: 'Former software engineer at a London prop-tech startup. Moved to Phuket in 2020 and saw the gap between available tools and real needs.',
    initials: 'ER',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Patchara Suwannarat',
    role: 'COO & Co-Founder',
    bio: 'Operations specialist who streamlined housekeeping for a 50-villa portfolio. Designed the task board workflow that powers VillaOS.',
    initials: 'PS',
    gradient: 'from-amber-500 to-orange-600',
  },
];

const values = [
  {
    icon: Heart,
    title: 'Simplicity',
    desc: 'If a feature takes more than two clicks to use, we redesign it. Villa managers are busy people, not software experts.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    desc: 'Clear numbers for owners, clear pricing for managers. No hidden fees, no confusing dashboards, no data locked behind paywalls.',
  },
  {
    icon: Globe2,
    title: 'Local-first',
    desc: 'Built for Phuket, in Phuket. We understand Thai banking, local staff workflows, and the unique challenges of island property management.',
  },
  {
    icon: BarChart3,
    title: 'Data-driven',
    desc: 'Every decision should be backed by numbers. Occupancy trends, revenue analysis, and task performance help you run a better business.',
  },
];

const partners = ['Airbnb', 'Booking.com', 'Agoda', 'VRBO'];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavHeader />

      {/* Hero with Image */}
      <section className="relative h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1920&h=900&fit=crop&q=85"
          alt="Tropical island aerial view"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/75 to-emerald-800/60" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Built by villa managers, for villa managers
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
            We know your world because we lived it. VillaOS was born from real frustration with real spreadsheets on a real island.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 md:py-28 bg-white dark:bg-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Our story</h2>
          <div className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-6 leading-relaxed">
            <p>
              After managing 30+ villas in Phuket using spreadsheets, WhatsApp groups, and sheer willpower, our founding team knew there had to be a better way. Every morning started the same: scroll through five group chats, open three spreadsheets, and cross-reference a Google Calendar that was never up to date.
            </p>
            <p>
              We tried every property management tool on the market. They were built for Western apartment blocks or hotel chains, not for a Phuket operation where your pool guy communicates on Line and your owner wants a P&L statement in Thai Baht. Nothing fit.
            </p>
            <p>
              So in early 2024, we started building VillaOS. The first version was just a shared task board for our own cleaning crews. Then we added owner reports because that was the biggest time sink. Then calendar sync, because double bookings were costing us real money. Piece by piece, VillaOS became the tool we always wished existed.
            </p>
            <p>
              Today, over 50 villa managers across Phuket use VillaOS to run their operations. We are still a small team, still based in Phuket, and still obsessed with making villa management less painful.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900 bg-dot-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-16">The team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {founders.map((f) => (
              <div key={f.name} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center card-hover">
                <div className="relative mx-auto mb-5 w-24 h-24">
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${f.gradient} p-[3px]`}>
                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                      <span className={`text-2xl font-bold bg-gradient-to-br ${f.gradient} bg-clip-text text-transparent`}>
                        {f.initials}
                      </span>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{f.name}</h3>
                <p className="text-sm text-emerald-600 font-medium mb-3">{f.role}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28 bg-white dark:bg-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our mission</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Professionalize Phuket&apos;s villa management industry by giving every manager, whether they oversee 3 villas or 300, the same operational tools that major hotel chains take for granted.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-16">Our values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((v) => (
              <div key={v.title} className="flex gap-5 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 card-hover">
                <div className="bg-emerald-100 dark:bg-emerald-900/40 p-3 rounded-xl h-fit">
                  <v.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-lg font-semibold text-gray-500 dark:text-gray-400 mb-8">Works with your booking platforms</h2>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {partners.map((p) => (
              <span key={p} className="text-xl font-bold text-gray-300 dark:text-gray-600">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 text-white text-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&h=600&fit=crop&q=85"
          alt="Villa palms"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-emerald-800/80" />
        <div className="max-w-2xl mx-auto px-4 relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Join our growing community</h2>
          <p className="text-emerald-100/70 mb-8">50+ villa managers already made the switch.</p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-white text-emerald-800 hover:bg-emerald-50 px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
          >
            Get Started Free <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
