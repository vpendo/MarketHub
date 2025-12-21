import { useState, useEffect, useMemo } from "react";
import { Package, ShoppingBag, AlertTriangle, TrendingUp } from "lucide-react";
import { useProductStore } from "../../store/productStore";
import useFetch from "../../hooks/useFetch";
import { fetchProducts } from "../../services/products";
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
  const setProducts = useProductStore((s) => s.setProducts);

  // Fetch products and update store
  const { data: productsData = [] } = useFetch(["products"], fetchProducts, {
    onSuccess: (data) => setProducts(data),
  });

  // Fetch orders
  const { data: orders = [] } = useFetch<Order[]>(["orders"], fetchOrders);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  // Stats calculation
  const stats = {
    totalProducts: productsData.length,
    totalOrders: orders.length,
    lowStock: productsData.filter((p) => (p.stock || 0) < 10).length,
    totalRevenue: orders.reduce((sum, o) => sum + (o.total || 0), 0),
  };

  const statCards = [
    {
      icon: <Package className="w-6 h-6" />,
      label: "Total Products",
      value: stats.totalProducts,
      color: "text-blue-700 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      label: "Total Orders",
      value: stats.totalOrders,
      color: "text-green-700 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      label: "Low Stock Items",
      value: stats.lowStock,
      color: "text-orange-700 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-900/20",
      border: "border-orange-200 dark:border-orange-800",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      color: "text-purple-700 dark:text-purple-400",
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

  // Memoize chart data
  const revenueChart = useMemo(() => ({
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
  }), [orders, chartColors.revenueLine]);

  const stockChart = useMemo(() => ({
    labels: productsData.map((p) => p.name),
    datasets: [
      {
        label: "Stock Level",
        data: productsData.map((p) => p.stock || 0),
        backgroundColor: chartColors.stockBar,
      },
    ],
  }), [productsData, chartColors.stockBar]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: { labels: { color: chartColors.text } },
      title: { display: false, color: chartColors.text },
    },
    scales: {
      x: { ticks: { color: chartColors.text }, grid: { color: chartColors.grid } },
      y: { ticks: { color: chartColors.text }, grid: { color: chartColors.grid } },
    },
  }), [chartColors]);

  return (
    <div className="flex-1 p-6 sm:p-8 space-y-6 overflow-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
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
            <div className={`inline-flex p-3 rounded-lg ${stat.bg} ${stat.color} mb-3`}>
              {stat.icon}
            </div>
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

      {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/products"
            className="p-4 border-2 border-blue-400/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/20 transition text-left group"
          >
            <h3 className="font-semibold mb-1 group-hover:text-blue-600 transition">Manage Products</h3>
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
