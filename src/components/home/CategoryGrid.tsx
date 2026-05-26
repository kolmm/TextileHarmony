import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, imageHover } from '@/lib/animations';
import { categories } from '@/data/categories';

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center font-serif text-3xl font-bold text-text md:text-4xl"
      >
        Shop by Category
      </motion.h2>

      {/* Bento grid: first row = 2 large cards (each span 3 of 6 cols on lg, or span 2 of 3 cols for the first one) */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6"
      >
        {categories.map((category, index) => {
          // First 2 categories get large cards spanning 3 cols each (filling row of 6)
          // Remaining 5 categories get normal cards spanning 2 cols each
          const isLarge = index < 2;
          const colSpanClass = isLarge
            ? 'lg:col-span-3'
            : 'lg:col-span-2';

          return (
            <motion.div
              key={category.id}
              variants={staggerItem}
              className={colSpanClass}
            >
              <Link
                to={`/catalog/${category.slug}`}
                className={`group relative block overflow-hidden rounded-xl ${
                  isLarge ? 'h-64 sm:h-80 lg:h-96' : 'h-64 sm:h-72'
                }`}
              >
                {/* Category image */}
                <motion.img
                  whileHover={imageHover}
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-colors group-hover:from-black/70" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="mb-1 font-serif text-xl font-semibold text-white">
                    {category.name}
                  </h3>
                  <p className="max-h-0 overflow-hidden text-sm text-white/80 transition-all duration-300 group-hover:max-h-12">
                    {category.description}
                  </p>
                  <span className="mt-2 inline-block text-xs font-medium uppercase tracking-wider text-white/60">
                    {category.productCount} products
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
