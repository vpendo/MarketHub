import { useMemo } from "react";
import { useProductStore } from "../../store/productStore";
import { useCartStore } from "../../store/cartStore";
import { useWishlistStore } from "../../store/wishlistStore";
import useFetch from "../../hooks/useFetch";
import { fetchOrders } from "../../services/orders";
import type { Order } from "../../types/order";
import {
  Package,
  ShoppingCart,
  Heart,
  TrendingUp,
  DollarSign,
  BarChart3,
} from "lucide-react";

export default function Analytics() {
  const products = useProductStore((s) => s.products);
  const cartItems = useCartStore((s) => s.items);
  const wishlist = useWishlistStore((s) => s.items);
  const { data: orders } = useFetch<Order[]>(["orders"], fetchOrders);

  const stats = useMemo(() => {
    const totalRevenue =
      orders?.reduce((sum, o) => sum + o.total, 0) || 0;
    const avgOrderValue =
      orders && orders.length > 0 ? totalRevenue / orders.length : 0;
    const categoryCount = new Set(products.map((p) => p.category)).size;
    const lowStockProducts = products.filter((p) => (p.stock || 0) < 10).length;

    return {
      totalProducts: products.length,
      totalOrders: orders?.length || 0,
      totalRevenue,
      avgOrderValue,
      categoryCount,
      cartItemsCount: cartItems.length,
      wishlistCount: wishlist.length,
      lowStockProducts,
    };
  }, [products, orders, cartItems, wishlist]);

  const cards = [
    {
      icon: <Package className="w-6 h-6" />,
      label: "Total Products",
      value: stats.totalProducts,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
    },
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      label: "Total Orders",
      value: stats.totalOrders,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      label: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/20",
      border: "border-purple-200 dark:border-purple-800",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: "Avg Order Value",
      value: `$${stats.avgOrderValue.toFixed(2)}`,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-900/20",
      border: "border-orange-200 dark:border-orange-800",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      label: "Categories",
      value: stats.categoryCount,
      color: "text-pink-600 dark:text-pink-400",
      bg: "bg-pink-50 dark:bg-pink-900/20",
      border: "border-pink-200 dark:border-pink-800",
    },
    {
      icon: <Package className="w-6 h-6" />,
      label: "Low Stock Items",
      value: stats.lowStockProducts,
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
    },
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      label: "Cart Items",
      value: stats.cartItemsCount,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      border: "border-indigo-200 dark:border-indigo-800",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      label: "Wishlist Items",
      value: stats.wishlistCount,
      color: "text-yellow-600 dark:text-yellow-400",
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      border: "border-yellow-200 dark:border-yellow-800",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Track your business performance and insights
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`p-6 border-2 ${card.border} rounded-xl ${card.bg} shadow-sm hover:shadow-md transition`}
          >
            <div className={`inline-flex p-3 rounded-lg ${card.bg} ${card.color} mb-3`}>
              {card.icon}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
              {card.label}
            </p>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Recent Orders
          </h2>
          {orders && orders.length > 0 ? (
            <div className="space-y-2">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="flex justify-between text-sm border-b pb-2 hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded transition"
                >
                  <span className="text-slate-600 dark:text-slate-400">
                    Order #{order.id}
                  </span>
                  <span className="font-medium text-primary">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-8">
              No orders yet
            </p>
          )}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-secondary" />
            Top Categories
          </h2>
          <div className="space-y-2">
            {Array.from(new Set(products.map((p) => p.category)))
              .slice(0, 5)
              .map((cat) => {
                const count = products.filter((p) => p.category === cat).length;
                return (
                  <div
                    key={cat}
                    className="flex justify-between text-sm border-b pb-2 hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded transition"
                  >
                    <span className="text-slate-600 dark:text-slate-400">
                      {cat || "Uncategorized"}
                    </span>
                    <span className="font-medium text-secondary">
                      {count} products
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

