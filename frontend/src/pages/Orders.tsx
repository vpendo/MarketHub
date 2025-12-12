import useFetch from "../hooks/useFetch";
import { fetchOrders } from "../services/orders";
import type { Order } from "../types/order";

export default function Orders() {
  const { data, isLoading } = useFetch<Order[]>(["orders"], fetchOrders);

  if (isLoading) return <p className="p-4">Loading orders...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Your Orders</h1>
      {data?.length ? (
        data.map((order) => (
          <div
            key={order.id}
            className="border rounded p-4 bg-white dark:bg-slate-900"
          >
            <div className="flex justify-between text-sm text-slate-500">
              <span>Order #{order.id}</span>
              <span>{new Date(order.placedAt).toLocaleDateString()}</span>
            </div>
            <p className="mt-2 font-semibold">Status: {order.status}</p>
            <p className="mt-1">Total: ${order.total.toFixed(2)}</p>
          </div>
        ))
      ) : (
        <p>No orders yet.</p>
      )}
    </div>
  );
}
