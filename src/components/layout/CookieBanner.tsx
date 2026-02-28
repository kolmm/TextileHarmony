import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Shield } from 'lucide-react';
import type { CookieConsent } from '@/types';
import { slideInFromBottom, scaleUp, backdrop } from '@/lib/animations';

const STORAGE_KEY = 'cookie-consent';

const DEFAULT_CONSENT: CookieConsent = {
  essential: true,
  analytics: false,
  marketing: false,
  timestamp: null,
};

function getStoredConsent(): CookieConsent | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as CookieConsent;
  } catch {
    return null;
  }
}

function saveConsent(consent: CookieConsent): void {
  const stamped: CookieConsent = {
    ...consent,
    essential: true,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stamped));
}

interface ToggleProps {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

function Toggle({ label, description, checked, disabled = false, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex-1">
        <p className="text-sm font-medium text-text">{label}</p>
        <p className="text-xs text-text/60">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`${label} toggle`}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 ${
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
        } ${checked ? 'bg-accent' : 'bg-border'}`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookieConsent>(DEFAULT_CONSENT);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    setShowPreferences(false);
  }, []);

  const handleAcceptAll = useCallback(() => {
    saveConsent({ essential: true, analytics: true, marketing: true, timestamp: null });
    dismiss();
  }, [dismiss]);

  const handleRejectAll = useCallback(() => {
    saveConsent({ essential: true, analytics: false, marketing: false, timestamp: null });
    dismiss();
  }, [dismiss]);

  const handleSavePreferences = useCallback(() => {
    saveConsent(preferences);
    dismiss();
  }, [preferences, dismiss]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {/* Preferences modal */}
      {showPreferences && (
        <>
          <motion.div
            key="cookie-backdrop"
            variants={backdrop}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-[60] bg-text/40"
            onClick={() => setShowPreferences(false)}
          />
          <motion.div
            key="cookie-modal"
            variants={scaleUp}
            initial="initial"
            animate="animate"
            exit="exit"
            role="dialog"
            aria-label="Cookie preferences"
            className="fixed inset-x-4 top-1/2 z-[61] mx-auto max-w-md -translate-y-1/2 rounded-xl border border-border bg-surface p-6 shadow-xl sm:inset-x-auto"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                <h3 className="font-serif text-lg font-semibold text-text">Cookie Preferences</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                aria-label="Close preferences"
                className="rounded-lg p-1 text-text/60 transition-colors hover:bg-border hover:text-text"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mb-4 text-sm text-text/70">
              Choose which cookies you want to allow. Essential cookies are required for the site to
              function properly.
            </p>

            <div className="divide-y divide-border">
              <Toggle
                label="Essential Cookies"
                description="Required for basic site functionality. Cannot be disabled."
                checked={true}
                disabled={true}
                onChange={() => {}}
              />
              <Toggle
                label="Analytics Cookies"
                description="Help us understand how visitors interact with our site."
                checked={preferences.analytics}
                onChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, analytics: checked }))
                }
              />
              <Toggle
                label="Marketing Cookies"
                description="Used to deliver personalized advertisements."
                checked={preferences.marketing}
                onChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, marketing: checked }))
                }
              />
            </div>

            <button
              type="button"
              onClick={handleSavePreferences}
              className="mt-5 w-full rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Save Preferences
            </button>
          </motion.div>
        </>
      )}

      {/* Banner */}
      {!showPreferences && (
        <motion.div
          key="cookie-banner"
          variants={slideInFromBottom}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface p-4 shadow-lg sm:p-6"
        >
          <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Cookie className="hidden h-8 w-8 shrink-0 text-accent sm:block" />
            <div className="flex-1">
              <p className="text-sm leading-relaxed text-text/80">
                We use cookies to enhance your browsing experience, serve personalized content, and
                analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={handleRejectAll}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-border"
              >
                Reject All
              </button>
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="rounded-lg border border-accent px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white"
              >
                Manage Preferences
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
