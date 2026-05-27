import { motion } from 'framer-motion';
import { pageTransition } from '@/lib/animations';
import { useCartStore } from '@/store/cartStore';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import CookieBanner from '@/components/layout/CookieBanner';
import { Breadcrumb } from '@/components/common/Breadcrumb';

const LAST_UPDATED = 'January 15, 2024';
const CONTACT_EMAIL = 'hello@textileharmony.eu';

export default function ReturnPolicyPage() {
  const cartItemCount = useCartStore((s) => s.getItemCount());

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Return Policy' },
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
          Return Policy
        </h1>
        <p className="mb-10 text-sm text-secondary">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="space-y-10 text-sm leading-relaxed text-text/80">
          {/* 1. Return Window */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              1. Return Window
            </h2>
            <p className="mb-3">
              In accordance with EU Directive 2011/83/EU on consumer rights, you have the right to
              withdraw from your purchase within 14 calendar days of receiving your order, without
              giving any reason.
            </p>
            <p>
              The withdrawal period expires 14 days after the day on which you, or a third party
              other than the carrier and indicated by you, acquires physical possession of the last
              good in your order. To exercise your right of withdrawal, you must inform us of your
              decision by an unambiguous statement (e.g., a letter sent by post or email).
            </p>
          </section>

          {/* 2. Conditions for Returns */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              2. Conditions for Returns
            </h2>
            <p className="mb-3">
              To be eligible for a return, the following conditions must be met:
            </p>
            <ul className="list-inside list-disc space-y-2 pl-2">
              <li>
                Items must be unused, unwashed, and in their original condition
              </li>
              <li>
                Items must be returned in their original packaging with all tags and labels attached
              </li>
              <li>
                All accessories, free gifts, and promotional items included with the purchase must be
                returned together
              </li>
              <li>
                Items should be securely packaged to prevent damage during transit
              </li>
            </ul>
            <p className="mt-3">
              We reserve the right to refuse returns that do not meet these conditions or to apply a
              restocking fee of up to 20% of the item value if items show signs of use.
            </p>
          </section>

          {/* 3. Non-Returnable Items */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              3. Non-Returnable Items
            </h2>
            <p className="mb-3">
              The following items cannot be returned or exchanged:
            </p>
            <ul className="list-inside list-disc space-y-2 pl-2">
              <li>
                Personalized or custom-made items (e.g., monogrammed linens, custom-cut fabrics)
              </li>
              <li>
                Underwear, swimwear, and intimate apparel for hygiene reasons
              </li>
              <li>
                Sale items purchased below &euro;15
              </li>
              <li>
                Gift cards and vouchers
              </li>
              <li>
                Items marked as &quot;Final Sale&quot; at the time of purchase
              </li>
            </ul>
          </section>

          {/* 4. How to Initiate a Return */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              4. How to Initiate a Return
            </h2>
            <p className="mb-4">
              Follow these steps to start your return:
            </p>
            <ol className="list-inside list-decimal space-y-4 pl-2">
              <li>
                <span className="font-medium text-text">Contact us:</span> Send an email to{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-accent hover:text-accent-hover"
                >
                  {CONTACT_EMAIL}
                </a>{' '}
                with your order number, the item(s) you wish to return, and the reason for return.
                Our team will respond within 1-2 business days.
              </li>
              <li>
                <span className="font-medium text-text">Receive your return label:</span> Once your
                return request is approved, we will send you a prepaid return shipping label via
                email. Print the label and attach it to your package.
              </li>
              <li>
                <span className="font-medium text-text">Ship your return:</span> Drop off the
                package at the nearest postal service point or schedule a pickup. Please retain the
                shipping receipt with tracking number for your records.
              </li>
              <li>
                <span className="font-medium text-text">Receive your refund:</span> Once we receive
                and inspect your return, we will process your refund. You will receive an email
                confirmation when your refund has been issued.
              </li>
            </ol>
          </section>

          {/* 5. Refund Timeline */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              5. Refund Timeline
            </h2>
            <p className="mb-3">
              Refunds are processed within 5-10 business days after we receive and inspect the
              returned item(s). The refund will be credited to your original payment method.
            </p>
            <ul className="list-inside list-disc space-y-2 pl-2">
              <li>
                <span className="font-medium text-text">Credit/debit cards:</span> Please allow
                5-10 business days for the refund to appear on your statement, depending on your card
                issuer.
              </li>
              <li>
                <span className="font-medium text-text">PayPal:</span> Refunds typically appear
                within 3-5 business days.
              </li>
              <li>
                <span className="font-medium text-text">Shipping costs:</span> Original shipping
                costs are non-refundable unless the return is due to our error (e.g., wrong item
                sent, defective product).
              </li>
            </ul>
          </section>

          {/* 6. Damaged or Defective Goods */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              6. Damaged or Defective Goods
            </h2>
            <p className="mb-3">
              If you receive a damaged, defective, or incorrect item, please notify us within 48
              hours of delivery by sending an email to{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-accent hover:text-accent-hover"
              >
                {CONTACT_EMAIL}
              </a>{' '}
              with:
            </p>
            <ul className="mb-3 list-inside list-disc space-y-2 pl-2">
              <li>Your order number</li>
              <li>Photos of the damaged or defective item</li>
              <li>A description of the issue</li>
            </ul>
            <p>
              We will arrange a free return and offer a full refund or replacement, depending on your
              preference and product availability. You will not be charged for return shipping in the
              case of damaged or defective goods.
            </p>
          </section>

          {/* 7. Exchanges */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              7. Exchanges
            </h2>
            <p className="mb-3">
              Exchanges are subject to product availability. If you would like to exchange an item
              for a different size, color, or product:
            </p>
            <ul className="list-inside list-disc space-y-2 pl-2">
              <li>
                Follow the return process outlined in Section 4 above
              </li>
              <li>
                Indicate in your email that you would like an exchange and specify the desired
                replacement item
              </li>
              <li>
                If the replacement item is a different price, we will charge or refund the difference
                accordingly
              </li>
              <li>
                If the desired item is out of stock, we will issue a full refund instead
              </li>
            </ul>
          </section>

          {/* 8. Contact */}
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-text">
              8. Contact
            </h2>
            <p className="mb-3">
              If you have any questions about our return policy or need assistance with a return,
              please do not hesitate to contact us:
            </p>
            <div className="rounded-lg border border-border bg-surface p-4">
              <p className="font-medium text-text">TextileHarmony Customer Service</p>
              <p>Keizersgracht 123, 1015 CJ Amsterdam, Netherlands</p>
              <p>
                Email:{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-accent hover:text-accent-hover"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p>Phone: +31 20 123 4567</p>
              <p>Mon - Fri: 9:00 - 18:00 CET</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </motion.div>
  );
}
