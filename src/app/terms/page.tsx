import type { Metadata } from 'next';
import { NavHeader } from '@/components/nav-header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Terms of Service - VillaOS',
  description: 'Terms of service for the VillaOS property management platform.',
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavHeader />

      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-700 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-extrabold">Terms of Service</h1>
          <p className="mt-3 text-emerald-100/70 text-sm">Last updated: April 1, 2026</p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-800 flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing or using VillaOS (&ldquo;the Service&rdquo;), operated by VillaOS Co., Ltd., a company registered in Thailand, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access the Service. These terms apply to all visitors, users, and others who access or use the Service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">2. Description of Service</h2>
            <p>
              VillaOS is a cloud-based property management platform designed for villa managers operating in Thailand. The Service provides tools for property tracking, reservation management, task assignment, financial reporting, staff coordination, and calendar synchronization. The Service is provided on a software-as-a-service (SaaS) basis.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">3. User Accounts</h2>
            <p>
              You must create an account to use most features of the Service. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. VillaOS cannot and will not be liable for any loss or damage arising from your failure to maintain the security of your account.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">4. Subscription and Payment</h2>
            <p>
              Certain features of the Service require a paid subscription. Subscription fees are billed monthly in Thai Baht. All fees are non-refundable except as required by applicable Thai law. We reserve the right to modify subscription fees with 30 days advance notice. Free tier accounts may be subject to usage limitations as described in the pricing page.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">5. User Data and Content</h2>
            <p>
              You retain ownership of all data and content you upload to the Service, including property information, guest records, financial data, and staff details. By using the Service, you grant VillaOS a limited license to process, store, and display this data solely for the purpose of providing and improving the Service. We will not sell, share, or disclose your data to third parties except as described in our Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">6. Acceptable Use</h2>
            <p>
              You agree not to use the Service to: (a) violate any applicable local, national, or international law; (b) upload or transmit viruses or malicious code; (c) attempt to gain unauthorized access to other accounts or our infrastructure; (d) use the Service for any purpose that is fraudulent or deceptive; (e) interfere with or disrupt the integrity or performance of the Service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">7. Service Availability</h2>
            <p>
              We strive to maintain 99.9% uptime but do not guarantee uninterrupted access. The Service may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control. We will make reasonable efforts to notify users in advance of planned downtime. VillaOS shall not be liable for any damages resulting from service interruptions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by Thai law, VillaOS and its directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising from your use of the Service. Our total liability for any claim arising from the Service shall not exceed the amount you paid to us in the twelve months preceding the claim.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">9. Termination</h2>
            <p>
              Either party may terminate this agreement at any time. You may cancel your subscription through your account settings. We may suspend or terminate your access if you violate these terms. Upon termination, your data will remain accessible in read-only mode for 30 days, after which it will be permanently deleted. You may export your data at any time before deletion.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">10. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Kingdom of Thailand. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Phuket Province, Thailand.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of material changes via email or a notice within the Service at least 14 days before the changes take effect. Your continued use of the Service after the effective date constitutes acceptance of the modified Terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">12. Contact</h2>
            <p>
              For questions about these Terms, contact us at legal@villaos.co or VillaOS Co., Ltd., Boat Lagoon, 22/1 Moo 2, Thepkrasattri Road, Koh Kaew, Phuket 83000, Thailand.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
