import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, X, ArrowRight } from 'lucide-react';
import { NavHeader } from '@/components/nav-header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Pricing - VillaOS',
  description: 'Simple, transparent pricing for villa managers. Start free with up to 3 villas. Upgrade to Pro or Enterprise as you grow.',
};

const plans = [
  {
    name: 'Starter',
    tagline: 'For New Managers',
    price: 'Free',
    priceSub: 'forever',
    features: [
      'Up to 3 villas',
      'Basic task management',
      'Owner reports (monthly)',
      'Email support',
      'Single user',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Professional',
    tagline: 'Most Popular',
    price: '฿1,900',
    priceSub: '/month ($55)',
    features: [
      'Unlimited villas',
      'Full task board with drag-and-drop',
      'Staff management + WhatsApp notifications',
      'iCal sync',
      'Occupancy heatmaps',
      'Priority support',
      'Up to 5 users',
    ],
    cta: 'Start 14-Day Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    tagline: 'For Management Companies',
    price: '฿4,900',
    priceSub: '/month ($142)',
    features: [
      'Everything in Professional',
      'Multi-manager access',
      'API access',
      'Custom branding on reports',
      'Dedicated account manager',
      'Bulk import / export',
      'Unlimited users',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const comparisonFeatures = [
  { feature: 'Villas', starter: 'Up to 3', pro: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Users', starter: '1', pro: 'Up to 5', enterprise: 'Unlimited' },
  { feature: 'Task Board', starter: true, pro: true, enterprise: true },
  { feature: 'Drag & Drop', starter: false, pro: true, enterprise: true },
  { feature: 'Staff Management', starter: false, pro: true, enterprise: true },
  { feature: 'WhatsApp Notifications', starter: false, pro: true, enterprise: true },
  { feature: 'Owner Reports', starter: 'Monthly', pro: 'On-demand', enterprise: 'On-demand' },
  { feature: 'iCal Sync', starter: false, pro: true, enterprise: true },
  { feature: 'Occupancy Heatmaps', starter: false, pro: true, enterprise: true },
  { feature: 'API Access', starter: false, pro: false, enterprise: true },
  { feature: 'Custom Branding', starter: false, pro: false, enterprise: true },
  { feature: 'Dedicated Account Manager', starter: false, pro: false, enterprise: true },
  { feature: 'Support', starter: 'Email', pro: 'Priority', enterprise: 'Dedicated' },
];

const faqs = [
  {
    q: 'Can I try VillaOS before paying?',
    a: 'Yes. The Starter plan is completely free and never expires. You can manage up to 3 villas at no cost. The Professional plan also comes with a 14-day free trial.',
  },
  {
    q: 'How does billing work?',
    a: 'We bill monthly in Thai Baht via credit card or bank transfer. You can cancel anytime with no early-termination fees. Unused days are not refunded but your access continues until the end of the billing period.',
  },
  {
    q: 'Can I switch plans at any time?',
    a: 'Absolutely. Upgrade or downgrade whenever you need. When upgrading, you pay the prorated difference for the remainder of the current billing cycle.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept Visa, Mastercard, and Thai bank transfers. Enterprise customers can pay by invoice with net-30 terms.',
  },
  {
    q: 'Is there a long-term contract?',
    a: 'No. All plans are month-to-month. Enterprise customers can opt for annual billing with a 15% discount.',
  },
  {
    q: 'Can I import my existing data?',
    a: 'Yes. We support importing villa data, reservations, and financial records from CSV and Excel files. Enterprise customers get dedicated import assistance.',
  },
  {
    q: 'Do you offer discounts for annual billing?',
    a: 'Yes. Pay annually and save 15% on Professional and Enterprise plans. Contact us for annual pricing details.',
  },
  {
    q: 'What happens to my data if I cancel?',
    a: 'Your data remains accessible in read-only mode for 30 days after cancellation. You can export everything as CSV before that. After 30 days, data is permanently deleted.',
  },
];

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="h-5 w-5 text-emerald-600 mx-auto" />
    ) : (
      <X className="h-5 w-5 text-gray-300 dark:text-gray-600 mx-auto" />
    );
  }
  return <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>;
}

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavHeader />

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Simple, transparent pricing
          </h1>
          <p className="mt-6 text-lg text-emerald-100/70 max-w-xl mx-auto">
            Start free. Upgrade when you grow. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-8 flex flex-col ${
                  plan.popular
                    ? 'border-emerald-500 bg-white dark:bg-gray-800 shadow-xl ring-2 ring-emerald-500/20 relative'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{plan.tagline}</p>
                </div>
                <div className="mb-8">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">{plan.priceSub}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.name === 'Enterprise' ? '/contact' : '/login'}
                  className={`inline-flex items-center justify-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                    plan.popular
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Compare plans side by side
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 pr-4 text-sm font-medium text-gray-500 dark:text-gray-400 w-1/4">Feature</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Starter</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-emerald-600">Professional</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row) => (
                  <tr key={row.feature} className="border-b border-gray-100 dark:border-gray-700/50">
                    <td className="py-3 pr-4 text-sm text-gray-700 dark:text-gray-300">{row.feature}</td>
                    <td className="py-3 px-4 text-center"><CellValue value={row.starter} /></td>
                    <td className="py-3 px-4 text-center bg-emerald-50/50 dark:bg-emerald-900/10"><CellValue value={row.pro} /></td>
                    <td className="py-3 px-4 text-center"><CellValue value={row.enterprise} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-700 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Start managing smarter today</h2>
          <p className="text-emerald-100/70 mb-8">Free plan available. No credit card required.</p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-white text-emerald-800 hover:bg-emerald-50 px-8 py-3 rounded-xl font-bold transition-colors"
          >
            Get Started Free <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
