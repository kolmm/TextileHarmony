import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { pageTransition, fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { useCartStore } from '@/store/cartStore';
import { CONTACT_INFO } from '@/constants';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import CookieBanner from '@/components/layout/CookieBanner';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Input, Textarea, Button, useToast } from '@/components/ui';
import type { ContactFormData } from '@/types';

const SUBJECT_OPTIONS = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'order', label: 'Order Support' },
  { value: 'returns', label: 'Returns & Exchanges' },
  { value: 'products', label: 'Product Information' },
  { value: 'wholesale', label: 'Wholesale Inquiry' },
  { value: 'other', label: 'Other' },
] as const;

const MAP_PLACEHOLDER_URL =
  'https://placehold.co/600x300/F0EBE3/8B6F4E?text=Map';

const INITIAL_FORM: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validateForm(data: ContactFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.subject) {
    errors.subject = 'Please select a subject';
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
}

export default function ContactPage() {
  const cartItemCount = useCartStore((s) => s.getItemCount());
  const { addToast } = useToast();

  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Contact' },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Mock submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setForm(INITIAL_FORM);
      setErrors({});
      addToast('Message sent successfully! We will get back to you soon.', 'success');
    }, 800);
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Header cartItemCount={cartItemCount} />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <h1 className="mb-8 font-serif text-2xl font-semibold text-text sm:text-3xl">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact form */}
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <h2 className="mb-6 font-serif text-lg font-semibold text-text">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              <Input
                id="contact-name"
                name="name"
                label="Name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
              />

              <Input
                id="contact-email"
                name="email"
                type="email"
                label="Email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
              />

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-subject"
                  className="text-sm font-medium text-text"
                >
                  Subject
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={`w-full appearance-none rounded-lg border bg-white px-4 py-2.5 text-text transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 ${
                    errors.subject
                      ? 'border-error focus:border-error focus:ring-error/20'
                      : 'border-border'
                  }`}
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  {SUBJECT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="text-sm text-error">{errors.subject}</p>
                )}
              </div>

              <Textarea
                id="contact-message"
                name="message"
                label="Message"
                placeholder="How can we help you?"
                rows={5}
                value={form.message}
                onChange={handleChange}
                error={errors.message}
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={isSubmitting}
                className="self-start"
              >
                Send Message
              </Button>
            </form>
          </motion.div>

          {/* Contact information */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <h2 className="mb-6 font-serif text-lg font-semibold text-text">
              Get in Touch
            </h2>

            <div className="mb-8 flex flex-col gap-6">
              <motion.div variants={staggerItem} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-accent">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text">Address</h3>
                  <p className="text-sm text-secondary">{CONTACT_INFO.address}</p>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-accent">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text">Email</h3>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-sm text-accent transition-colors hover:text-accent-hover"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-accent">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text">Phone</h3>
                  <a
                    href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                    className="text-sm text-accent transition-colors hover:text-accent-hover"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-accent">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text">Working Hours</h3>
                  <p className="text-sm text-secondary">
                    {CONTACT_INFO.workingHours.weekdays}
                  </p>
                  <p className="text-sm text-secondary">
                    {CONTACT_INFO.workingHours.weekend}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Map placeholder */}
            <div className="overflow-hidden rounded-lg border border-border">
              <img
                src={MAP_PLACEHOLDER_URL}
                alt="TextileHarmony store location map"
                className="h-auto w-full"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </motion.div>
  );
}
