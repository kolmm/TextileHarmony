import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { pageTransition } from '@/lib/animations';
import { useCartStore } from '@/store/cartStore';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import CookieBanner from '@/components/layout/CookieBanner';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { useToast, Button } from '@/components/ui';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const promoCode = useCartStore((s) => s.promoCode);
  const discount = useCartStore((s) => s.discount);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const applyPromoCode = useCartStore((s) => s.applyPromoCode);
  const removePromoCode = useCartStore((s) => s.removePromoCode);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const shippingCost = useCartStore((s) => s.getShippingCost());
  const discountAmount = useCartStore((s) => s.getDiscountAmount());
  const total = useCartStore((s) => s.getTotal());
  const cartItemCount = useCartStore((s) => s.getItemCount());

  const { addToast } = useToast();

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Cart' },
  ];

  const handleApplyPromo = (code: string): boolean => {
    const success = applyPromoCode(code);
    if (success) {
      addToast('Promo code applied successfully!', 'success');
    } else {
      addToast('Invalid promo code. Please try again.', 'error');
    }
    return success;
  };

  const handleRemovePromo = () => {
    removePromoCode();
    addToast('Promo code removed', 'info');
  };

  const handleClearCart = () => {
    clearCart();
    addToast('Cart cleared', 'info');
  };

  const isEmpty = items.length === 0;

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex min-h-screen flex-col"
    >
      <Header cartItemCount={cartItemCount} />

      <main className="mx-auto max-w-7xl flex-1 px-4 py-8 lg:px-8">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <h1 className="mb-8 font-serif text-2xl font-semibold text-text sm:text-3xl">
          Shopping Cart
        </h1>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingBag size={64} className="mb-4 text-border" />
            <h2 className="mb-2 font-serif text-xl font-semibold text-text">
              Your cart is empty
            </h2>
            <p className="mb-6 text-sm text-secondary">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-secondary">
                  {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearCart}
                >
                  <Trash2 size={14} />
                  Clear Cart
                </Button>
              </div>

              <div className="flex flex-col gap-3">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <CartItem
                      key={item.product.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Summary sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <CartSummary
                  subtotal={subtotal}
                  shippingCost={shippingCost}
                  discount={discount}
                  discountAmount={discountAmount}
                  total={total}
                  promoCode={promoCode}
                  onApplyPromo={handleApplyPromo}
                  onRemovePromo={handleRemovePromo}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <CookieBanner />
    </motion.div>
  );
}
