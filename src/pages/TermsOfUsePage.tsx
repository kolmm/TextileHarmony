import { motion } from 'framer-motion';
import { pageTransition } from '@/lib/animations';
import { useCartStore } from '@/store/cartStore';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import CookieBanner from '@/components/layout/CookieBanner';
import { Breadcrumb } from '@/components/common/Breadcrumb';

const LAST_UPDATED = 'January 15, 2024';

export default function TermsOfUsePage() {
  const cartItemCount = useCartStore((s) => s.getItemCount());

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Terms of Use' },
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
          Terms of Use
        </h1>
        <p className="mb-10 text-sm text-secondary">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="space-y-10 text-sm leading-relaxed text-text/80">
          {/* 1. General Terms */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              1. General Terms
            </h2>
            <p className="mb-3">
              Welcome to TextileHarmony. By accessing and using our website at textileharmony.eu,
              you agree to be bound by these Terms of Use, all applicable laws and regulations, and
              agree that you are responsible for compliance with any applicable local laws.
            </p>
            <p className="mb-3">
              If you do not agree with any of these terms, you are prohibited from using or accessing
              this site. The materials contained on this website are protected by applicable copyright
              and trademark law.
            </p>
            <p>
              TextileHarmony reserves the right to modify these Terms of Use at any time. Changes
              become effective immediately upon posting to the website. Your continued use of the site
              following the posting of revised terms means that you accept and agree to the changes.
            </p>
          </section>

          {/* 2. Account Terms */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              2. Account Terms
            </h2>
            <ul className="list-inside list-disc space-y-2 pl-2">
              <li>
                You must be at least 16 years of age to create an account and use our services.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your account credentials
                and for all activities that occur under your account.
              </li>
              <li>
                You agree to provide accurate, current, and complete information during the
                registration process and to update such information to keep it accurate.
              </li>
              <li>
                TextileHarmony reserves the right to suspend or terminate your account if any
                information provided proves to be inaccurate, not current, or incomplete.
              </li>
              <li>
                You must notify us immediately of any unauthorized use of your account or any other
                breach of security.
              </li>
            </ul>
          </section>

          {/* 3. Products and Pricing */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              3. Products and Pricing
            </h2>
            <p className="mb-3">
              All prices on our website are displayed in Euros (EUR) and include applicable VAT
              unless otherwise stated. We strive to ensure that all product descriptions and pricing
              information is accurate; however, errors may occur.
            </p>
            <ul className="list-inside list-disc space-y-2 pl-2">
              <li>
                Product images are for illustrative purposes only. Actual colors may vary slightly
                from what is displayed on your screen due to monitor settings and photographic
                lighting.
              </li>
              <li>
                We reserve the right to modify prices at any time without prior notice. Price changes
                will not affect orders that have already been confirmed.
              </li>
              <li>
                In the event of a pricing error, we reserve the right to cancel orders placed at the
                incorrect price and will provide a full refund if payment has been processed.
              </li>
              <li>
                Product availability is subject to change without notice. We do not guarantee that
                any product will remain available.
              </li>
            </ul>
          </section>

          {/* 4. Orders and Payment */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              4. Orders and Payment
            </h2>
            <p className="mb-3">
              By placing an order on our website, you are making an offer to purchase the selected
              products. All orders are subject to acceptance and availability.
            </p>
            <ul className="list-inside list-disc space-y-2 pl-2">
              <li>
                An order confirmation email does not constitute acceptance of your order. Your order
                is accepted when we dispatch the products and send you a shipping confirmation.
              </li>
              <li>
                We accept payment via Visa, Mastercard, PayPal, and Apple Pay. All payments are
                processed securely through our PCI DSS-compliant payment providers.
              </li>
              <li>
                Payment is taken at the time of order placement. If we are unable to fulfill your
                order, we will issue a full refund to your original payment method.
              </li>
              <li>
                We reserve the right to refuse or cancel any order for reasons including but not
                limited to product availability, errors in pricing or product information, or
                suspected fraudulent activity.
              </li>
            </ul>
          </section>

          {/* 5. Shipping and Delivery */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              5. Shipping and Delivery
            </h2>
            <p className="mb-3">
              We currently offer shipping throughout the European Union. Standard delivery typically
              takes 3-5 business days from the date of dispatch.
            </p>
            <ul className="list-inside list-disc space-y-2 pl-2">
              <li>
                Shipping costs are calculated at checkout based on order value and destination.
                Orders over &euro;75 qualify for free standard shipping within the EU.
              </li>
              <li>
                Estimated delivery times are not guaranteed and may vary due to factors beyond our
                control, including customs processing for cross-border deliveries.
              </li>
              <li>
                Risk of loss and title for items purchased pass to you upon delivery to the carrier.
              </li>
              <li>
                Please ensure your shipping address is correct. We are not responsible for delays or
                non-delivery due to incorrect address information provided by the customer.
              </li>
              <li>
                Tracking information will be provided via email once your order has been dispatched.
              </li>
            </ul>
          </section>

          {/* 6. Intellectual Property */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              6. Intellectual Property
            </h2>
            <p className="mb-3">
              All content on this website, including but not limited to text, graphics, logos,
              images, product descriptions, photographs, and software, is the property of
              TextileHarmony B.V. or its content suppliers and is protected by international
              copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works of, publicly
              display, or publicly perform any content from this website without our prior written
              consent. Limited use of content for personal, non-commercial purposes is permitted,
              provided that you maintain all copyright and other proprietary notices contained in the
              materials.
            </p>
          </section>

          {/* 7. Limitation of Liability */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              7. Limitation of Liability
            </h2>
            <p className="mb-3">
              To the maximum extent permitted by applicable law, TextileHarmony B.V. and its
              directors, employees, partners, agents, and affiliates shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages, including but not
              limited to loss of profits, data, or goodwill, arising from or related to your use of
              the website or our products.
            </p>
            <p>
              Our total liability for any claim arising from or related to these Terms of Use or your
              use of the website shall not exceed the total amount paid by you for the specific
              product(s) giving rise to the claim. This limitation of liability applies regardless of
              the form of action, whether in contract, tort, strict liability, or otherwise, and
              even if TextileHarmony has been advised of the possibility of such damages. Nothing in
              these terms limits or excludes our liability for death or personal injury caused by our
              negligence, fraud or fraudulent misrepresentation, or any other liability that cannot
              be excluded or limited by law.
            </p>
          </section>

          {/* 8. Governing Law */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              8. Governing Law
            </h2>
            <p className="mb-3">
              These Terms of Use shall be governed by and construed in accordance with the laws of
              the Netherlands, without regard to its conflict of law provisions.
            </p>
            <p>
              Any disputes arising out of or in connection with these Terms of Use shall be subject
              to the exclusive jurisdiction of the courts of Amsterdam, Netherlands. Notwithstanding
              the foregoing, if you are a consumer residing in the EU, you may also bring proceedings
              in the courts of your country of residence in accordance with applicable EU consumer
              protection legislation. You may also use the European Commission&apos;s Online Dispute
              Resolution (ODR) platform at{' '}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover"
              >
                ec.europa.eu/consumers/odr
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </motion.div>
  );
}
