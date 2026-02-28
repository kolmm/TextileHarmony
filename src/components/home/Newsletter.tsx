import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <motion.section
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-80px' }}
      className="bg-accent"
    >
      <div className="mx-auto max-w-3xl px-4 py-16 text-center lg:py-20">
        <h2 className="mb-3 font-serif text-3xl font-bold text-white md:text-4xl">
          Stay in the Loop
        </h2>
        <p className="mb-8 text-base leading-relaxed text-white/80">
          Subscribe to our newsletter for exclusive offers, new arrivals, and
          home styling tips.
        </p>

        {subscribed ? (
          <p className="text-lg font-medium text-white">
            Thank you for subscribing!
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-white px-6 py-3 text-sm font-medium text-accent transition-colors hover:bg-white/90 cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </motion.section>
  );
}
