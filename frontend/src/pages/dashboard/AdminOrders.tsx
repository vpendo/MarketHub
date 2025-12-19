import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import api from "../../services/api";
import type { Order } from "../../types/order";
import { fetchOrders } from "../../services/orders";

export default function AdminOrders() {
  const { data: orders = [], isLoading, refetch } = useFetch<Order[]>(["orders"], fetchOrders);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  const handleStatusChange = async (orderId: string, newStatus: Order["status"]) => {
    try {
      setUpdatingOrderId(orderId);
      await api.patch(`orders/${orderId}/`, { status: newStatus });
      await refetch();
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert("Failed to update order status. Try again.");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  if (isLoading) return <p className="p-4 text-center text-slate-500 dark:text-slate-400">Loading orders...</p>;
  if (!orders.length) return <p className="p-4 text-center text-slate-500 dark:text-slate-400">No orders yet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">All Orders</h1>

      {orders.map((order) => {
        const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        return (
          <div
            key={order.id}
            className="border rounded-2xl p-6 bg-white dark:bg-slate-900 shadow hover:shadow-lg transition"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
              <span className="font-medium">Order #{order.id}</span>
              <span>{new Date(order.created_at).toLocaleDateString()}</span>
            </div>

            {/* Customer Info */}
            <p className="mb-4 text-slate-700 dark:text-slate-300">
              Customer: <span className="font-semibold">{order.customer_name || "Unknown"}</span> | Email:{" "}
              <span className="font-semibold">{order.customer_email || "Unknown"}</span>
            </p>

            {/* Order Status */}
            <div className="mb-4 flex items-center gap-3">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Status:</span>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value as Order["status"])}
                disabled={updatingOrderId === order.id}
                className="border px-3 py-1 rounded-md bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary transition"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              {updatingOrderId === order.id && (
                <span className="text-sm text-slate-500 dark:text-slate-400">Updating...</span>
              )}
            </div>

            {/* Items */}
            <div className="space-y-3 mb-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition p-3 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image || "/placeholder.png"}
                      alt={item.product.name}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center text-lg font-bold border-t pt-3 mt-3 text-slate-900 dark:text-white">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
