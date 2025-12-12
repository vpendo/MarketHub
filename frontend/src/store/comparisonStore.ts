import { create } from "zustand";
import type { Product } from "../types/product";

type ComparisonState = {
  items: Product[];
  add: (product: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
  isComparing: (id: string) => boolean;
};

export const useComparisonStore = create<ComparisonState>((set, get) => ({
  items: [],
  add: (product) =>
    set((s) => {
      if (s.items.length >= 3) return s; // Max 3 products
      if (s.items.some((p) => p.id === product.id)) return s;
      return { items: [...s.items, product] };
    }),
  remove: (id) =>
    set((s) => ({ items: s.items.filter((p) => p.id !== id) })),
  clear: () => set({ items: [] }),
  isComparing: (id) => get().items.some((p) => p.id === id),
}));

