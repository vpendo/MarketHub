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
      await refetch(); // Refresh orders after update
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert("Failed to update order status. Try again.");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  if (isLoading) return <p className="p-4">Loading orders...</p>;
  if (!orders.length) return <p className="p-4">No orders yet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">All Orders</h1>

      {orders.map((order) => {
        // Calculate total dynamically
        const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        return (
          <div
            key={order.id}
            className="border rounded-xl p-4 bg-white dark:bg-slate-900 shadow-sm"
          >
            {/* Order Header */}
            <div className="flex justify-between text-sm text-slate-500 mb-2">
              <span>Order #{order.id}</span>
              {/* Use created_at instead of placedAt */}
              <span>{new Date(order.created_at).toLocaleDateString()}</span>
            </div>

            {/* Customer Info */}
            <p className="mb-2 text-slate-600 dark:text-slate-400">
              Customer: <span className="font-semibold">{order.customer_name || "Unknown"}</span> | Email:{" "}
              <span className="font-semibold">{order.customer_email || "Unknown"}</span>
            </p>

            {/* Order Status */}
            <div className="mb-4 flex items-center gap-2">
              <span className="font-semibold">Status:</span>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value as Order["status"])}
                disabled={updatingOrderId === order.id}
                className="border px-2 py-1 rounded bg-white dark:bg-slate-800"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              {updatingOrderId === order.id && <span className="text-sm text-slate-500">Updating...</span>}
            </div>

            {/* Items */}
            <div className="space-y-2 mb-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image || "/placeholder.png"}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span>{item.product.name} × {item.quantity}</span>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
