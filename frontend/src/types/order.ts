import type { CartItem } from "./cart";

export type Order = {
  id: string;
  total: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  placedAt: string;
  items: CartItem[];
};
