import api from "./api";
import type { Product } from "../types/product";

// Fetch all products from API. On error, return empty array (no fallback to mock data).
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const res = await api.get("/products/");
    return res.data;
  } catch (error) {
    console.error("fetchProducts error:", error);
    return [];
  }
};

// Fetch single product from API. Throw on error so caller can handle fallback (e.g., productStore lookup).
export const fetchProduct = async (id: string): Promise<Product> => {
  const res = await api.get(`/products/${id}/`);
  return res.data;
};
