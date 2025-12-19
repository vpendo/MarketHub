// Wishlist.tsx
import { useNavigate, Link } from "react-router-dom";
import { useWishlistStore } from "../store/wishlistStore";
import { ShoppingCart, Trash2 } from "lucide-react";
import Button from "../components/ui/Button";

export default function Wishlist() {
  const wishlistItems = useWishlistStore((s) => s.items);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const navigate = useNavigate();

  const addToCart = (product: any) => {
    // Navigate to product page for ordering, or implement cart logic here
    navigate(`/catalog`);
  };

  if (!wishlistItems.length) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Wishlist is empty</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Browse products and add your favorites to your wishlist.
        </p>
        <Link
          to="/catalog"
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition"
        >
          Go to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-4 flex flex-col"
          >
            <div className="aspect-square overflow-hidden rounded-lg mb-4 bg-slate-100 dark:bg-slate-800">
              <img
                src={product.image || "/placeholder.png"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                {product.category && (
                  <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                    {product.category}
                  </span>
                )}
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  onClick={() => addToCart(product)}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-white"
                >
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </Button>
                <Button
                  onClick={() => toggleWishlist(product)}
                  className="flex-1 flex items-center justify-center gap-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <Trash2 className="w-4 h-4" /> Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
