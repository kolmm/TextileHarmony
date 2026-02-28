import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={12}
            className={i < Math.round(rating) ? 'fill-accent text-accent' : 'text-border'}
          />
        ))}
      </div>
      <span className="text-xs text-secondary">({reviewCount})</span>
    </div>
  );
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      whileHover="hover"
      className="group relative overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} className="relative block aspect-square overflow-hidden">
        <motion.img
          variants={{ hover: { scale: 1.05 } }}
          transition={{ duration: 0.4 }}
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && <Badge variant="new">New</Badge>}
          {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
          {discount > 0 && <Badge variant="sale">-{discount}%</Badge>}
        </div>

        {/* Hover overlay */}
        <motion.div
          variants={{
            hover: { opacity: 1 },
          }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-end justify-center bg-black/10 p-4"
        >
          {onAddToCart && product.inStock && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-colors hover:bg-accent-hover cursor-pointer"
            >
              <ShoppingBag size={16} />
              Add to Cart
            </button>
          )}
          {!product.inStock && (
            <span className="rounded-lg bg-white/90 px-5 py-2.5 text-sm font-medium text-text">
              Out of Stock
            </span>
          )}
        </motion.div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-secondary">
          {product.category.replace(/-/g, ' ')}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="mb-2 text-sm font-semibold text-text transition-colors hover:text-accent">
            {product.name}
          </h3>
        </Link>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        <div className="mt-2 flex items-center gap-2">
          <span className="text-base font-bold text-accent">
            &euro;{product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-secondary line-through">
              &euro;{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
