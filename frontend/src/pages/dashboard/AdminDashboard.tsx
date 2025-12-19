import { useState, useEffect } from "react";
import { Package, ShoppingBag, AlertTriangle, TrendingUp } from "lucide-react";
import { useProductStore } from "../../store/productStore";
import useFetch from "../../hooks/useFetch";
import { fetchOrders } from "../../services/orders";
import type { Order } from "../../types/order";
import { Link } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const products = useProductStore((s) => s.products);
  const { data: orders = [] } = useFetch<Order[]>(["orders"], fetchOrders);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const listener = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    lowStock: products.filter((p) => (p.stock || 0) < 10).length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
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

  // Chart Colors
  const chartColors = {
    text: isDarkMode ? "#f1f5f9" : "#1e293b",
    grid: isDarkMode ? "#334155" : "#cbd5e1",
    revenueLine: isDarkMode ? "#818cf8" : "#4f46e5",
    stockBar: isDarkMode ? "#22c55e" : "#059669",
  };

  // Chart data
  const revenueChart = {
    labels: orders.map((o) => new Date(o.created_at).toLocaleDateString()),
    datasets: [
      {
        label: "Revenue ($)",
        data: orders.map((o) => o.total),
        borderColor: chartColors.revenueLine,
        backgroundColor: chartColors.revenueLine + "55",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const stockChart = {
    labels: products.map((p) => p.name),
    datasets: [
      {
        label: "Stock Level",
        data: products.map((p) => p.stock || 0),
        backgroundColor: chartColors.stockBar,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: chartColors.text } },
      title: { color: chartColors.text },
    },
    scales: {
      x: { ticks: { color: chartColors.text }, grid: { color: chartColors.grid } },
      y: { ticks: { color: chartColors.text }, grid: { color: chartColors.grid } },
    },
  };

  return (
    <div className="flex-1 p-6 sm:p-8 space-y-6 overflow-auto">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Manage products, orders, and inventory
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <div
            key={idx}
            className={`p-6 border-2 ${stat.border} rounded-xl ${stat.bg} shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition`}
          >
            <div className={`inline-flex p-3 rounded-lg ${stat.bg} ${stat.color} mb-3`}>{stat.icon}</div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Revenue Over Time</h2>
          <Line data={revenueChart} options={chartOptions} />
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Stock Levels</h2>
          <Bar data={stockChart} options={chartOptions} />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border shadow-sm overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        {orders.length > 0 ? (
          <div className="space-y-3 min-w-[500px]">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                <div>
                  <p className="font-medium text-slate-700 dark:text-slate-200">Order #{order.id}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 text-right">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">${order.total.toFixed(2)}</p>
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
            className="p-4 border-2 border-primary/20 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition text-left group"
          >
            <h3 className="font-semibold mb-1 group-hover:text-primary transition">Manage Products</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Add, edit, or delete products</p>
          </Link>
          <Link
            to="/admin/inventory"
            className="p-4 border-2 border-green-400/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 transition text-left group"
          >
            <h3 className="font-semibold mb-1 group-hover:text-green-600 transition">Manage Inventory</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Update stock levels</p>
          </Link>
          <Link
            to="/admin/reports"
            className="p-4 border-2 border-purple-400/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/20 transition text-left group"
          >
            <h3 className="font-semibold mb-1 group-hover:text-purple-600 transition">View Reports</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Sales and analytics</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
