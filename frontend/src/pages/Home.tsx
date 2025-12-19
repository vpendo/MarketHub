import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Shield, Truck, ArrowRight } from "lucide-react";

// Product type
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero slides
  const slides = [
    { image: "/images/slide1.jpg", title: "Welcome to MarketHub", cta: "Shop Now" },
    { image: "/images/slide2.jpg", title: "Style That Speaks", cta: "Browse Collection" },
    { image: "/images/slide3.jpg", title: "Step Into Confidence", cta: "Explore Now" },
  ];

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 5000);
    return () => clearInterval(interval);
  }, []);

  // Sample products for testing
  const featuredProducts: Product[] = [
    { id: "1", name: "Men's Jacket", price: 15.99, image: "/images/jackets.jpg" },
    { id: "2", name: "Women's Dress", price: 20.99, image: "/images/dres1.jpg" },
    { id: "3", name: "Sneakers", price: 10.9, image: "/images/snakers.jpg" },
    { id: "4", name: "Computer", price: 300.99, image: "/images/hp.jpeg" },
  ];

  const newArrivals: Product[] = [
    { id: "5", name: "Men's Shirt", price: 10.90, image: "/images/shirt.jpg" },
    { id: "6", name: "Women's dress", price: 15.9, image: "/images/dress.jpg" },
    { id: "7", name: "Jacket's men", price: 20.00, image: "/images/Jacket.jpg" },
    { id: "8", name: "men's Shoes", price: 15.99, image: "/images/shoes.jpg" },
  ];

  // Features section
  const features = [
    { icon: <ShoppingBag className="w-8 h-8 text-blue-600" />, title: "Wide Selection", desc: "Fashion, shoes & electronics" },
    { icon: <Shield className="w-8 h-8 text-green-600" />, title: "Secure Shopping", desc: "Payments fully protected" },
    { icon: <Truck className="w-8 h-8 text-purple-600" />, title: "Fast Delivery", desc: "Reliable shipping to your doorstep" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6">

      {/* Hero Slider */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-blue-50 dark:bg-slate-900 rounded-2xl p-8 md:p-12">
          {/* Text */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              {slides[currentSlide].title}
            </h1>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition"
            >
              {slides[currentSlide].cta}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Image */}
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
            <img src={slides[currentSlide].image} alt={slides[currentSlide].title} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Featured Products</h2>
          <Link to="/catalog" className="text-blue-600 font-semibold hover:text-blue-700">View all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="group bg-white dark:bg-slate-900 rounded-xl border shadow-sm hover:shadow-lg overflow-hidden transition">
              <div className="aspect-square overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <div className="p-4 space-y-2 text-center">
                <h3 className="text-lg font-semibold line-clamp-1">{p.name}</h3>
                <p className="text-xl font-bold text-blue-600">${p.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">New Arrivals</h2>
          <Link to="/catalog" className="text-blue-600 font-semibold hover:text-blue-700">View all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="group bg-white dark:bg-slate-900 rounded-xl border shadow-sm hover:shadow-lg overflow-hidden transition">
              <div className="aspect-square overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <div className="p-4 space-y-2 text-center">
                <h3 className="text-lg font-semibold line-clamp-1">{p.name}</h3>
                <p className="text-xl font-bold text-blue-600">${p.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white text-center">Why Shop With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-lg transition text-center">
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 dark:bg-blue-700 rounded-2xl p-12 md:p-16 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Shop Now?</h2>
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg transition"
        >
          Browse Products
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
