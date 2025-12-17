import api from "./api";
import type { Order, OrderItem } from "../types/order";
import type { CartItem } from "../types/cart";
import { mapProductFromApi } from "./products";

// Backend API type
type OrderApi = {
  id: string;
  status: string;
  total: number | string; // backend might return string
  created_at: string;
  customer?: {
    id: string;
    name: string;
    email: string;
  };
  items: Array<{
    id: string;
    product: any;
    quantity: number;
    price: number | string; // backend might return string
  }>;
};

// Map API response to frontend Order type
const mapOrderFromApi = (order: OrderApi): Order => ({
  id: order.id,
  status: order.status as Order["status"],
  total: Number(order.total), // ensure total is a number
  created_at: order.created_at, // use backend field directly
  customer_name: order.customer?.name,
  customer_email: order.customer?.email,
  items: order.items.map<OrderItem>((item) => ({
    id: item.id, // unique order item ID
    product: mapProductFromApi(item.product),
    quantity: item.quantity,
    price: Number(item.price) || item.product.price, // ensure price is a number
  })),
});

// Fetch all orders
export const fetchOrders = async (): Promise<Order[]> => {
  const res = await api.get<OrderApi[]>("orders/");
  return res.data.map(mapOrderFromApi);
};

// Create an order from multiple cart items
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

// Create a single product order
export const placeSingleOrder = async ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}): Promise<Order> => {
  const payload = {
    items: [
      {
        product_id: productId,
        quantity,
        price: 0, // backend calculates price
      },
    ],
  };
  const res = await api.post<OrderApi>("orders/", payload);
  return mapOrderFromApi(res.data);
};

// Update order status (admin)
export const updateOrderStatus = async (
  orderId: string,
  status: Order["status"]
): Promise<Order> => {
  const res = await api.patch<OrderApi>(`orders/${orderId}/`, { status });
  return mapOrderFromApi(res.data);
};
