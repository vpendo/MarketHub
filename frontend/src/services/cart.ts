import api from "./api";
import type { CartItem } from "../types/cart";
import { mapProductFromApi } from "./products";

type CartItemApi = {
  id: string;
  quantity: number;
  product: any;
};

const mapCartItemFromApi = (item: CartItemApi): CartItem => ({
  id: item.id,
  product: mapProductFromApi(item.product as any),
  quantity: item.quantity,
});

export const fetchCart = async (): Promise<CartItem[]> => {
  const res = await api.get<CartItemApi[]>("cart/");
  return res.data.map(mapCartItemFromApi);
};

export const addToCart = async (productId: string, quantity = 1): Promise<CartItem[]> => {
  await api.post("cart/", { product_id: productId, quantity });
  return fetchCart();
};

export const updateCartItem = async (cartItemId: string, quantity: number): Promise<CartItem[]> => {
  await api.patch(`cart/${cartItemId}/`, { quantity });
  return fetchCart();
};

export const removeCartItem = async (cartItemId: string): Promise<CartItem[]> => {
  await api.delete(`cart/${cartItemId}/`);
  return fetchCart();
};
