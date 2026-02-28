import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { FilterState, Category } from '@/types';
import { MATERIALS_LIST, COLORS_LIST } from '@/constants';

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categories: Category[];
}

function FilterContent({ filters, onFilterChange, categories }: ProductFiltersProps) {
  const handleCategoryChange = (slug: string | null) => {
    onFilterChange({ ...filters, category: filters.category === slug ? null : slug });
  };

  const handlePriceChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...filters.priceRange];
    newRange[index] = value;
    onFilterChange({ ...filters, priceRange: newRange });
  };

  const toggleMaterial = (material: string) => {
    const materials = filters.materials.includes(material)
      ? filters.materials.filter((m) => m !== material)
      : [...filters.materials, material];
    onFilterChange({ ...filters, materials });
  };

  const toggleColor = (color: string) => {
    const colors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onFilterChange({ ...filters, colors });
  };

  const clearAll = () => {
    onFilterChange({
      category: null,
      priceRange: [0, 300],
      materials: [],
      colors: [],
      inStockOnly: false,
    });
  };

  const hasActiveFilters =
    filters.category !== null ||
    filters.materials.length > 0 ||
    filters.colors.length > 0 ||
    filters.inStockOnly ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 300;

  return (
    <div className="flex flex-col gap-6">
      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="self-start text-sm font-medium text-accent underline underline-offset-2 hover:text-accent-hover cursor-pointer"
        >
          Clear All Filters
        </button>
      )}

      {/* Categories */}
      <div>
        <h3 className="mb-3 font-serif text-sm font-semibold uppercase tracking-wider text-text">
          Categories
        </h3>
        <ul className="flex flex-col gap-1.5">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => handleCategoryChange(cat.slug)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                  filters.category === cat.slug
                    ? 'bg-accent text-white'
                    : 'text-text hover:bg-surface'
                }`}
              >
                {cat.name}
                <span className="float-right text-xs opacity-60">
                  ({cat.productCount})
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price range */}
      <div>
        <h3 className="mb-3 font-serif text-sm font-semibold uppercase tracking-wider text-text">
          Price Range
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            max={filters.priceRange[1]}
            value={filters.priceRange[0]}
            onChange={(e) => handlePriceChange(0, Number(e.target.value))}
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-accent focus:outline-none"
            placeholder="Min"
          />
          <span className="text-secondary">-</span>
          <input
            type="number"
            min={filters.priceRange[0]}
            value={filters.priceRange[1]}
            onChange={(e) => handlePriceChange(1, Number(e.target.value))}
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-accent focus:outline-none"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Materials */}
      <div>
        <h3 className="mb-3 font-serif text-sm font-semibold uppercase tracking-wider text-text">
          Materials
        </h3>
        <div className="flex flex-col gap-2">
          {MATERIALS_LIST.map((mat) => (
            <label
              key={mat}
              className="flex cursor-pointer items-center gap-2 text-sm text-text"
            >
              <input
                type="checkbox"
                checked={filters.materials.includes(mat)}
                onChange={() => toggleMaterial(mat)}
                className="h-4 w-4 rounded border-border accent-accent"
              />
              {mat}
            </label>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="mb-3 font-serif text-sm font-semibold uppercase tracking-wider text-text">
          Colors
        </h3>
        <div className="flex flex-wrap gap-2">
          {COLORS_LIST.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              title={color.name}
              className={`h-8 w-8 rounded-full border-2 transition-all cursor-pointer ${
                filters.colors.includes(color.name)
                  ? 'border-accent scale-110'
                  : 'border-border hover:border-secondary'
              }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>

      {/* In Stock */}
      <label className="flex cursor-pointer items-center gap-3">
        <div className="relative">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) =>
              onFilterChange({ ...filters, inStockOnly: e.target.checked })
            }
            className="peer sr-only"
          />
          <div className="h-5 w-9 rounded-full bg-border transition-colors peer-checked:bg-accent" />
          <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
        </div>
        <span className="text-sm font-medium text-text">In Stock Only</span>
      </label>
    </div>
  );
}

export function ProductFilters(props: ProductFiltersProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile trigger */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-2"
        >
          <SlidersHorizontal size={16} />
          Filters
        </Button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <FilterContent {...props} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 z-50 h-full w-80 overflow-y-auto bg-background p-6 shadow-xl lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-serif text-lg font-semibold text-text">Filters</h2>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="rounded-full p-2 text-text hover:bg-surface cursor-pointer"
                  aria-label="Close filters"
                >
                  <X size={20} />
                </button>
              </div>
              <FilterContent {...props} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
