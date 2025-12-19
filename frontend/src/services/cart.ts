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
  try {
    const res = await api.get<CartItemApi[]>("cart/");
    return res.data.map(mapCartItemFromApi);
  } catch (err) {
    console.error("Failed to fetch cart:", err);
    return [];
  }
};

export const addToCart = async (productId: string, quantity = 1): Promise<CartItem[]> => {
  try {
    // ✅ Ensure we only send product_id and quantity
    await api.post("cart/", { product_id: productId, quantity });
    return fetchCart();
  } catch (err: any) {
    console.error("Failed to add to cart:", err.response?.data || err.message);
    throw err;
  }
};

export const updateCartItem = async (cartItemId: string, quantity: number): Promise<CartItem[]> => {
  try {
    await api.patch(`cart/${cartItemId}/`, { quantity });
    return fetchCart();
  } catch (err: any) {
    console.error("Failed to update cart item:", err.response?.data || err.message);
    throw err;
  }
};

export const removeCartItem = async (cartItemId: string): Promise<CartItem[]> => {
  try {
    await api.delete(`cart/${cartItemId}/`);
    return fetchCart();
  } catch (err: any) {
    console.error("Failed to remove cart item:", err.response?.data || err.message);
    throw err;
  }
};
