import { create } from "zustand";
import type { CartItem } from "../types/cart";
import { useUserStore } from "./userStore";
import { fetchCart, addToCart, updateCartItem, removeCartItem } from "../services/cart";

type CartState = {
  items: CartItem[];
  setItems: (items: CartItem[]) => void;
  loadCart: () => Promise<void>;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (cartItemId: string, productId?: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number, productId?: string) => Promise<void>;
  clear: () => void;
  total: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  setItems: (items) => set({ items }),

  loadCart: async () => {
    const user = useUserStore.getState().user;
    if (!user?.token) return;
    try {
      const items = await fetchCart();
      set({ items });
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  },

  addItem: async (item) => {
    const user = useUserStore.getState().user;
    const quantity = item.quantity || 1;

    if (user?.token) {
      try {
        // ✅ Ensure API receives product_id and quantity
        await addToCart(item.product.id, quantity);
        const items = await fetchCart();
        set({ items });
      } catch (err) {
        console.error("Failed to add item to cart:", err);
      }
    } else {
      // Guest users: update local state
      set((state) => {
        const existing = state.items.find((i) => i.product.id === item.product.id);
        if (existing) {
          return {
            items: state.items.map((i) =>
              i.product.id === item.product.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          };
        }
        return { items: [...state.items, { ...item, quantity }] };
      });
    }
  },

  removeItem: async (cartItemId, productId) => {
    const user = useUserStore.getState().user;
    if (user?.token) {
      try {
        await removeCartItem(cartItemId);
        const items = await fetchCart();
        set({ items });
      } catch (err) {
        console.error("Failed to remove item from cart:", err);
      }
    } else {
      set((state) => ({
        items: state.items.filter((i) => i.product.id !== (productId || cartItemId)),
      }));
    }
  },

  updateQuantity: async (cartItemId, quantity, productId) => {
    const user = useUserStore.getState().user;
    if (user?.token) {
      try {
        await updateCartItem(cartItemId, quantity);
        const items = await fetchCart();
        set({ items });
      } catch (err) {
        console.error("Failed to update cart item quantity:", err);
      }
    } else {
      set((state) => ({
        items: state.items.map((i) =>
          i.product.id === (productId || cartItemId) ? { ...i, quantity } : i
        ),
      }));
    }
  },

  clear: () => set({ items: [] }),

  total: () =>
    get().items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    ),
}));
