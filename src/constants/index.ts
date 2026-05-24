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
} as const;

export const SITE_CONFIG = {
  NAME: 'TextileHarmony',
  TAGLINE: 'Home Textiles & Decor',
  CURRENCY: 'EUR',
  CURRENCY_SYMBOL: '\u20AC',
  FREE_SHIPPING_THRESHOLD: 75,
  SHIPPING_COST: 5.95,
  RETURN_DAYS: 14,
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
  { value: 'rating', label: 'Highest Rated' },
] as const;

export const MATERIALS_LIST = [
  'Cotton',
  'Linen',
  'Silk',
  'Wool',
  'Polyester',
  'Velvet',
  'Jute',
  'Bamboo',
  'Ceramic',
  'Glass',
  'Rattan',
  'Wood',
] as const;

export const COLORS_LIST = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Ivory', hex: '#FFFFF0' },
  { name: 'Beige', hex: '#E3DAC9' },
  { name: 'Sand', hex: '#C2B280' },
  { name: 'Taupe', hex: '#CAB9A9' },
  { name: 'Grey', hex: '#9E9E9E' },
  { name: 'Charcoal', hex: '#4A4A4A' },
  { name: 'Sage', hex: '#87A68F' },
  { name: 'Terracotta', hex: '#C45B4A' },
  { name: 'Navy', hex: '#2C3E50' },
  { name: 'Blush', hex: '#E8C4B8' },
  { name: 'Mocha', hex: '#8B6F4E' },
] as const;

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/textileharmony',
  facebook: 'https://facebook.com/textileharmony',
  pinterest: 'https://pinterest.com/textileharmony',
  twitter: 'https://twitter.com/textileharmony',
} as const;

export const CONTACT_INFO = {
  email: 'hello@textileharmony.eu',
  phone: '+31 20 123 4567',
  address: 'Keizersgracht 123, 1015 CJ Amsterdam, Netherlands',
  workingHours: {
    weekdays: 'Mon - Fri: 9:00 - 18:00',
    weekend: 'Sat: 10:00 - 16:00, Sun: Closed',
  },
} as const;
