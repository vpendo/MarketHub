import api from "./api";
import type { Order } from "../types/order";
import type { CartItem } from "../types/cart";

export const fetchOrders = async (): Promise<Order[]> => {
  const res = await api.get<Order[]>("/orders/");
  return res.data;
};

export const createOrder = async (items: CartItem[]): Promise<Order> => {
  const res = await api.post<Order>("/orders/", { items });
  return res.data;
};
