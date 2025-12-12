import { useComparisonStore } from "../store/comparisonStore";
import { Link } from "react-router-dom";
import type { Product } from "../types/product";

export default function Comparison() {
  const { items, remove, clear } = useComparisonStore();

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-semibold mb-4">Product Comparison</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          No products selected for comparison.
        </p>
        <Link
          to="/catalog"
          className="inline-block px-4 py-2 rounded bg-primary text-white hover:bg-primary-600"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const attributes = [
    "name",
    "price",
    "category",
    "description",
    "stock",
  ] as (keyof Product)[];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Product Comparison</h1>
        <button
          onClick={clear}
          className="px-3 py-1 text-sm rounded border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          Clear All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900">
          <thead>
            <tr>
              <th className="border border-slate-300 dark:border-slate-700 p-2 text-left">
                Attribute
              </th>
              {items.map((product) => (
                <th
                  key={product.id}
                  className="border border-slate-300 dark:border-slate-700 p-2 relative"
                >
                  <button
                    onClick={() => remove(product.id)}
                    className="absolute top-1 right-1 text-xs text-red-600 hover:underline"
                    aria-label={`Remove ${product.name}`}
                  >
                    ×
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="block hover:underline"
                  >
                    {product.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attributes.map((attr) => (
              <tr key={attr}>
                <td className="border border-slate-300 dark:border-slate-700 p-2 font-medium capitalize">
                  {attr}
                </td>
                {items.map((product) => (
                  <td
                    key={product.id}
                    className="border border-slate-300 dark:border-slate-700 p-2"
                  >
                    {attr === "price"
                      ? `$${product[attr]?.toFixed(2) || "0.00"}`
                      : String(product[attr] || "—")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

