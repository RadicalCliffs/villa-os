import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Building2,
  CalendarDays,
  ClipboardList,
  DollarSign,
  Users,
  CalendarSync,
  Image as ImageIcon,
  Globe,
  Kanban,
  Bell,
  BarChart3,
  Calculator,
  UserCog,
  Clock,
  Thermometer,
  FileText,
} from 'lucide-react';
import { NavHeader } from '@/components/nav-header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Features - VillaOS',
  description: 'Explore every feature of VillaOS: property management, reservations, task boards, financial reporting, staff coordination, and calendar sync.',
};

const featureImages = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=700&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=700&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=700&h=500&fit=crop&q=80',
];

const categories = [
  {
    title: 'Property Management',
    description:
      'Build a complete digital profile for every villa in your portfolio. Upload photo galleries, track amenities like pool type, bedroom count, and garden size. Store owner contact details, management agreements, and commission structures all in one place. When a new staff member joins your team, they can get up to speed on any property in minutes instead of days.',
    icon: Building2,
    image: featureImages[0],
    features: [
      { icon: Building2, label: 'Villa profiles with complete details' },
      { icon: ImageIcon, label: 'Photo galleries for each property' },
      { icon: Thermometer, label: 'Amenities and condition tracking' },
      { icon: UserCog, label: 'Owner details and agreements' },
    ],
  },
  {
    title: 'Reservation Tracking',
    description:
      'Pull bookings from Airbnb, Booking.com, Agoda, and direct reservations into a single calendar view. See guest names, check-in times, special requests, and payment status at a glance. Color-coded status indicators make it obvious which bookings need attention. No more switching between five browser tabs to figure out who is arriving tomorrow.',
    icon: CalendarDays,
    image: featureImages[1],
    features: [
      { icon: Globe, label: 'Multi-platform sync (Airbnb, Booking.com, direct)' },
      { icon: CalendarDays, label: 'Unified calendar view' },
      { icon: Users, label: 'Guest details and special requests' },
      { icon: DollarSign, label: 'Payment status tracking' },
    ],
  },
  {
    title: 'Task Management',
    description:
      'A visual kanban board designed for villa operations. Create tasks for cleaning, pool maintenance, garden care, and repairs. Drag cards between columns to update status. Assign tasks to specific staff members and set priority levels. When you move a task, your staff receives an instant WhatsApp notification with all the details they need. No more chasing people for updates.',
    icon: ClipboardList,
    image: featureImages[2],
    features: [
      { icon: Kanban, label: 'Kanban board with drag-and-drop' },
      { icon: UserCog, label: 'Staff assignment per task' },
      { icon: Bell, label: 'WhatsApp notifications' },
      { icon: ClipboardList, label: 'Priority levels and due dates' },
    ],
  },
  {
    title: 'Financial Reporting',
    description:
      'Stop spending days building monthly owner reports in spreadsheets. VillaOS automatically tracks revenue by source, records expenses against each property, and calculates management commissions. Generate polished profit and loss statements with one click. Share them with owners via a secure link or download as a professional PDF. The numbers are always up to date.',
    icon: DollarSign,
    image: featureImages[3],
    features: [
      { icon: BarChart3, label: 'Revenue breakdown by source' },
      { icon: DollarSign, label: 'Expense tracking per villa' },
      { icon: Calculator, label: 'Automatic commission calculations' },
      { icon: FileText, label: 'Owner P&L reports (PDF & link)' },
    ],
  },
  {
    title: 'Staff Coordination',
    description:
      'Keep a roster of every cleaner, pool technician, gardener, and handyman you work with. Track their availability, daily rates, and which villas they prefer. View each person\'s task history to identify your most reliable team members. When assigning tasks, the system shows you who is available and who is already booked so you can make smart decisions fast.',
    icon: Users,
    image: featureImages[4],
    features: [
      { icon: Users, label: 'Staff profiles and contact info' },
      { icon: Clock, label: 'Availability and schedule tracking' },
      { icon: DollarSign, label: 'Daily rate management' },
      { icon: ClipboardList, label: 'Complete task history per person' },
    ],
  },
  {
    title: 'Calendar & Sync',
    description:
      'Export your villa calendars to iCal so bookings appear in Google Calendar, Apple Calendar, or Outlook automatically. View an occupancy heatmap for the entire year to spot low seasons and plan promotional pricing. Track check-in and check-out times across all properties. Seasonal analysis helps you understand when to raise rates and when to run deals.',
    icon: CalendarSync,
    image: featureImages[5],
    features: [
      { icon: CalendarSync, label: 'iCal export to any calendar app' },
      { icon: BarChart3, label: 'Occupancy heatmap visualization' },
      { icon: CalendarDays, label: 'Check-in / check-out tracking' },
      { icon: Thermometer, label: 'Seasonal trend analysis' },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavHeader />

      {/* Hero */}
      <section className="relative h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1920&h=900&fit=crop&q=85"
          alt="Tropical villa with palm trees"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-800/80 to-emerald-700/70" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Every tool a villa manager needs
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
            Six integrated modules designed specifically for Phuket villa operations.
            No bloat, no complexity, no learning curve.
          </p>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900 bg-dot-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {categories.map((cat, i) => (
            <div key={cat.title} className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-start`}>
              {/* Text */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-emerald-100 dark:bg-emerald-900/40 p-3 rounded-xl">
                    <cat.icon className="h-7 w-7 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{cat.title}</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{cat.description}</p>
                <ul className="space-y-3">
                  {cat.features.map((f) => (
                    <li key={f.label} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <f.icon className="h-4 w-4 text-emerald-500 shrink-0" />
                      {f.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Screenshot-style image */}
              <div className="flex-1 w-full">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200/50 dark:border-gray-700/30">
                  <div className="bg-gray-100 dark:bg-gray-700 p-1.5 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
                    <span className="ml-3 text-xs text-gray-400">villaos.app</span>
                  </div>
                  <div className="relative h-72 md:h-80">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 text-white text-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=600&fit=crop&q=85"
          alt="Beach paradise"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-emerald-800/80" />
        <div className="max-w-2xl mx-auto px-4 relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to simplify your villa operations?</h2>
          <p className="text-white/70 mb-8">Start free with up to 3 villas. No credit card required.</p>
          <a
            href="/login"
            className="inline-flex items-center gap-2 bg-white text-emerald-800 hover:bg-emerald-50 px-8 py-3 rounded-xl font-bold transition-colors"
          >
            Start Free Trial
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
