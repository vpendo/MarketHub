import api from "./api";
import type { Order } from "../types/order";
import type { CartItem } from "../types/cart";
import { mapProductFromApi } from "./products";

type OrderApi = {
  id: string;
  status: string;
  total: number;
  created_at: string;
  items: Array<{
    id: string;
    product: any;
    quantity: number;
    price: number;
  }>;
};

const mapOrderFromApi = (order: OrderApi): Order => ({
  id: order.id,
  status: order.status as Order["status"],
  total: Number(order.total),
  placedAt: order.created_at,
  items: order.items.map((item) => ({
    product: mapProductFromApi(item.product),
    quantity: item.quantity,
  })),
});

export const fetchOrders = async (): Promise<Order[]> => {
  const res = await api.get<OrderApi[]>("orders/");
  return res.data.map(mapOrderFromApi);
};

export const createOrder = async (items: CartItem[]): Promise<Order> => {
  const payload = {
    items: items.map((item) => ({
      product_id: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
    })),
  };
  const res = await api.post<OrderApi>("orders/", payload);
  return mapOrderFromApi(res.data);
};
