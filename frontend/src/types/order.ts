export type Customer = {
  name: string;
  email: string;
};

export type OrderItem = {
  id: string;
  product: {
    id: string;
    name: string;
    image?: string;
    price: number;
  };
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  total: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  created_at: string; // use backend field directly
  items: OrderItem[];
  customer_name?: string;
  customer_email?: string;
};
