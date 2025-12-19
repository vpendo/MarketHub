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
  stock: p.inventory ?? 0,
});

/**
 * Frontend → Backend
 */
const mapToApi = (p: Partial<Product>): Partial<ProductApi> => {
  const payload: Partial<ProductApi> = {
    title: p.name,
    description: p.description,
    price: p.price,
    image_url: p.image,
    category: p.category,
    inventory: p.stock,
  };

  // Remove undefined fields
  Object.keys(payload).forEach(
    (key) =>
      payload[key as keyof typeof payload] === undefined &&
      delete payload[key as keyof typeof payload]
  );

  return payload;
};

/* ===================== API CALLS ===================== */

/**
 * Fetch all products (no auth required)
 */
export const fetchProducts = async (): Promise<Product[]> => {
  const res = await api.get<ProductApi[]>("/products/");
  return res.data.map(mapProductFromApi);
};

/**
 * Fetch single product by ID (no auth required)
 */
export const fetchProduct = async (id: string): Promise<Product> => {
  const res = await api.get<ProductApi>(`/products/${id}/`);
  return mapProductFromApi(res.data);
};

/**
 * Create a new product (requires admin token)
 */
export const createProduct = async (
  payload: Product,
  token?: string
): Promise<Product> => {
  const res = await api.post<ProductApi>(
    "/products/",
    mapToApi(payload),
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  );
  return mapProductFromApi(res.data);
};

/**
 * Update an existing product (requires admin token)
 */
export const updateProduct = async (
  id: string,
  payload: Partial<Product>,
  token?: string
): Promise<Product> => {
  const res = await api.patch<ProductApi>(
    `/products/${id}/`,
    mapToApi(payload),
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  );
  return mapProductFromApi(res.data);
};

/**
 * Delete a product (requires admin token)
 */
export const deleteProduct = async (id: string, token?: string): Promise<void> => {
  await api.delete(`/products/${id}/`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};
