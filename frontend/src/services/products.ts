import api from "./api";
import type { Product } from "../types/product";

type ProductApi = {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url?: string;
  category?: string;
  inventory?: number;
};

/**
 * Backend → Frontend
 */
export const mapProductFromApi = (p: ProductApi): Product => ({
  id: p.id,
  name: p.title,
  description: p.description,
  price: Number(p.price),
  image: p.image_url ?? undefined,
  category: p.category ?? undefined,
  stock: p.inventory ?? 0, // ✅ prevent undefined
});

/**
 * Frontend → Backend
 */
const mapToApi = (p: Partial<Product>): Partial<ProductApi> => ({
  title: p.name,
  description: p.description,
  price: p.price,
  image_url: p.image,
  category: p.category,
  inventory: p.stock,
});

/* ===================== API CALLS ===================== */

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await api.get<ProductApi[]>("/products/");
  return res.data.map(mapProductFromApi);
};

export const fetchProduct = async (id: string): Promise<Product> => {
  const res = await api.get<ProductApi>(`/products/${id}/`);
  return mapProductFromApi(res.data);
};

export const createProduct = async (payload: Product): Promise<Product> => {
  const res = await api.post<ProductApi>("/products/", mapToApi(payload));
  return mapProductFromApi(res.data);
};

export const updateProduct = async (
  id: string,
  payload: Partial<Product>
): Promise<Product> => {
  const res = await api.patch<ProductApi>(`/products/${id}/`, mapToApi(payload));
  return mapProductFromApi(res.data);
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}/`);
};
