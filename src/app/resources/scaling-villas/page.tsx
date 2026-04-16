import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ArrowLeft, ArrowRight, User, Calendar } from 'lucide-react';
import { NavHeader } from '@/components/nav-header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'How to Scale from 5 to 50 Villas Without Losing Your Mind - VillaOS',
  description: 'The systems, staff structures, and technology you need to grow your villa portfolio sustainably. Real lessons from managers who made the leap.',
};

const toc = [
  'The Breaking Point',
  'System 1: Centralized Property Data',
  'System 2: Structured Task Management',
  'System 3: Staff Tiers and Specialization',
  'System 4: Automated Owner Reporting',
  'System 5: Distribution Channel Strategy',
  'The Technology Question',
  'Start Before You Need To',
];

export default function ScalingVillasArticle() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavHeader />

      <article className="py-12 md:py-20 bg-white dark:bg-gray-800 flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link href="/resources" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 text-sm font-medium mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Resources
          </Link>

          {/* Header */}
          <header className="mb-12">
            <span className="inline-block bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-medium px-3 py-1 rounded-full mb-4">
              Operations
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
              How to Scale from 5 to 50 Villas Without Losing Your Mind
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" /> Kittisak Phanwattana
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> March 12, 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> 6 min read
              </span>
            </div>
          </header>

          {/* Table of Contents */}
          <nav className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-12 border border-gray-200 dark:border-gray-600">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Table of Contents</h2>
            <ol className="space-y-2">
              {toc.map((item, i) => (
                <li key={i} className="text-sm text-emerald-600 dark:text-emerald-400">
                  {i + 1}. {item}
                </li>
              ))}
            </ol>
          </nav>

          {/* Article body */}
          <div className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
            <p>
              Managing five villas in Phuket is hard work, but it is manageable. You know every property intimately, your cleaning team answers your Line messages within minutes, and owner reports are something you put together on a Sunday afternoon. Then someone offers you three more properties. Then five. Then a friend refers a developer with twelve new builds in Cherngtalay.
            </p>
            <p>
              Somewhere between ten and twenty villas, everything that worked before starts breaking. This article walks through the five systems you need to put in place before you hit that wall, not after.
            </p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10">The Breaking Point</h2>
            <p>
              Most villa managers in Phuket hit their operational ceiling around 15 properties. The signs are predictable: you miss a check-in because the booking was in a different spreadsheet tab, a pool gets green because the task fell off your mental list, and an owner calls asking why their revenue report is two weeks late.
            </p>
            <p>
              These are not personal failures. They are systemic ones. The same brain that can hold five villas in working memory cannot hold fifty. You need systems that compensate for human limitations while preserving the personal touch that makes boutique villa management special.
            </p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10">System 1: Centralized Property Data</h2>
            <p>
              Every villa should have a single digital profile that contains everything a new team member needs to know: lock codes, WiFi passwords, pool pump schedules, owner preferences, the name of the gardener who knows the irrigation system, emergency plumber contacts. When this information lives in your head or scattered across chats, every new hire starts from zero.
            </p>
            <p>
              Create a standardized template with sections for access details, maintenance schedules, vendor contacts, amenity inventory, and special instructions. Whether you use a dedicated tool or a structured document, the key is consistency. Every villa gets the same treatment.
            </p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10">System 2: Structured Task Management</h2>
            <p>
              At five villas, you can keep a to-do list in your head. At twenty, you need a system that assigns tasks to specific people with clear deadlines and status tracking. The cleaning team needs to know which villas need turnover service today, what time guests are arriving, and whether there are any special requests like extra towels or a baby cot.
            </p>
            <p>
              A visual board where tasks move through columns (pending, in progress, done) is more effective than a flat list because it gives everyone a shared view of current workload. When your pool technician can see that three villas need attention today instead of five, they can plan their route efficiently.
            </p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10">System 3: Staff Tiers and Specialization</h2>
            <p>
              With five villas, one or two people can handle everything. At scale, you need specialists. Divide your team into tiers: cleaning crews, maintenance technicians, and a small operations team that handles guest communication and quality control.
            </p>
            <p>
              Track each person&apos;s strengths and reliability. Some cleaners are meticulous but slow; assign them to premium villas where quality matters most. Others are fast and thorough; they handle the high-turnover properties. Having data on who performs well at what properties is a competitive advantage that most managers overlook.
            </p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10">System 4: Automated Owner Reporting</h2>
            <p>
              If you are spending more than two hours per month on owner reports per villa, you are doing it wrong. At fifty villas, that would be a hundred hours per month, essentially a full-time job that produces zero revenue.
            </p>
            <p>
              Set up a system where revenue, expenses, and occupancy data flow into a template automatically. The report should include a revenue breakdown by booking platform, a list of expenses with receipts, the management commission calculation, and a net profit figure. Owners who receive consistent, professional reports on time every month are owners who renew their management contracts.
            </p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10">System 5: Distribution Channel Strategy</h2>
            <p>
              Most managers start on Airbnb because it is easy. As your portfolio grows, you need a deliberate strategy for where each property is listed and what pricing approach to use. Some villas perform better on Booking.com because of the European guest demographic. Others thrive on Agoda for the Asian market. Direct bookings through your own website have the best margins but require marketing investment.
            </p>
            <p>
              Track performance by channel and by property. Knowing that Villa Serenity gets 70% of its bookings from Booking.com at a higher average daily rate than Airbnb tells you where to focus your optimization efforts.
            </p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10">The Technology Question</h2>
            <p>
              Generic property management software designed for Western apartment blocks rarely fits the Phuket villa workflow. You need tools that understand Thai-language staff communication, baht-denominated financial reporting, and the reality that your pool technician gets tasks via WhatsApp, not email.
            </p>
            <p>
              Look for technology that integrates with the communication tools your team already uses rather than forcing everyone onto a new platform. The best system is one that your staff actually adopts, not the one with the most features on a comparison chart.
            </p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10">Start Before You Need To</h2>
            <p>
              The biggest mistake managers make is waiting until the chaos is unbearable before implementing systems. By then, you are fighting fires while trying to build the fire station. Start putting these five systems in place when you have ten villas, not thirty. The investment in time and tools pays compound returns as your portfolio grows.
            </p>
            <p>
              Scaling a villa management business in Phuket is absolutely achievable. The managers who do it well are not necessarily smarter or more experienced. They are the ones who recognized early that what got them to five villas would not get them to fifty, and they built the infrastructure before they needed it.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Ready to scale your operations?</h3>
            <p className="text-emerald-100/70 mb-6 text-sm">VillaOS gives you all five systems in one platform. Start free with up to 3 villas.</p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-white text-emerald-800 hover:bg-emerald-50 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors"
            >
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
