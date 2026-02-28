import type { FilterState, Product, SortOption } from '@/types';
import { SITE_CONFIG } from '@/constants';

export function formatPrice(price: number): string {
  return `${SITE_CONFIG.CURRENCY_SYMBOL}${price.toFixed(2)}`;
}

export function filterProducts(
  products: Product[],
  filters: FilterState,
): Product[] {
  return products.filter((product) => {
    // Filter by category
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    // Filter by price range
    const [minPrice, maxPrice] = filters.priceRange;
    if (product.price < minPrice || product.price > maxPrice) {
      return false;
    }

    // Filter by materials
    if (filters.materials.length > 0) {
      const productMaterials = product.materials
        .split(',')
        .map((m) => m.trim());
      const hasMatchingMaterial = filters.materials.some((filterMaterial) =>
        productMaterials.some(
          (pm) => pm.toLowerCase() === filterMaterial.toLowerCase(),
        ),
      );
      if (!hasMatchingMaterial) return false;
    }

    // Filter by colors
    if (filters.colors.length > 0) {
      if (!product.colors || product.colors.length === 0) return false;
      const hasMatchingColor = filters.colors.some((filterColor) =>
        product.colors!.some(
          (pc) => pc.name.toLowerCase() === filterColor.toLowerCase(),
        ),
      );
      if (!hasMatchingColor) return false;
    }

    // Filter by stock
    if (filters.inStockOnly && !product.inStock) {
      return false;
    }

    return true;
  });
}

export function sortProducts(
  products: Product[],
  sortBy: SortOption,
): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'newest':
      return sorted.sort((a, b) => {
        if (a.isNew === b.isNew) return a.name.localeCompare(b.name);
        return a.isNew ? -1 : 1;
      });
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
}

export function getProductsByCategory(
  products: Product[],
  categorySlug: string,
): Product[] {
  return products.filter((product) => product.category === categorySlug);
}

export function getRelatedProducts(
  products: Product[],
  currentProduct: Product,
  limit = 4,
): Product[] {
  return products
    .filter(
      (product) =>
        product.category === currentProduct.category &&
        product.id !== currentProduct.id,
    )
    .slice(0, limit);
}

export function calculateDiscount(
  originalPrice: number,
  currentPrice: number,
): number {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

export function generateBreadcrumbs(
  pathname: string,
  productName?: string,
  categoryName?: string,
): { label: string; path?: string }[] {
  const crumbs: { label: string; path?: string }[] = [
    { label: 'Home', path: '/' },
  ];
  const segments = pathname.split('/').filter(Boolean);

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const path = '/' + segments.slice(0, i + 1).join('/');

    if (segment === 'catalog') {
      if (i === segments.length - 1) {
        crumbs.push({ label: 'Catalog' });
      } else {
        crumbs.push({ label: 'Catalog', path: '/catalog' });
      }
    } else if (segment === 'product') {
      crumbs.push({ label: 'Catalog', path: '/catalog' });
      if (productName) {
        crumbs.push({ label: productName });
      }
      break;
    } else if (segment === 'cart') {
      crumbs.push({ label: 'Cart' });
    } else if (segment === 'contact') {
      crumbs.push({ label: 'Contact' });
    } else if (segment === 'privacy-policy') {
      crumbs.push({ label: 'Privacy Policy' });
    } else if (segment === 'terms-of-use') {
      crumbs.push({ label: 'Terms of Use' });
    } else if (segment === 'return-policy') {
      crumbs.push({ label: 'Return Policy' });
    } else if (i > 0 && segments[i - 1] === 'catalog') {
      // Category page under catalog
      const label = categoryName ?? segment.replace(/-/g, ' ');
      crumbs.push({ label });
    } else {
      crumbs.push({ label: segment, path });
    }
  }

  return crumbs;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
