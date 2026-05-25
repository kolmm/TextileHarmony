import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CookieConsent } from '@/types';

interface CookieConsentStore {
  consent: CookieConsent;
  hasConsented: boolean;
  showBanner: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  updateConsent: (
    key: keyof Omit<CookieConsent, 'timestamp'>,
    value: boolean,
  ) => void;
  savePreferences: () => void;
  resetConsent: () => void;
}

const DEFAULT_CONSENT: CookieConsent = {
  essential: true,
  analytics: false,
  marketing: false,
  timestamp: null,
};

export const useCookieConsentStore = create<CookieConsentStore>()(
  persist(
    (set, get) => ({
      consent: { ...DEFAULT_CONSENT },
      hasConsented: false,
      showBanner: true,

      acceptAll: () => {
        set({
          consent: {
            essential: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString(),
          },
          hasConsented: true,
          showBanner: false,
        });
      },

      rejectAll: () => {
        set({
          consent: {
            essential: true,
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString(),
          },
          hasConsented: true,
          showBanner: false,
        });
      },

      updateConsent: (
        key: keyof Omit<CookieConsent, 'timestamp'>,
        value: boolean,
      ) => {
        // Essential cookies cannot be disabled
        if (key === 'essential') return;

        set((state) => ({
          consent: {
            ...state.consent,
            [key]: value,
          },
        }));
      },

      savePreferences: () => {
        const { consent } = get();
        set({
          consent: {
            ...consent,
            timestamp: new Date().toISOString(),
          },
          hasConsented: true,
          showBanner: false,
        });
      },

      resetConsent: () => {
        set({
          consent: { ...DEFAULT_CONSENT },
          hasConsented: false,
          showBanner: true,
        });
      },
    }),
    {
      name: 'textile-harmony-cookie-consent',
    },
  ),
);
