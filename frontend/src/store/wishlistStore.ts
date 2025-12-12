import { create } from "zustand";
import type { Product } from "../types/product";

type WishlistState = {
  items: Product[];
  toggle: (product: Product) => void;
};

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  toggle: (product) => {
    const exists = get().items.some((p) => p.id === product.id);
    set((state) => ({
      items: exists
        ? state.items.filter((p) => p.id !== product.id)
        : [...state.items, product],
    }));
  },
}));

