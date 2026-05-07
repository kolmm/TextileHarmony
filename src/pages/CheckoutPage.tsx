import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageTransition, fadeInUp } from '@/lib/animations';
import { useCartStore } from '@/store/cartStore';
import { ROUTES } from '@/constants';
import { formatPrice } from '@/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import CookieBanner from '@/components/layout/CookieBanner';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Input, Button, Modal } from '@/components/ui';
import type { CheckoutFormData } from '@/types';

const COUNTRY_OPTIONS = [
  { value: 'EE', label: 'Estonia' },
  { value: 'LV', label: 'Latvia' },
  { value: 'LT', label: 'Lithuania' },
  { value: 'FI', label: 'Finland' },
  { value: 'DE', label: 'Germany' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'FR', label: 'France' },
  { value: 'IT', label: 'Italy' },
  { value: 'ES', label: 'Spain' },
  { value: 'PL', label: 'Poland' },
  { value: 'SE', label: 'Sweden' },
  { value: 'RO', label: 'Romania' },
] as const;

const INITIAL_FORM: CheckoutFormData = {
  name: '',
  email: '',
  phone: '',
  street: '',
  city: '',
  postalCode: '',
  country: '',
};

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

function validateCheckoutForm(data: CheckoutFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required';
  }

  if (!data.street.trim()) {
    errors.street = 'Street address is required';
  }

  if (!data.city.trim()) {
    errors.city = 'City is required';
  }

  if (!data.postalCode.trim()) {
    errors.postalCode = 'Postal code is required';
  }

  if (!data.country) {
    errors.country = 'Please select a country';
  }

  return errors;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const cartItemCount = useCartStore((s) => s.getItemCount());
  const subtotal = useCartStore((s) => s.getSubtotal());
  const shippingCost = useCartStore((s) => s.getShippingCost());
  const discount = useCartStore((s) => s.discount);
  const discountAmount = useCartStore((s) => s.getDiscountAmount());
  const total = useCartStore((s) => s.getTotal());
  const clearCart = useCartStore((s) => s.clearCart);

  const [form, setForm] = useState<CheckoutFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (items.length === 0 && !showSuccess) {
      navigate(ROUTES.CART);
    }
  }, [items.length, showSuccess, navigate]);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Cart', path: '/cart' },
    { label: 'Checkout' },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateCheckoutForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 800);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    clearCart();
    navigate(ROUTES.HOME);
  };

  if (items.length === 0 && !showSuccess) {
    return null;
  }

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex min-h-screen flex-col"
    >
      <Header cartItemCount={cartItemCount} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 lg:px-8">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <h1 className="mb-8 font-serif text-2xl font-semibold text-text sm:text-3xl">
          Checkout
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Checkout form */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
              {/* Contact information */}
              <div>
                <h2 className="mb-4 font-serif text-lg font-semibold text-text">
                  Contact Information
                </h2>
                <div className="flex flex-col gap-4">
                  <Input
                    id="checkout-name"
                    name="name"
                    label="Full Name"
                    placeholder="Mari Tamm"
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                      id="checkout-email"
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      error={errors.email}
                    />
                    <Input
                      id="checkout-phone"
                      name="phone"
                      type="tel"
                      label="Phone"
                      placeholder="+372 5XXX XXXX"
                      value={form.phone}
                      onChange={handleChange}
                      error={errors.phone}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping address */}
              <div>
                <h2 className="mb-4 font-serif text-lg font-semibold text-text">
                  Shipping Address
                </h2>
                <div className="flex flex-col gap-4">
                  <Input
                    id="checkout-street"
                    name="street"
                    label="Street Address"
                    placeholder="Narva mnt 25-12"
                    value={form.street}
                    onChange={handleChange}
                    error={errors.street}
                  />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                      id="checkout-city"
                      name="city"
                      label="City"
                      placeholder="Tallinn"
                      value={form.city}
                      onChange={handleChange}
                      error={errors.city}
                    />
                    <Input
                      id="checkout-postal"
                      name="postalCode"
                      label="Postal Code"
                      placeholder="10120"
                      value={form.postalCode}
                      onChange={handleChange}
                      error={errors.postalCode}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="checkout-country"
                      className="text-sm font-medium text-text"
                    >
                      Country
                    </label>
                    <select
                      id="checkout-country"
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className={`w-full appearance-none rounded-lg border bg-white px-4 py-2.5 text-text transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 ${
                        errors.country
                          ? 'border-error focus:border-error focus:ring-error/20'
                          : 'border-border'
                      }`}
                    >
                      <option value="" disabled>
                        Select a country
                      </option>
                      {COUNTRY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.country && (
                      <p className="text-sm text-error">{errors.country}</p>
                    )}
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isSubmitting}
                className="w-full sm:w-auto sm:self-start"
              >
                Place Order
              </Button>
            </form>
          </motion.div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border border-border bg-white p-6">
              <h2 className="mb-4 font-serif text-lg font-semibold text-text">
                Order Summary
              </h2>

              <div className="mb-4 flex flex-col gap-3">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize ?? ''}`}
                    className="flex items-center gap-3"
                  >
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-surface">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-text">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-secondary">
                        Qty: {item.quantity}
                        {item.selectedSize ? ` / ${item.selectedSize}` : ''}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-medium text-text">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <div className="flex justify-between text-sm text-text">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm text-success">
                    <span>Discount ({discount}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm text-text">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="font-medium text-success">Free</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>
              </div>

              <div className="flex justify-between border-t border-border pt-4 mt-4 text-base font-semibold text-text">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CookieBanner />

      {/* Success modal */}
      <Modal isOpen={showSuccess} onClose={handleSuccessClose} title="Order Confirmed">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <svg
              className="h-8 w-8 text-success"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="mb-2 text-lg font-semibold text-text">
            Thank you for your order!
          </p>
          <p className="mb-6 text-sm text-secondary">
            We will contact you shortly to confirm the details.
          </p>
          <Button variant="primary" size="md" onClick={handleSuccessClose}>
            Back to Home
          </Button>
        </div>
      </Modal>
    </motion.div>
  );
}
