import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { useCartStore } from '@/store/cartStore';
import { ROUTES } from '@/constants';

const MAX_NEW_ARRIVALS = 8;

const newArrivals = products.filter((p) => p.isNew).slice(0, MAX_NEW_ARRIVALS);

export function NewArrivals() {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
      {/* Section header */}
      <div className="mb-10 flex items-end justify-between">
        <h2 className="font-serif text-3xl font-bold text-text md:text-4xl">
          New Arrivals
        </h2>
        <Link
          to={ROUTES.CATALOG}
          className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          Shop All New
        </Link>
      </div>

      {/* Product grid */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6"
      >
        {newArrivals.map((product) => (
          <motion.div key={product.id} variants={staggerItem}>
            <ProductCard
              product={product}
              onAddToCart={(p) => addItem(p)}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
