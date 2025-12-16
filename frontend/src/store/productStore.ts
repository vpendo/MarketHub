import { create } from "zustand";
import type { Product } from "../types/product";

type ProductState = {
  products: Product[];
  selected: Product | null;
  setProducts: (items: Product[]) => void;
  selectProduct: (product: Product | null) => void;
};

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  selected: null,
  setProducts: (items) => set({ products: items }),
  selectProduct: (product) => set({ selected: product }),
}));
