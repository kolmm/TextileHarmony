import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PackageOpen } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import CookieBanner from '@/components/layout/CookieBanner';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductFilters } from '@/components/product/ProductFilters';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Select } from '@/components/ui';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { filterProducts, sortProducts, generateBreadcrumbs } from '@/utils';
import { SORT_OPTIONS } from '@/constants';
import { useCartStore } from '@/store/cartStore';
import { pageTransition, staggerContainer, staggerItem } from '@/lib/animations';
import type { FilterState, SortOption } from '@/types';

const DEFAULT_FILTERS: FilterState = {
  category: null,
  priceRange: [0, 300],
  inStockOnly: false,
};

export default function CatalogPage() {
  const { category } = useParams<{ category?: string }>();
  const { addItem, getItemCount } = useCartStore();
  const cartItemCount = getItemCount();

  const initialFilters: FilterState = {
    ...DEFAULT_FILTERS,
    category: category ?? null,
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sortOption, setSortOption] = useState<SortOption>('newest');

  const filteredAndSorted = useMemo(() => {
    const filtered = filterProducts(products, filters);
    return sortProducts(filtered, sortOption);
  }, [filters, sortOption]);

  const activeCategory = categories.find((c) => c.slug === filters.category);

  const breadcrumbItems = generateBreadcrumbs(
    category ? `/catalog/${category}` : '/catalog',
    undefined,
    activeCategory?.name,
  );

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SortOption);
  };

  const handleAddToCart = (product: (typeof products)[number]) => {
    addItem(product);
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex min-h-screen flex-col bg-background"
    >
      <Header cartItemCount={cartItemCount} />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Page title and sort */}
          <div className="mt-6 mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-serif text-2xl font-semibold text-text lg:text-3xl">
                {activeCategory ? activeCategory.name : 'All Products'}
              </h1>
              <p className="mt-1 text-sm text-secondary">
                Showing {filteredAndSorted.length}{' '}
                {filteredAndSorted.length === 1 ? 'product' : 'products'}
              </p>
            </div>

            <div className="w-full sm:w-52">
              <Select
                options={SORT_OPTIONS.map((opt) => ({
                  value: opt.value,
                  label: opt.label,
                }))}
                value={sortOption}
                onChange={handleSortChange}
                aria-label="Sort products"
              />
            </div>
          </div>

          {/* Filters + Product grid */}
          <div className="flex gap-8">
            {/* Sidebar filters */}
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              categories={categories}
            />

            {/* Product grid */}
            <div className="flex-1">
              {/* Mobile filter trigger is inside ProductFilters */}
              <AnimatePresence mode="wait">
                {filteredAndSorted.length > 0 ? (
                  <motion.div
                    key={`grid-${sortOption}-${JSON.stringify(filters)}`}
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
                  >
                    {filteredAndSorted.map((product) => (
                      <motion.div key={product.id} variants={staggerItem}>
                        <ProductCard
                          product={product}
                          onAddToCart={handleAddToCart}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty-state"
                    variants={pageTransition}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <PackageOpen
                      size={64}
                      className="mb-4 text-border"
                      strokeWidth={1.5}
                    />
                    <h2 className="mb-2 font-serif text-xl font-semibold text-text">
                      No products found
                    </h2>
                    <p className="max-w-sm text-sm text-secondary">
                      Try adjusting your filters or clearing them to see all
                      available products.
                    </p>
                    <button
                      onClick={() => setFilters(DEFAULT_FILTERS)}
                      className="mt-6 rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover cursor-pointer"
                    >
                      Clear All Filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </motion.div>
  );
}
