import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProduct } from "../services/products";
import { placeSingleOrder } from "../services/orders";
import type { Product } from "../types/product";

export default function OrderProduct() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!productId) return;

    setIsLoading(true);

    fetchProduct(productId)
      .then((res) => setProduct(res))
      .catch((err) => {
        console.error(err);
        setProduct(null);
      })
      .finally(() => setIsLoading(false));
  }, [productId]);

  const handleOrder = async (): Promise<void> => {
    if (!product) return;

    try {
      await placeSingleOrder({
        productId: product.id,
        quantity,
      });

      alert(`Order for "${product.name}" placed successfully!`);
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
    }
  };

  if (isLoading)
    return (
      <p className="p-6 text-center text-lg text-slate-600 dark:text-slate-300">
        Loading product...
      </p>
    );
  if (!product)
    return (
      <p className="p-6 text-center text-lg text-red-500">
        Product not found.
      </p>
    );

  const stock = product.stock ?? 0;
  const totalPrice = quantity * product.price; // ✅ calculate total price

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-lg flex flex-col md:flex-row gap-6">
      {/* Product Image */}
      <div className="flex-1 flex justify-center items-center">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
          className="w-full max-w-xs h-auto object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Product Info & Order Form */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          {product.category && (
            <span className="inline-block mb-2 px-2 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {product.category}
            </span>
          )}
          <p className="text-2xl font-semibold text-primary mb-2">
            ${product.price.toFixed(2)}
          </p>

          {/* Total Price */}
          <p className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-4">
            Total: ${totalPrice.toFixed(2)}
          </p>

          <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
            Available stock: {stock}
          </p>

          <div className="mb-4 flex items-center gap-3">
            <label htmlFor="quantity" className="font-medium">
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              min={1}
              max={stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border px-3 py-2 rounded-lg w-24 text-center focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <button
          onClick={handleOrder}
          disabled={quantity < 1 || quantity > stock}
          className="mt-4 w-full md:w-auto bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
