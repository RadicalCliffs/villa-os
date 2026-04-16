import type { Metadata } from 'next';
import { NavHeader } from '@/components/nav-header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Privacy Policy - VillaOS',
  description: 'Privacy policy for the VillaOS property management platform. PDPA compliant.',
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavHeader />

      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-700 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-extrabold">Privacy Policy</h1>
          <p className="mt-3 text-emerald-100/70 text-sm">Last updated: April 1, 2026</p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-800 flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">1. Introduction</h2>
            <p>
              VillaOS Co., Ltd. (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and disclose your information when you use the VillaOS platform. This policy complies with Thailand&apos;s Personal Data Protection Act B.E. 2562 (2019) (&ldquo;PDPA&rdquo;) and applicable international data protection standards.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">2. Data Controller</h2>
            <p>
              VillaOS Co., Ltd., registered at Boat Lagoon, 22/1 Moo 2, Thepkrasattri Road, Koh Kaew, Phuket 83000, Thailand, is the data controller for the personal data processed through the Service. Our Data Protection Officer can be reached at privacy@villaos.co.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">3. Personal Data We Collect</h2>
            <p>We collect the following categories of personal data:</p>
            <p>
              <strong>Account Information:</strong> Name, email address, phone number, company name, and password hash when you register for an account.
            </p>
            <p>
              <strong>Property Data:</strong> Villa details, addresses, photos, amenity descriptions, owner information, and management agreement terms that you enter into the platform.
            </p>
            <p>
              <strong>Guest Data:</strong> Guest names, booking dates, contact details, and special requests associated with reservations you manage through the Service.
            </p>
            <p>
              <strong>Financial Data:</strong> Revenue records, expense entries, commission calculations, and payment information related to villa operations.
            </p>
            <p>
              <strong>Staff Data:</strong> Staff names, contact information, availability schedules, daily rates, and task performance records.
            </p>
            <p>
              <strong>Usage Data:</strong> Log data including IP address, browser type, pages visited, time and date of visits, and actions taken within the Service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">4. Legal Basis for Processing</h2>
            <p>
              Under the PDPA, we process your personal data based on: (a) your consent where explicitly provided; (b) performance of the contract between you and VillaOS; (c) compliance with legal obligations; and (d) our legitimate interests in operating, improving, and securing the Service, provided these do not override your fundamental rights and freedoms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">5. How We Use Your Data</h2>
            <p>
              We use your personal data to: provide and maintain the Service; process subscription payments; send service-related notifications; improve platform features and performance; provide customer support; comply with legal obligations; prevent fraud and ensure security; and generate anonymized, aggregated analytics about platform usage.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">6. Data Sharing and Disclosure</h2>
            <p>
              We do not sell your personal data. We may share data with: cloud infrastructure providers (for hosting and storage); payment processors (for subscription billing); analytics services (using anonymized data only); and law enforcement or regulatory authorities when required by Thai law. All third-party service providers are bound by data processing agreements that ensure the protection of your data.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">7. Data Retention</h2>
            <p>
              We retain your personal data for as long as your account is active or as needed to provide the Service. After account termination, we retain data in read-only mode for 30 days to allow data export. Financial records may be retained for up to 7 years as required by Thai tax and accounting regulations. Usage logs are retained for 12 months and then anonymized or deleted.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">8. Data Security</h2>
            <p>
              We implement industry-standard security measures including: encryption of data in transit (TLS 1.3) and at rest (AES-256); role-based access controls; regular security audits and vulnerability assessments; database backups with encryption; and incident response procedures in accordance with PDPA requirements.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">9. Your Rights Under PDPA</h2>
            <p>
              Under Thailand&apos;s PDPA, you have the right to: access your personal data and receive a copy; correct inaccurate or incomplete data; request deletion of your data (subject to legal retention requirements); restrict processing in certain circumstances; object to processing based on legitimate interests; data portability (receive your data in a structured, machine-readable format); withdraw consent at any time where processing is based on consent; and lodge a complaint with the Personal Data Protection Committee of Thailand.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">10. International Data Transfers</h2>
            <p>
              Your data is primarily stored on servers located in Singapore. When data is transferred outside Thailand, we ensure adequate protection through: contractual clauses with data processors; compliance with PDPA cross-border transfer requirements; and use of service providers that maintain internationally recognized security certifications.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">11. Cookies and Tracking</h2>
            <p>
              We use essential cookies to maintain your login session and remember your preferences (such as theme selection). We do not use third-party tracking cookies for advertising purposes. Analytics cookies are used only with your consent and collect anonymized usage data to help us improve the Service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">12. Children&apos;s Privacy</h2>
            <p>
              The Service is not directed to individuals under the age of 20 (the age of majority in Thailand). We do not knowingly collect personal data from minors. If we become aware that we have collected data from a person under 20 without appropriate parental consent, we will take steps to delete that information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">13. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material changes by email or by posting a notice in the Service at least 14 days before the changes take effect. Your continued use of the Service after the effective date constitutes acceptance of the updated policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">14. Contact Us</h2>
            <p>
              For privacy-related inquiries or to exercise your rights under the PDPA, contact our Data Protection Officer at privacy@villaos.co or write to: VillaOS Co., Ltd., Attn: Data Protection Officer, Boat Lagoon, 22/1 Moo 2, Thepkrasattri Road, Koh Kaew, Phuket 83000, Thailand.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
