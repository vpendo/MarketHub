import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { fetchOrders, updateOrderStatus } from "../services/orders";
import type { Order } from "../types/order";
import { useUserStore } from "../store/userStore";

export default function Orders() {
  const user = useUserStore((s) => s.user);
  const { data: orders = [], isLoading, refetch } = useFetch<Order[]>(["orders"], fetchOrders);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  if (isLoading) return <p className="p-4">Loading orders...</p>;
  if (!orders.length) return <p className="p-4">No orders yet.</p>;

  const handleStatusChange = async (orderId: string, status: Order["status"]) => {
    setUpdatingOrderId(orderId);
    try {
      await updateOrderStatus(orderId, status);
      await refetch();
    } catch (err) {
      console.error(err);
      alert("Failed to update order status.");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Orders</h1>

      {orders.map((order) => {
        const total = order.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        return (
          <div
            key={order.id}
            className="border rounded-xl p-4 bg-white dark:bg-slate-900 shadow-sm"
          >
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between mb-2 text-sm text-slate-500">
              <div>
                <span>Order #{order.id}</span>
                {user?.role === "admin" && order.customer_name && (
                  <span className="ml-4">
                    Customer: {order.customer_name} ({order.customer_email})
                  </span>
                )}
              </div>
              <span>{new Date(order.created_at).toLocaleDateString()}</span>
            </div>

            {/* Order Status */}
            <div className="mb-2 font-semibold flex items-center gap-2">
              <span>Status:</span>
              {user?.role === "admin" ? (
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value as Order["status"])}
                  disabled={updatingOrderId === order.id}
                  className="border px-2 py-1 rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              ) : (
                <span
                  className={`capitalize ${
                    order.status === "pending"
                      ? "text-orange-600"
                      : order.status === "paid"
                      ? "text-green-600"
                      : order.status === "shipped"
                      ? "text-blue-600"
                      : order.status === "delivered"
                      ? "text-teal-600"
                      : "text-red-600"
                  }`}
                >
                  {order.status}
                </span>
              )}
            </div>

            {/* Items */}
            <div className="space-y-2 mb-2">
              {order.items.map((item) => (
                <div
                  key={item.id} // use OrderItem.id
                  className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image || "/placeholder.png"}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span>
                      {item.product.name} × {item.quantity}
                    </span>
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
