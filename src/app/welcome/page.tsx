import type { Metadata } from 'next';
import Link from 'next/link';
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

const features = [
  {
    title: 'Smart Dashboard',
    desc: "See all villas at a glance. Today's check-ins, pending tasks, revenue numbers, and urgent items on a single screen. No more juggling tabs or spreadsheets to get a picture of your operations.",
    icon: LayoutDashboard,
  },
  {
    title: 'Drag & Drop Task Board',
    desc: 'Assign cleaning, pool maintenance, and garden tasks with a click. Drag to update status. Your staff receives instant WhatsApp notifications so nothing falls through the cracks.',
    icon: GripVertical,
  },
  {
    title: 'Owner Reports',
    desc: 'Auto-generated profit and loss reports broken down by villa, month, and revenue source. Share via a secure link or print as a polished PDF. Owners love the transparency.',
    icon: BarChart3,
  },
  {
    title: 'Calendar Sync',
    desc: 'Export to iCal so your team sees bookings in their own calendar app. Never double-book again. View occupancy heatmaps for the full year to spot trends and plan pricing.',
    icon: Calendar,
  },
];

const testimonials = [
  {
    name: 'Somchai T.',
    role: 'Manages 42 villas in Rawai',
    quote: 'We cut our monthly reporting time from three days to thirty minutes. Our owners finally trust the numbers.',
    stars: 5,
  },
  {
    name: 'Sarah K.',
    role: 'Managing Director, Phuket Luxury Stays',
    quote: 'The task board alone saved us. Our cleaning team knows exactly what to do each morning without a single phone call.',
    stars: 5,
  },
  {
    name: 'Nattapong W.',
    role: 'Owner-operator, 12 villas in Kamala',
    quote: 'I used to run everything from Line groups and Google Sheets. VillaOS gave me my weekends back.',
    stars: 5,
  },
];

const stats = [
  { value: '500+', label: 'Villas managed' },
  { value: '50+', label: 'Villa managers' },
  { value: '฿200M+', label: 'Tracked revenue' },
];

const plans = [
  {
    name: 'Free',
    desc: 'Up to 3 villas',
    price: '฿0',
    period: 'forever',
  },
  {
    name: 'Pro',
    desc: 'Unlimited villas',
    price: '฿1,900',
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
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.3),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              The Operating System for Phuket Villa Managers
            </h1>
            <p className="mt-6 text-lg md:text-xl text-emerald-100/80 leading-relaxed max-w-2xl">
              Manage 50+ villas from one dashboard. Automate tasks, track revenue, delight owners.
              Stop drowning in spreadsheets and WhatsApp groups.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-800 hover:bg-emerald-50 px-8 py-3.5 rounded-xl text-base font-bold transition-colors shadow-lg"
              >
                Start Free Trial <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center justify-center gap-2 bg-emerald-700/50 hover:bg-emerald-700/70 text-white border border-emerald-500/30 px-8 py-3.5 rounded-xl text-base font-bold transition-colors backdrop-blur-sm"
              >
                Watch Demo
              </Link>
            </div>
          </div>

          {/* Dashboard mockup placeholder */}
          <div className="mt-16 glass-card rounded-2xl p-2 shadow-2xl max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-emerald-600/20 to-green-600/20 rounded-xl h-64 md:h-96 flex items-center justify-center">
              <div className="text-center text-emerald-200/50">
                <LayoutDashboard className="h-16 w-16 mx-auto mb-3" />
                <p className="text-sm font-medium">Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
              >
                <p.icon className="h-8 w-8 text-emerald-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-20 md:py-28 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Everything you need, nothing you do not
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Purpose-built for Phuket villa operations. Not a generic property tool.
            </p>
          </div>
          <div className="space-y-20">
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
                  <div className="bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-2xl h-64 flex items-center justify-center border border-emerald-200/50 dark:border-emerald-700/30">
                    <f.icon className="h-16 w-16 text-emerald-400/40" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{t.role}</div>
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
                className={`rounded-2xl border p-8 text-center ${
                  p.popular
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-lg ring-2 ring-emerald-500/20'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                }`}
              >
                {p.popular && (
                  <span className="inline-block bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
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
      <section className="py-20 md:py-28 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-700 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Join 50+ Phuket villa managers who switched from spreadsheets
          </h2>
          <p className="mt-6 text-emerald-100/70 text-lg">
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
