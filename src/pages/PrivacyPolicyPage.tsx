import { motion } from 'framer-motion';
import { pageTransition } from '@/lib/animations';
import { useCartStore } from '@/store/cartStore';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import CookieBanner from '@/components/layout/CookieBanner';
import { Breadcrumb } from '@/components/common/Breadcrumb';

const LAST_UPDATED = '2026';
const DPO_EMAIL = 'business@textile-harmony.com';

export default function PrivacyPolicyPage() {
  const cartItemCount = useCartStore((s) => s.getItemCount());

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Privacy Policy' },
  ];

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Header cartItemCount={cartItemCount} />

      <main className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <h1 className="mb-2 font-serif text-2xl font-semibold text-text sm:text-3xl">
          Privacy Policy
        </h1>
        <p className="mb-10 text-sm text-secondary">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="space-y-10 text-sm leading-relaxed text-text/80">
          {/* 1. Introduction */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              1. Introduction
            </h2>
            <p>
              TextileHarmony is committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your personal information when you visit
              our website, make purchases, or interact with our services. By using our website, you
              consent to the data practices described in this policy. We process your data in
              compliance with the General Data Protection Regulation (GDPR) and other applicable
              European data protection laws.
            </p>
          </section>

          {/* 2. Data Controller */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              2. Data Controller
            </h2>
            <p className="mb-2">
              The data controller responsible for your personal data is:
            </p>
            <address className="not-italic">
              <p className="font-medium text-text">TextileHarmony SRL</p>
              <p>
                Email:{' '}
                <a href={`mailto:${DPO_EMAIL}`} className="text-accent hover:text-accent-hover">
                  {DPO_EMAIL}
                </a>
              </p>
              <p>Phone: +372 5427 7186</p>
            </address>
          </section>

          {/* 3. Data We Collect */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              3. Data We Collect
            </h2>
            <p className="mb-3">We may collect the following types of information:</p>

            <h3 className="mb-1.5 font-semibold text-text">Personal Data</h3>
            <ul className="mb-4 list-inside list-disc space-y-1 pl-2">
              <li>Name, email address, phone number</li>
              <li>Shipping and billing address</li>
              <li>Payment information (processed securely via third-party providers)</li>
              <li>Account credentials (if you create an account)</li>
            </ul>

            <h3 className="mb-1.5 font-semibold text-text">Usage Data</h3>
            <ul className="mb-4 list-inside list-disc space-y-1 pl-2">
              <li>IP address, browser type, and device information</li>
              <li>Pages visited, time spent, and navigation paths</li>
              <li>Referring website or search engine</li>
              <li>Language preferences and geographic location (country level)</li>
            </ul>

            <h3 className="mb-1.5 font-semibold text-text">Cookies</h3>
            <p>
              We use cookies and similar tracking technologies to enhance your experience.
              For detailed information about our cookie usage, please refer to Section 6
              (Cookie Policy) below.
            </p>
          </section>

          {/* 4. Purpose of Processing */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              4. Purpose of Processing
            </h2>
            <p className="mb-3">We process your personal data for the following purposes:</p>
            <ul className="list-inside list-disc space-y-1 pl-2">
              <li>
                <span className="font-medium text-text">Order fulfillment:</span> Processing and
                delivering your orders, sending order confirmations and shipping updates
              </li>
              <li>
                <span className="font-medium text-text">Communication:</span> Responding to your
                inquiries, providing customer support, and sending service-related notifications
              </li>
              <li>
                <span className="font-medium text-text">Marketing:</span> Sending newsletters,
                promotional offers, and product recommendations (only with your explicit consent)
              </li>
              <li>
                <span className="font-medium text-text">Website improvement:</span> Analyzing usage
                patterns to improve our website, products, and services
              </li>
              <li>
                <span className="font-medium text-text">Legal compliance:</span> Meeting our legal
                and regulatory obligations
              </li>
            </ul>
          </section>

          {/* 5. Legal Basis */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              5. Legal Basis (GDPR Art. 6)
            </h2>
            <p className="mb-3">
              We process your personal data based on the following legal grounds:
            </p>
            <ul className="list-inside list-disc space-y-1 pl-2">
              <li>
                <span className="font-medium text-text">Consent (Art. 6(1)(a)):</span> For
                marketing communications, analytics cookies, and newsletter subscriptions. You may
                withdraw your consent at any time.
              </li>
              <li>
                <span className="font-medium text-text">Contractual necessity (Art. 6(1)(b)):</span>{' '}
                For processing orders, managing your account, and providing requested services.
              </li>
              <li>
                <span className="font-medium text-text">Legitimate interest (Art. 6(1)(f)):</span>{' '}
                For website security, fraud prevention, and basic analytics to improve our services,
                where these interests do not override your fundamental rights.
              </li>
              <li>
                <span className="font-medium text-text">Legal obligation (Art. 6(1)(c)):</span> For
                tax records, invoicing requirements, and other regulatory compliance.
              </li>
            </ul>
          </section>

          {/* 6. Cookie Policy */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              6. Cookie Policy
            </h2>
            <p className="mb-3">
              Our website uses cookies to provide you with the best possible experience.
              You can manage your cookie preferences at any time through our cookie consent
              banner or by adjusting your browser settings.
            </p>

            <h3 className="mb-1.5 font-semibold text-text">Types of Cookies We Use</h3>
            <ul className="list-inside list-disc space-y-1 pl-2">
              <li>
                <span className="font-medium text-text">Essential cookies:</span> Required for basic
                site functionality such as shopping cart, authentication, and security. These cannot
                be disabled.
              </li>
              <li>
                <span className="font-medium text-text">Analytics cookies:</span> Help us understand
                how visitors interact with our website by collecting anonymous usage data.
              </li>
              <li>
                <span className="font-medium text-text">Marketing cookies:</span> Used to deliver
                personalized advertisements and track the effectiveness of marketing campaigns across
                websites.
              </li>
            </ul>
          </section>

          {/* 7. Data Retention */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              7. Data Retention
            </h2>
            <p className="mb-3">
              We retain your personal data only for as long as necessary to fulfill the purposes for
              which it was collected:
            </p>
            <ul className="list-inside list-disc space-y-1 pl-2">
              <li>
                <span className="font-medium text-text">Account data:</span> Retained while your
                account is active and for 3 years after account closure
              </li>
              <li>
                <span className="font-medium text-text">Order data:</span> Retained for 7 years as
                required by tax and accounting regulations
              </li>
              <li>
                <span className="font-medium text-text">Marketing data:</span> Retained until you
                withdraw consent or unsubscribe
              </li>
              <li>
                <span className="font-medium text-text">Cookie data:</span> Varies by cookie type,
                from session-based to a maximum of 12 months
              </li>
            </ul>
          </section>

          {/* 8. Your Rights */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              8. Your Rights
            </h2>
            <p className="mb-3">
              Under the GDPR, you have the following rights regarding your personal data:
            </p>
            <ul className="list-inside list-disc space-y-1 pl-2">
              <li>
                <span className="font-medium text-text">Right of access:</span> You may request a
                copy of all personal data we hold about you
              </li>
              <li>
                <span className="font-medium text-text">Right to rectification:</span> You may
                request correction of inaccurate or incomplete data
              </li>
              <li>
                <span className="font-medium text-text">Right to erasure:</span> You may request
                deletion of your personal data (&quot;right to be forgotten&quot;)
              </li>
              <li>
                <span className="font-medium text-text">Right to data portability:</span> You may
                request your data in a structured, commonly used, machine-readable format
              </li>
              <li>
                <span className="font-medium text-text">Right to object:</span> You may object to
                processing based on legitimate interests or for direct marketing purposes
              </li>
              <li>
                <span className="font-medium text-text">Right to restrict processing:</span> You may
                request limitation of processing in certain circumstances
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at{' '}
              <a href={`mailto:${DPO_EMAIL}`} className="text-accent hover:text-accent-hover">
                {DPO_EMAIL}
              </a>
              . We will respond to your request within 30 days. You also have the right to lodge a
              complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).
            </p>
          </section>

          {/* 9. Third Party Services */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              9. Third-Party Services
            </h2>
            <p className="mb-3">
              We work with trusted third-party service providers to operate our business. These
              providers may process your data on our behalf:
            </p>
            <ul className="list-inside list-disc space-y-1 pl-2">
              <li>
                <span className="font-medium text-text">Payment processors:</span> Stripe and
                PayPal for secure payment processing (PCI DSS compliant)
              </li>
              <li>
                <span className="font-medium text-text">Analytics:</span> Google Analytics for
                website usage analysis (with IP anonymization enabled)
              </li>
              <li>
                <span className="font-medium text-text">Email services:</span> For transactional and
                marketing email delivery
              </li>
              <li>
                <span className="font-medium text-text">Shipping partners:</span> For order delivery
                and tracking
              </li>
            </ul>
            <p className="mt-3">
              All third-party providers are contractually obligated to protect your data and process
              it only for the specified purposes. Data transfers outside the EEA are subject to
              appropriate safeguards under GDPR.
            </p>
          </section>

          {/* 10. Changes */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices
              or for legal, operational, or regulatory reasons. We will notify you of any material
              changes by posting the updated policy on our website and updating the &quot;Last
              updated&quot; date. We encourage you to review this page periodically for the latest
              information on our privacy practices.
            </p>
          </section>

          {/* 11. Contact DPO */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              11. Contact Our Data Protection Officer
            </h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our data processing
              practices, please contact our Data Protection Officer:
            </p>
            <div className="mt-3 rounded-lg border border-border bg-surface p-4">
              <p className="font-medium text-text">TextileHarmony Data Protection Officer</p>
              <p>
                Email:{' '}
                <a href={`mailto:${DPO_EMAIL}`} className="text-accent hover:text-accent-hover">
                  {DPO_EMAIL}
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </motion.div>
  );
}
