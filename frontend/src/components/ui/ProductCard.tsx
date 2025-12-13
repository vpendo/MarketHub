import { Link } from "react-router-dom";
import { Heart, ShoppingCart, GitCompare } from "lucide-react";
import Button from "./Button";
import { useComparisonStore } from "../../store/comparisonStore";
import type { Product } from "../../types/product";

export default function ProductCard({
  product,
  onAdd,
  onWishlist,
  wished,
}: {
  product: Product;
  onAdd?: (p: Product) => void;
  onWishlist?: (p: Product) => void;
  wished?: boolean;
}) {
  const { add: addToComparison, isComparing, remove: removeFromComparison } =
    useComparisonStore();
  const comparing = isComparing(product.id);

  const handleCompare = () => {
    if (comparing) {
      removeFromComparison(product.id);
    } else {
      addToComparison(product);
    }
  };

  return (
    <article className="group border rounded-xl p-4 flex flex-col bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-all duration-300">
      <Link to={`/product/${product.id}`} className="block mb-3">
        <div className="aspect-square overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800 mb-3">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition">
          {product.name}
        </h3>
        {product.category && (
          <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded text-xs mb-2">
            {product.category}
          </span>
        )}
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
          {product.description}
        </p>
        <p className="text-xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </p>
      </Link>

      <div className="mt-auto space-y-2 pt-3 border-t">
        <div className="flex gap-2">
          <Button
            onClick={() => onAdd?.(product)}
            className="flex-1 bg-primary text-white flex items-center justify-center gap-2 hover:bg-primary-600"
            disabled={product.stock === 0}
            aria-disabled={product.stock === 0}
            aria-label={product.stock === 0 ? "Out of stock" : `Add ${product.name} to cart`}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
          <button
            onClick={() => onWishlist?.(product)}
            className={`p-2 rounded-lg border transition ${
              wished
                ? "border-primary text-primary bg-primary/10"
                : "border-slate-300 dark:border-slate-700 hover:border-primary"
            }`}
            aria-pressed={wished}
            aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          >
            <Heart className={`w-5 h-5 ${wished ? "fill-current" : ""}`} />
          </button>
        </div>
        <button
          onClick={handleCompare}
          className={`w-full px-3 py-2 rounded-lg text-sm border transition flex items-center justify-center gap-2 ${
            comparing
              ? "bg-primary text-white border-primary"
              : "border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
          aria-pressed={comparing}
          aria-label={comparing ? `Remove ${product.name} from comparison` : `Add ${product.name} to comparison`}
        >
          <GitCompare className="w-4 h-4" />
          {comparing ? "Remove from Compare" : "Compare"}
        </button>
      </div>
    </article>
  );
}
