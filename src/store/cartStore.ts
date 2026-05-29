import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/types';
import { PROMO_CODES, SITE_CONFIG } from '@/constants';
import { getProductPrice } from '@/utils';

interface CartStore {
  items: CartItem[];
  promoCode: string | null;
  discount: number;
  addItem: (
    product: Product,
    quantity?: number,
    selectedSize?: string,
  ) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  getSubtotal: () => number;
  getShippingCost: () => number;
  getDiscountAmount: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      discount: 0,

      addItem: (
        product: Product,
        quantity = 1,
        selectedSize?: string,
      ) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedSize === selectedSize,
          );

          if (existingIndex !== -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity: updatedItems[existingIndex].quantity + quantity,
            };
            return { items: updatedItems };
          }

          return {
            items: [
              ...state.items,
              { product, quantity, selectedSize },
            ],
          };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item,
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], promoCode: null, discount: 0 });
      },

      applyPromoCode: (code: string): boolean => {
        const upperCode = code.toUpperCase();
        const discountPercentage = PROMO_CODES[upperCode];

        if (discountPercentage !== undefined) {
          set({ promoCode: upperCode, discount: discountPercentage });
          return true;
        }

        return false;
      },

      removePromoCode: () => {
        set({ promoCode: null, discount: 0 });
      },

      getSubtotal: (): number => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + getProductPrice(item.product, item.selectedSize) * item.quantity,
          0,
        );
      },

      getShippingCost: (): number => {
        const subtotal = get().getSubtotal();
        if (subtotal >= SITE_CONFIG.FREE_SHIPPING_THRESHOLD) {
          return 0;
        }
        return SITE_CONFIG.SHIPPING_COST;
      },

      getDiscountAmount: (): number => {
        const { discount } = get();
        if (discount === 0) return 0;
        const subtotal = get().getSubtotal();
        return subtotal * (discount / 100);
      },

      getTotal: (): number => {
        const subtotal = get().getSubtotal();
        const shipping = get().getShippingCost();
        const discountAmount = get().getDiscountAmount();
        return subtotal - discountAmount + shipping;
      },

      getItemCount: (): number => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'textile-harmony-cart',
    },
  ),
);
