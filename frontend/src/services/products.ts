import api from "./api";
import { mockProducts } from "../data/mockProducts";
import type { Product } from "../types/product";

// Fetch all products - uses mock data if API fails
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const res = await api.get("/products/");
    return res.data;
  } catch (error) {
    // If API fails, return mock data
    console.log("Using mock product data");
    return mockProducts;
  }
};

// Fetch single product - uses mock data if API fails
export const fetchProduct = async (id: string): Promise<Product> => {
  try {
    const res = await api.get(`/products/${id}/`);
    return res.data;
  } catch (error) {
    // If API fails, return mock product
    console.log("Using mock product data");
    const product = mockProducts.find((p) => p.id === id);
    if (product) {
      return product;
    }
    throw new Error("Product not found");
  }
};
