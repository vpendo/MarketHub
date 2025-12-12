import { Package, ShoppingBag, AlertTriangle, TrendingUp } from "lucide-react";
import { useProductStore } from "../../store/productStore";
import useFetch from "../../hooks/useFetch";
import { fetchOrders } from "../../services/orders";
import type { Order } from "../../types/order";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const products = useProductStore((s) => s.products);
  const { data: orders } = useFetch<Order[]>(["orders"], fetchOrders);

  const stats = {
    totalProducts: products.length,
    totalOrders: orders?.length || 0,
    lowStock: products.filter((p) => (p.stock || 0) < 10).length,
    totalRevenue: orders?.reduce((sum, o) => sum + o.total, 0) || 0,
  };

  const statCards = [
    {
      icon: <Package className="w-6 h-6" />,
      label: "Total Products",
      value: stats.totalProducts,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      label: "Total Orders",
      value: stats.totalOrders,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      label: "Low Stock Items",
      value: stats.lowStock,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-900/20",
      border: "border-orange-200 dark:border-orange-800",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/20",
      border: "border-purple-200 dark:border-purple-800",
    },
  ];

  return (
    <div className="flex-1 p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Manage products, orders, and inventory
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <div
            key={idx}
            className={`p-6 border-2 ${stat.border} rounded-xl ${stat.bg} shadow-sm hover:shadow-md transition`}
          >
            <div className={`inline-flex p-3 rounded-lg ${stat.bg} ${stat.color} mb-3`}>
              {stat.icon}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
              {stat.label}
            </p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        {orders && orders.length > 0 ? (
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                <div>
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {new Date(order.placedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${order.total.toFixed(2)}</p>
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                        : order.status === "pending" || order.status === "paid"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                        : order.status === "cancelled"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 dark:text-slate-400 text-center py-8">
            No orders yet
          </p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/products"
            className="p-4 border-2 border-primary/20 rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10 transition text-left group"
          >
            <h3 className="font-semibold mb-1 group-hover:text-primary transition">
              Manage Products
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Add, edit, or delete products
            </p>
          </Link>
          <button className="p-4 border-2 border-secondary/20 rounded-lg hover:bg-secondary/5 dark:hover:bg-secondary/10 transition text-left group">
            <h3 className="font-semibold mb-1 group-hover:text-secondary transition">
              Manage Inventory
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Update stock levels
            </p>
          </button>
          <button className="p-4 border-2 border-accent/20 rounded-lg hover:bg-accent/5 dark:hover:bg-accent/10 transition text-left group">
            <h3 className="font-semibold mb-1 group-hover:text-accent transition">
              View Reports
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Sales and analytics
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

