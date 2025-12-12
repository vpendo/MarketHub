import type { Product } from "../types/product";

// Import local images from assets folder
// You can add your own images to src/assets/images/ and import them here
// Example: import product1Img from "../assets/images/product1.jpg";

// For now, we'll use placeholder images. You can replace these with your own:
// 1. Add your images to: frontend/src/assets/images/
// 2. Import them at the top: import product1Img from "../assets/images/product1.jpg";
// 3. Use them in the products: image: product1Img

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling headphones with 30-hour battery life. Perfect for music lovers and professionals.",
    price: 129.99,
    category: "Electronics",
    stock: 25,
    // Use local image: import the image and use it here
    // image: product1Img,
    // Or use public folder: image: "/images/product1.jpg"
    // Or keep using URL for now:
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    description: "Advanced fitness tracking with heart rate monitor, GPS, and water resistance. Stay connected on the go.",
    price: 299.99,
    category: "Electronics",
    stock: 15,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
  },
  {
    id: "3",
    name: "Leather Backpack",
    description: "Stylish and durable leather backpack with multiple compartments. Perfect for work or travel.",
    price: 89.99,
    category: "Fashion",
    stock: 30,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
  },
  {
    id: "4",
    name: "Coffee Maker Deluxe",
    description: "Programmable coffee maker with thermal carafe. Brew perfect coffee every morning.",
    price: 79.99,
    category: "Home & Kitchen",
    stock: 20,
    image: "https://images.unsplash.com/photo-1517668808823-f6b4908e9b84?w=500&h=500&fit=crop",
  },
  {
    id: "5",
    name: "Running Shoes",
    description: "Lightweight running shoes with cushioned sole and breathable mesh. Ideal for daily workouts.",
    price: 119.99,
    category: "Sports",
    stock: 18,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
  },
  {
    id: "6",
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with long battery life and precise tracking. Perfect for office or gaming.",
    price: 29.99,
    category: "Electronics",
    stock: 50,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
  },
  {
    id: "7",
    name: "Yoga Mat Premium",
    description: "Non-slip yoga mat with extra cushioning. Perfect for yoga, pilates, and exercise routines.",
    price: 39.99,
    category: "Sports",
    stock: 35,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8a7e?w=500&h=500&fit=crop",
  },
  {
    id: "8",
    name: "Desk Lamp LED",
    description: "Adjustable LED desk lamp with multiple brightness levels. Eye-friendly lighting for work.",
    price: 49.99,
    category: "Home & Kitchen",
    stock: 22,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
  },
  {
    id: "9",
    name: "Cotton T-Shirt",
    description: "100% organic cotton t-shirt. Comfortable, breathable, and eco-friendly. Available in multiple colors.",
    price: 24.99,
    category: "Fashion",
    stock: 60,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
  },
  {
    id: "10",
    name: "Portable Power Bank",
    description: "10000mAh power bank with fast charging. Keep your devices powered on the go.",
    price: 34.99,
    category: "Electronics",
    stock: 40,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c8?w=500&h=500&fit=crop",
  },
  {
    id: "11",
    name: "Ceramic Dinner Set",
    description: "Elegant 16-piece ceramic dinner set. Dishwasher and microwave safe. Perfect for hosting.",
    price: 69.99,
    category: "Home & Kitchen",
    stock: 12,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&h=500&fit=crop",
  },
  {
    id: "12",
    name: "Sunglasses Classic",
    description: "UV protection sunglasses with polarized lenses. Stylish design for everyday wear.",
    price: 59.99,
    category: "Fashion",
    stock: 28,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
  },
];
