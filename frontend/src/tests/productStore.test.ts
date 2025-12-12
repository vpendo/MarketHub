import { describe, it, expect, beforeEach } from "vitest";
import { useProductStore } from "../store/productStore";
import type { Product } from "../types/product";

describe("Product Store", () => {
  beforeEach(() => {
    useProductStore.setState({ products: [], selected: null });
  });

  it("sets products", () => {
    const products: Product[] = [
      {
        id: "1",
        name: "Test Product",
        price: 99.99,
        description: "Test",
        category: "Test",
        stock: 10,
      },
    ];
    useProductStore.getState().setProducts(products);
    expect(useProductStore.getState().products).toEqual(products);
  });

  it("selects a product", () => {
    const product: Product = {
      id: "1",
      name: "Test",
      price: 10,
      description: "Test",
      category: "Test",
      stock: 5,
    };
    useProductStore.getState().selectProduct(product);
    expect(useProductStore.getState().selected).toEqual(product);
  });
});

