export const ROUTES = {
  HOME: '/',
  CATALOG: '/catalog',
  CATALOG_CATEGORY: '/catalog/:category',
  PRODUCT: '/product/:id',
  CART: '/cart',
  CONTACT: '/contact',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_USE: '/terms-of-use',
  RETURN_POLICY: '/return-policy',
  CHECKOUT: '/checkout',
} as const;

export const SITE_CONFIG = {
  NAME: 'TextileHarmony SRL',
  TAGLINE: 'Home Textiles & Decor',
  CURRENCY: 'EUR',
  CURRENCY_SYMBOL: '\u20AC',
  FREE_SHIPPING_THRESHOLD: 75,
  SHIPPING_COST: 5.95,
  RETURN_DAYS: 14,
  REG_COM: 'J2026016218002',
} as const;

export const PROMO_CODES: Record<string, number> = {
  WELCOME10: 10,
  TEXTILE20: 20,
  HARMONY15: 15,
};

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
] as const;

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/textileharmony',
  facebook: 'https://facebook.com/textileharmony',
  pinterest: 'https://pinterest.com/textileharmony',
  twitter: 'https://twitter.com/textileharmony',
} as const;

export const CONTACT_INFO = {
  email: 'business@textile-harmony.com',
  phone: '+40 731 125 720',
  workingHours: {
    weekdays: 'Mon - Fri: 9:00 - 18:00',
    weekend: 'Sat: 10:00 - 16:00, Sun: Closed',
  },
} as const;
