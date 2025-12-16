import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { useCartStore } from "../store/cartStore";
import { useUserStore } from "../store/userStore";

export default function Cart() {
  const { items, removeItem, updateQuantity, total, loadCart } = useCartStore();
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    if (user?.token) {
      loadCart();
    }
  }, [user?.token, loadCart]);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-xl border">
          <ShoppingCart className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
            Your cart is empty
          </p>
          <Link
            to="/catalog"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-600 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex flex-col sm:flex-row gap-4 p-4 border rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={item.product.image || "/placeholder.png"}
                  alt={item.product.name}
                  className="w-full sm:w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{item.product.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                    {item.product.description}
                  </p>
                  <p className="text-lg font-bold text-primary">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 border rounded-lg">
                    <button
                      onClick={() =>
                        updateQuantity(item.id || item.product.id, Math.max(1, item.quantity - 1), item.product.id)
                      }
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-l-lg"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id || item.product.id, item.quantity + 1, item.product.id)
                      }
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-r-lg"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id || item.product.id, item.product.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 p-6 border rounded-xl bg-white dark:bg-slate-900 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span>${total().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total().toFixed(2)}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="block w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-600 transition text-center"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/catalog"
                className="block w-full mt-3 px-6 py-3 border border-slate-300 dark:border-slate-700 rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
