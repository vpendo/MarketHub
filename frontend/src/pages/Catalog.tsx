import { useMemo, useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { Search, Filter } from "lucide-react";
import ProductCard from "../components/ui/ProductCard";
import { fetchProducts } from "../services/products";
import { useCartStore } from "../store/cartStore";
import useFetch from "../hooks/useFetch";
import { useProductStore } from "../store/productStore";
import { useWishlistStore } from "../store/wishlistStore";
import { filterProducts } from "../utils/filterProducts";
import type { Product } from "../types/product";

export default function Catalog() {
  const addItem = useCartStore((s) => s.addItem);
  const setProducts = useProductStore((s) => s.setProducts);
  const wishlist = useWishlistStore((s) => s.items);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const { data, isLoading } = useFetch<Product[]>(["products"], fetchProducts, {
    onSuccess: setProducts,
  });

  // MarketHub focus categories
  const ALLOWED_CATEGORIES = ["Women", "Men", "Kids", "Shoes", "Electronics"];

  // Use product store as source of truth so admin-added or seeded products appear
  const products = useProductStore((s) => s.products);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category && ALLOWED_CATEGORIES.includes(p.category)) set.add(p.category);
    });
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(
    () => filterProducts(products || [], search, category),
    [products, search, category]
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Product Catalog</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Discover our wide range of products
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-400" />
          <div className="w-full md:w-64">
            <Listbox value={category} onChange={setCategory}>
              <div className="relative">
                <ListboxButton className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-primary">
                  {category || "All categories"}
                </ListboxButton>
                <ListboxOptions className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg max-h-60 overflow-auto">
                  <ListboxOption
                    value={null}
                    className="cursor-pointer px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    All categories
                  </ListboxOption>
                  {categories.map((cat) => (
                    <ListboxOption
                      key={cat}
                      value={cat}
                      className="cursor-pointer px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      {cat}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>
        </div>
      </div>

      {/* Results Count */}
      {!isLoading && (
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Showing {filtered.length} {filtered.length === 1 ? "product" : "products"}
          {search && ` for "${search}"`}
          {category && ` in ${category}`}
        </p>
      )}

      {/* Products Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => {
            const wished = wishlist.some((w) => w.id === p.id);
            return (
              <ProductCard
                key={p.id}
                product={p}
                onAdd={(prod) => addItem({ product: prod, quantity: 1 })}
                onWishlist={toggleWishlist}
                wished={wished}
              />
            );
          })}
          {!filtered.length && (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-slate-500 dark:text-slate-400 mb-4">
                No products found
              </p>
              <p className="text-sm text-slate-400 dark:text-slate-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
