import type { Product } from "../types/product";

export function filterProducts(
  products: Product[],
  search: string,
  category: string | null
) {
  const query = search.trim().toLowerCase();
  return products.filter((p) => {
    const matchesSearch =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query);
    const matchesCategory = !category || p.category === category;
    return matchesSearch && matchesCategory;
  });
}
