import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import { fetchProduct } from "../services/products";
import useFetch from "../hooks/useFetch";
import { useProductStore } from "../store/productStore";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { useComparisonStore } from "../store/comparisonStore";
import Button from "../components/ui/Button";

export default function Product() {
  const { id } = useParams();
  const addItem = useCartStore((s) => s.addItem);
  const { toggle: toggleWishlist, items: wishlistItems } = useWishlistStore();
  const { add: addToComparison, isComparing, remove: removeFromComparison } =
    useComparisonStore();

  const productFromStore = useProductStore((s) =>
    s.products.find((p) => p.id === id)
  );

  const { data, isLoading } = useFetch(
    ["product", id],
    () => fetchProduct(id || ""),
    { enabled: Boolean(id) && !productFromStore }
  );

  const product = productFromStore || data;

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  if (!product)
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          Product not found
        </p>
        <Link
          to="/catalog"
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition"
        >
          Back to Catalog
        </Link>
      </div>
    );

  const wished = wishlistItems.some((w) => w.id === product.id);
  const comparing = isComparing(product.id);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <Link
        to="/catalog"
        className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm">
        {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            {product.category && (
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-2">
                {product.category}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{product.name}</h1>
            <p className="text-3xl font-bold text-primary mb-4">
              ${product.price.toFixed(2)}
            </p>
            {product.stock !== undefined && (
              <p
                className={`text-sm font-medium ${
                  product.stock > 10
                    ? "text-green-600 dark:text-green-400"
                    : product.stock > 0
                    ? "text-orange-600 dark:text-orange-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {product.stock > 10
                  ? "In Stock"
                  : product.stock > 0
                  ? `Only ${product.stock} left`
                  : "Out of Stock"}
              </p>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {product.description || "No description available."}
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex gap-3">
                  <Button
                    onClick={() => addItem({ product: product, quantity: 1 })}
                    className="flex-1 bg-primary text-white flex items-center justify-center gap-2"
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </Button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-lg border transition ${
                  wished
                    ? "border-primary text-primary bg-primary/10"
                    : "border-slate-300 dark:border-slate-700"
                }`}
                aria-pressed={wished}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-5 h-5 ${wished ? "fill-current" : ""}`} />
              </button>
            </div>
            <button
              onClick={() =>
                comparing ? removeFromComparison(product.id) : addToComparison(product)
              }
              className={`w-full px-4 py-3 rounded-lg border transition ${
                comparing
                  ? "bg-primary text-white border-primary"
                  : "border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {comparing ? "Remove from Comparison" : "Add to Comparison"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
