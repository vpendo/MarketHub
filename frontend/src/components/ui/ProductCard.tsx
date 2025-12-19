import { ShoppingCart, Heart, Package } from "lucide-react";
import Button from "./Button";
import type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
  onWishlist: (product: Product) => void;
  onOrder?: (product: Product) => void; // optional order handler
  onCompare?: () => void;              // ✅ add onCompare
  wished?: boolean;
  comparing?: boolean;                  // ✅ add comparing
}

export default function ProductCard({
  product,
  onAdd,
  onWishlist,
  onOrder,
  onCompare,
  wished = false,
  comparing = false,
}: ProductCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-4 flex flex-col">
      {/* Product Image */}
      <div className="aspect-square overflow-hidden rounded-lg mb-4 bg-slate-100 dark:bg-slate-800">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        {/* Product Info */}
        <div className="space-y-1">
          {product.category && (
            <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
              {product.category}
            </span>
          )}
          <h3 className="text-lg font-medium">{product.name}</h3>
          <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 space-y-2">
          <Button
            onClick={() => onAdd(product)}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </Button>

          {onOrder && (
            <Button
              onClick={() => onOrder(product)}
              className="w-full flex items-center justify-center gap-2 border border-primary text-primary hover:bg-primary/10"
              disabled={product.stock === 0}
            >
              <Package className="w-4 h-4" /> Order Now
            </Button>
          )}

          <button
            onClick={() => onWishlist(product)}
            className={`w-full p-2 rounded-lg border text-center transition ${
              wished ? "border-primary text-primary bg-primary/10" : "border-slate-300 dark:border-slate-700"
            }`}
          >
            <Heart className={`w-4 h-4 ${wished ? "fill-current" : ""}`} />
          </button>

          {onCompare && (
            <button
              onClick={onCompare}
              className={`w-full p-2 rounded-lg border text-center transition ${
                comparing ? "bg-primary text-white border-primary" : "border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {comparing ? "Remove Compare" : "Compare"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
