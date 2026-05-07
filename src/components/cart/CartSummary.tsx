import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, X, Truck } from 'lucide-react';
import { Button } from '@/components/ui';
import { ROUTES, SITE_CONFIG } from '@/constants';
import { formatPrice } from '@/utils';

interface CartSummaryProps {
  subtotal: number;
  shippingCost: number;
  discount: number;
  discountAmount: number;
  total: number;
  promoCode: string | null;
  onApplyPromo: (code: string) => boolean;
  onRemovePromo: () => void;
}

export function CartSummary({
  subtotal,
  shippingCost,
  discount,
  discountAmount,
  total,
  promoCode,
  onApplyPromo,
  onRemovePromo,
}: CartSummaryProps) {
  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  const freeShippingRemaining = SITE_CONFIG.FREE_SHIPPING_THRESHOLD - subtotal;
  const qualifiesForFreeShipping = freeShippingRemaining <= 0;

  const handleApplyPromo = () => {
    const trimmed = promoInput.trim();
    if (!trimmed) {
      setPromoError('Please enter a promo code');
      return;
    }

    const success = onApplyPromo(trimmed);
    if (success) {
      setPromoInput('');
      setPromoError(null);
    } else {
      setPromoError('Invalid promo code');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleApplyPromo();
    }
  };

  const handleCheckout = () => {
    navigate(ROUTES.CHECKOUT);
  };

  return (
    <div className="rounded-lg border border-border bg-white p-6">
      <h2 className="mb-6 font-serif text-lg font-semibold text-text">
        Order Summary
      </h2>

      {/* Promo code */}
      {promoCode ? (
        <div className="mb-6 flex items-center justify-between rounded-lg bg-green-50 px-3 py-2">
          <div className="flex items-center gap-2">
            <Tag size={14} className="text-success" />
            <span className="text-sm font-medium text-success">
              {promoCode} (-{discount}%)
            </span>
          </div>
          <button
            type="button"
            onClick={onRemovePromo}
            className="rounded p-1 text-secondary transition-colors hover:text-error cursor-pointer"
            aria-label="Remove promo code"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => {
                setPromoInput(e.target.value);
                setPromoError(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Promo code"
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text placeholder:text-secondary transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleApplyPromo}
              className="shrink-0"
            >
              Apply
            </Button>
          </div>
          {promoError && (
            <p className="mt-1.5 text-xs text-error">{promoError}</p>
          )}
        </div>
      )}

      {/* Summary lines */}
      <div className="space-y-3 border-b border-border pb-4">
        <div className="flex justify-between text-sm text-text">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-sm text-success">
            <span>Discount ({discount}%)</span>
            <span>-{formatPrice(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm text-text">
          <span>Shipping</span>
          <span>
            {shippingCost === 0 ? (
              <span className="font-medium text-success">Free</span>
            ) : (
              formatPrice(shippingCost)
            )}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between py-4 text-base font-semibold text-text">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>

      {/* Free shipping notice */}
      {!qualifiesForFreeShipping && (
        <div className="mb-4 flex items-start gap-2 rounded-lg bg-surface px-3 py-2">
          <Truck size={16} className="mt-0.5 shrink-0 text-accent" />
          <p className="text-xs text-secondary">
            Add {formatPrice(freeShippingRemaining)} more for free shipping
          </p>
        </div>
      )}

      {/* Checkout */}
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}
