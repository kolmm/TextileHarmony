import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { useCartStore } from '@/store/cartStore';
import { ROUTES } from '@/constants';

const SCROLL_AMOUNT = 320;

const bestSellers = products.filter((p) => p.isBestseller);

export function BestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((state) => state.addItem);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const offset = direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <motion.section
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-80px' }}
      className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24"
    >
      {/* Section header */}
      <div className="mb-10 flex items-end justify-between">
        <h2 className="font-serif text-3xl font-bold text-text md:text-4xl">
          Best Sellers
        </h2>
        <Link
          to={ROUTES.CATALOG}
          className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          View All
        </Link>
      </div>

      {/* Carousel wrapper */}
      <div className="relative">
        {/* Navigation arrows */}
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2.5 shadow-md transition-colors hover:bg-surface cursor-pointer lg:flex"
        >
          <ChevronLeft size={20} className="text-text" />
        </button>

        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2.5 shadow-md transition-colors hover:bg-surface cursor-pointer lg:flex"
        >
          <ChevronRight size={20} className="text-text" />
        </button>

        {/* Scrollable container -- inline scrollbar hiding for cross-browser support */}
        <div
          ref={scrollRef}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden"
        >
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="w-[280px] flex-shrink-0 snap-start"
            >
              <ProductCard
                product={product}
                onAddToCart={(p) => addItem(p)}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
