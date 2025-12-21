import type { Product } from "../types/product";

export function filterProducts(
  products: Product[],
  search: string,
  category: string | null
): Product[] {
  const query = search.trim().toLowerCase();
  const selectedCategory = category?.trim().toLowerCase() || null;

  return products.filter((p) => {
    const matchesSearch =
      !query ||
      p.name.toLowerCase().includes(query) ||
      (p.description?.toLowerCase().includes(query) ?? false);

    const matchesCategory =
      !selectedCategory || (p.category?.toLowerCase().trim() === selectedCategory);

    return matchesSearch && matchesCategory;
  });
}
