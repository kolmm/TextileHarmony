import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';

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
              Curating beautiful home textiles and decor since 2020. Sustainable
              comfort for every room.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/textileharmony"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 text-secondary transition-colors hover:bg-primary hover:text-accent"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com/textileharmony"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 text-secondary transition-colors hover:bg-primary hover:text-accent"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://pinterest.com/textileharmony"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 text-secondary transition-colors hover:bg-primary hover:text-accent"
                aria-label="Pinterest"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>
            </div>
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
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-secondary sm:flex-row lg:px-8">
          <p>&copy; 2024 TextileHarmony. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="rounded bg-white px-2 py-1 font-medium text-text/70">Visa</span>
            <span className="rounded bg-white px-2 py-1 font-medium text-text/70">Mastercard</span>
            <span className="rounded bg-white px-2 py-1 font-medium text-text/70">PayPal</span>
            <span className="rounded bg-white px-2 py-1 font-medium text-text/70">Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
