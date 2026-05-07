export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  materials: string;
  care: string;
  images: string[];
  sizes?: string[];
  sizePrices?: Record<string, number>;
  sizeOriginalPrices?: Record<string, number>;
  inStock: boolean;
  isNew: boolean;
  isBestseller: boolean;
  dimensions?: string;
  weight?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string | null;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface FilterState {
  category: string | null;
  priceRange: [number, number];
  inStockOnly: boolean;
}

export type SortOption =
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'
  | 'newest';
