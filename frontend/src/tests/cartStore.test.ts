import { describe, expect, it } from "vitest";
import { useCartStore } from "../store/cartStore";
import type { Product } from "../types/product";

const sampleProduct: Product = {
  id: "1",
  name: "Test",
  description: "Desc",
  price: 10,
};

describe("cartStore", () => {
  it("adds and removes items", () => {
    const store = useCartStore.getState();
    store.addItem({ product: sampleProduct, quantity: 2 });
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0]?.quantity).toBe(2);
    store.removeItem(sampleProduct.id);
    expect(useCartStore.getState().items).toHaveLength(0);
    // reset store state for isolation
    useCartStore.setState({ items: [] });
  });
});

