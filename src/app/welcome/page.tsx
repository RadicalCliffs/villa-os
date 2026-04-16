import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  ClipboardList,
  FileSpreadsheet,
  GripVertical,
  Headphones,
  LayoutDashboard,
  MessageSquare,
  Star,
  Timer,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { NavHeader } from '@/components/nav-header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'VillaOS - The Operating System for Phuket Villa Managers',
  description:
    'Manage 50+ villas from one dashboard. Automate tasks, track revenue, delight owners. Built for Phuket villa managers.',
};

const painPoints = [
  {
    icon: FileSpreadsheet,
    title: 'Spreadsheet chaos',
    desc: 'Dozens of tabs, broken formulas, and version conflicts across your team.',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp overload',
    desc: 'Critical tasks buried in group chats. Nothing is trackable or accountable.',
  },
  {
    icon: ClipboardList,
    title: 'Manual task tracking',
    desc: 'Cleaning, pool, garden checklists scattered across notebooks and sticky notes.',
  },
  {
    icon: Timer,
    title: 'Monthly report headaches',
    desc: 'Days spent compiling owner P&L reports that should take minutes.',
  },
  {
    icon: Calendar,
    title: 'Calendar conflicts',
    desc: 'Double bookings, missed check-ins, and no centralized availability view.',
  },
  {
    icon: Headphones,
    title: 'Owner complaints',
    desc: 'Owners asking for updates you cannot easily provide. Transparency is impossible.',
  },
];

const featureImages = [
  '/images/villas/compound-aerial-night.png',
  '/images/lifestyle/property-manager-pool.png',
  '/images/interiors/workspace-ocean-view.png',
  '/images/villas/villa-pool-ocean-sunset.png',
];

const features = [
  {
    title: 'Smart Dashboard',
    desc: "See all villas at a glance. Today's check-ins, pending tasks, revenue numbers, and urgent items on a single screen. No more juggling tabs or spreadsheets to get a picture of your operations.",
    icon: LayoutDashboard,
    image: featureImages[0],
  },
  {
    title: 'Drag & Drop Task Board',
    desc: 'Assign cleaning, pool maintenance, and garden tasks with a click. Drag to update status. Your staff receives instant WhatsApp notifications so nothing falls through the cracks.',
    icon: GripVertical,
    image: featureImages[1],
  },
  {
    title: 'Owner Reports',
    desc: 'Auto-generated profit and loss reports broken down by villa, month, and revenue source. Share via a secure link or print as a polished PDF. Owners love the transparency.',
    icon: BarChart3,
    image: featureImages[2],
  },
  {
    title: 'Calendar Sync',
    desc: 'Export to iCal so your team sees bookings in their own calendar app. Never double-book again. View occupancy heatmaps for the full year to spot trends and plan pricing.',
    icon: Calendar,
    image: featureImages[3],
  },
];

const testimonials = [
  {
    name: 'Somchai T.',
    role: 'Manages 42 villas in Rawai',
    quote: 'We cut our monthly reporting time from three days to thirty minutes. Our owners finally trust the numbers.',
    stars: 5,
    initials: 'ST',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Sarah K.',
    role: 'Managing Director, Phuket Luxury Stays',
    quote: 'The task board alone saved us. Our cleaning team knows exactly what to do each morning without a single phone call.',
    stars: 5,
    initials: 'SK',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Nattapong W.',
    role: 'Owner-operator, 12 villas in Kamala',
    quote: 'I used to run everything from Line groups and Google Sheets. VillaOS gave me my weekends back.',
    stars: 5,
    initials: 'NW',
    color: 'from-amber-500 to-orange-600',
  },
];

const stats = [
  { value: '500+', label: 'Villas managed' },
  { value: '50+', label: 'Villa managers' },
  { value: '\u0E3F200M+', label: 'Tracked revenue' },
];

const plans = [
  {
    name: 'Free',
    desc: 'Up to 3 villas',
    price: '\u0E3F0',
    period: 'forever',
  },
  {
    name: 'Pro',
    desc: 'Unlimited villas',
    price: '\u0E3F1,900',
    period: '/month',
    popular: true,
  },
  {
    name: 'Enterprise',
    desc: 'Custom pricing, API access',
    price: 'Custom',
    period: '',
  },
];

export default function WelcomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavHeader />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="/images/villas/infinity-pool-sunset.png"
          alt="Modern luxury villa with pool"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/70 to-emerald-800/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 relative z-10 w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
              The Operating System for Phuket Villa Managers
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
              Manage 50+ villas from one dashboard. Automate tasks, track revenue, delight owners.
              Stop drowning in spreadsheets and WhatsApp groups.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 bg-white/95 backdrop-blur-sm text-emerald-800 hover:bg-white px-8 py-3.5 rounded-xl text-base font-bold transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                Start Free Trial <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-xl text-base font-bold transition-all backdrop-blur-md"
              >
                Watch Demo
              </Link>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="mt-16 rounded-2xl overflow-hidden shadow-2xl max-w-5xl mx-auto border border-white/10">
            <div className="bg-gray-900/80 backdrop-blur-xl p-1.5 flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-4 text-xs text-gray-400">villaos.app/dashboard</span>
            </div>
            <div className="relative h-64 md:h-96">
              <Image
                src="/images/villas/compound-aerial-night.png"
                alt="Dashboard analytics view"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900 bg-dot-pattern relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Villa managers in Phuket juggle too much
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Sound familiar? You are not alone. These are the problems every villa manager faces daily.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {painPoints.map((p) => (
              <div
                key={p.title}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 card-hover group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mb-4 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50">
                  <p.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-20 md:py-28 bg-white dark:bg-gray-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Everything you need, nothing you do not
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Purpose-built for Phuket villa operations. Not a generic property tool.
            </p>
          </div>
          <div className="space-y-24">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}
              >
                <div className="flex-1">
                  <f.icon className="h-10 w-10 text-emerald-600 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{f.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{f.desc}</p>
                </div>
                <div className="flex-1 w-full">
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200/50 dark:border-gray-700/30">
                    <div className="bg-gray-100 dark:bg-gray-700 p-1.5 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
                    </div>
                    <div className="relative h-64">
                      <Image
                        src={f.image}
                        alt={f.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900 bg-grid-pattern relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-20">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-emerald-600">{s.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 card-hover"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 md:py-28 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Start free. Upgrade when you grow. No hidden fees.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl border p-8 text-center card-hover ${
                  p.popular
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 glow-emerald ring-2 ring-emerald-500/20 relative'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{p.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{p.desc}</p>
                <div className="mt-6 mb-6">
                  <span className="text-3xl font-extrabold text-gray-900 dark:text-white">{p.price}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{p.period}</span>
                </div>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/pricing" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm inline-flex items-center gap-1">
              See full pricing comparison <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 md:py-28 text-white overflow-hidden">
        <Image
          src="/images/villas/beach-sala-turquoise.png"
          alt="Tropical sunset"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-emerald-900/80" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Join 50+ Phuket villa managers who switched from spreadsheets
          </h2>
          <p className="mt-6 text-white/70 text-lg">
            Set up takes five minutes. No credit card required for the free plan.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 backdrop-blur-sm"
            />
            <Link
              href="/login"
              className="w-full sm:w-auto bg-white text-emerald-800 hover:bg-emerald-50 px-8 py-3 rounded-xl font-bold transition-colors whitespace-nowrap text-center"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
