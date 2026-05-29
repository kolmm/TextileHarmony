import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '@/types';
import { formatPrice, getProductPrice } from '@/utils';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity, selectedSize } = item;
  const unitPrice = getProductPrice(product, selectedSize);
  const lineTotal = unitPrice * quantity;

  const handleDecrement = () => {
    if (quantity > MIN_QUANTITY) {
      onUpdateQuantity(product.id, quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < MAX_QUANTITY) {
      onUpdateQuantity(product.id, quantity + 1);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100, transition: { duration: 0.25 } }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4 rounded-lg border border-border bg-white p-4 sm:flex-row sm:items-center"
    >
      {/* Thumbnail */}
      <div className="h-24 w-24 shrink-0 self-center overflow-hidden rounded-lg bg-surface sm:self-start">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Product info */}
      <div className="flex flex-1 flex-col gap-2 sm:gap-1">
        <h3 className="font-serif text-base font-semibold text-text">
          {product.name}
        </h3>

        {selectedSize && (
          <div className="flex flex-wrap gap-2 text-xs text-secondary">
            <span>Size: {selectedSize}</span>
          </div>
        )}

        <p className="text-sm font-medium text-accent">
          {formatPrice(unitPrice)}
        </p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity <= MIN_QUANTITY}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text transition-colors hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span className="flex h-8 w-10 items-center justify-center text-sm font-medium text-text">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            disabled={quantity >= MAX_QUANTITY}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text transition-colors hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Line total */}
        <p className="min-w-[5rem] text-right text-sm font-semibold text-text">
          {formatPrice(lineTotal)}
        </p>

        {/* Remove */}
        <button
          type="button"
          onClick={() => onRemove(product.id)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-red-50 hover:text-error cursor-pointer"
          aria-label={`Remove ${product.name} from cart`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
}
