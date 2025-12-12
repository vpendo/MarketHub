import api from "./api";
import type { CartItem } from "../types/cart";

export const fetchCart = async (): Promise<CartItem[]> => {
  const res = await api.get<CartItem[]>("/cart/");
  return res.data;
};

export const syncCart = async (items: CartItem[]) => {
  const res = await api.post<CartItem[]>("/cart/", { items });
  return res.data;
};
