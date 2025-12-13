import { create } from "zustand";
import type { Product } from "../types/product";

type ProductState = {
  products: Product[];
  selected: Product | null;
  setProducts: (items: Product[]) => void;
  selectProduct: (product: Product | null) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
};

// Start with an empty list. Products should be added via admin UI or loaded from API.
export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  selected: null,
  setProducts: (items) => set({ products: items }),
  selectProduct: (product) => set({ selected: product }),
  addProduct: (product) => set({ products: [...get().products, product] }),
  updateProduct: (product) =>
    set({
      products: get().products.map((p) => (p.id === product.id ? product : p)),
    }),
  removeProduct: (id) => set({ products: get().products.filter((p) => p.id !== id) }),
}));
