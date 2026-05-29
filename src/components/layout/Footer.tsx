import { useState } from 'react';
import { Link } from 'react-router-dom';

const QUICK_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/catalog' },
  { label: 'New Arrivals', path: '/catalog?sort=newest' },
  { label: 'Best Sellers', path: '/catalog?filter=bestseller' },
] as const;

const CUSTOMER_SERVICE = [
  { label: 'Contact Us', path: '/contact' },
  { label: 'Return Policy', path: '/return-policy' },
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms of Use', path: '/terms-of-use' },
] as const;

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="mb-4 inline-flex items-baseline gap-0.5">
              <span className="font-serif text-xl font-semibold text-accent">Textile</span>
              <span className="text-lg font-light text-text">Harmony</span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-secondary">
              Curating beautiful home textiles and decor since 2026. Sustainable
              comfort for every room.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-serif text-sm font-semibold uppercase tracking-wider text-text">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-secondary transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-4 font-serif text-sm font-semibold uppercase tracking-wider text-text">
              Customer Service
            </h3>
            <ul className="flex flex-col gap-2.5">
              {CUSTOMER_SERVICE.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-secondary transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 font-serif text-sm font-semibold uppercase tracking-wider text-text">
              Newsletter
            </h3>
            <p className="mb-4 text-sm text-secondary">
              Subscribe for exclusive offers and new arrivals.
            </p>
            {subscribed ? (
              <p className="text-sm font-medium text-success">
                Thank you for subscribing!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full min-w-0 rounded-lg border border-border bg-white px-3 py-2 text-sm text-text placeholder:text-secondary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-4 text-xs text-secondary lg:px-8">
          <p>&copy; 2026 TextileHarmony SRL. All rights reserved. | Reg. Com.: J2026016218002</p>
        </div>
      </div>
    </footer>
  );
}
