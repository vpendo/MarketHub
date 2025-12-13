import { Link } from "react-router-dom";
import { ShoppingBag, TrendingUp, Shield, Truck, Star, ArrowRight } from "lucide-react";
import { useProductStore } from "../store/productStore";

export default function Home() {
  const features = [
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "Wide Selection",
      desc: "Browse thousands of products across multiple categories",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Shopping",
      desc: "Your data and payments are protected with industry-standard security",
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fast Delivery",
      desc: "Quick and reliable shipping to your doorstep",
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-900/20",
      border: "border-orange-200 dark:border-orange-800",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Best Prices",
      desc: "Competitive pricing with regular deals and discounts",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/20",
      border: "border-purple-200 dark:border-purple-800",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Happy Customer",
      text: "MarketHub has transformed my shopping experience. Fast, reliable, and great prices!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Regular Buyer",
      text: "The best e-commerce platform I've used. Excellent customer service and quality products.",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "Satisfied Shopper",
      text: "Love the wishlist and comparison features. Makes shopping so much easier!",
      rating: 5,
    },
  ];

  const products = useProductStore((s) => s.products);
  const featured = products.slice(0, 4);
  const featured0 = featured.length > 0 ? featured[0] : null;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary via-primary-600 to-secondary text-white py-16 md:py-24 px-6 rounded-2xl mb-16 overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <ShoppingBag className="w-12 h-12" />
              <h1 className="text-4xl md:text-6xl font-bold">
                Welcome to MarketHub
              </h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl">
              Your trusted marketplace for quality products at great prices. Shop smarter, faster, and better.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg hover:shadow-xl"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            {featured0 ? (
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl border border-white/20">
                <img
                  src={featured0.image || "/placeholder.png"}
                  alt={featured0.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white space-y-1">
                  <p className="text-sm uppercase tracking-[0.2em] text-blue-100">Featured</p>
                  <h3 className="text-xl font-semibold">{featured0.name}</h3>
                  <p className="text-sm text-blue-100 line-clamp-2 max-w-md">
                    {featured0.description}
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl border border-white/20 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                <p>No featured products yet</p>
              </div>
            )}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full -ml-48 -mb-48"></div>
      </section>

      {/* Featured Products with images */}
      <section className="mb-16 px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Featured</p>
            <h2 className="text-3xl font-bold">Handpicked for you</h2>
          </div>
          <Link to="/catalog" className="text-primary font-semibold hover:text-primary-600">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="group bg-white dark:bg-slate-900 rounded-xl border shadow-sm hover:shadow-lg transition overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4 space-y-2">
                {p.category && (
                  <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                    {p.category}
                  </span>
                )}
                <h3 className="text-lg font-semibold line-clamp-1">{p.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                  {p.description}
                </p>
                <p className="text-xl font-bold text-primary">${p.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose MarketHub?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Experience the difference with our modern e-commerce platform designed for your convenience
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`p-6 border-2 ${feature.border} rounded-xl ${feature.bg} shadow-sm hover:shadow-lg transition group`}
            >
              <div className={`inline-flex p-3 rounded-lg ${feature.bg} ${feature.color} mb-4 group-hover:scale-110 transition`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Join thousands of satisfied customers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 border shadow-sm hover:shadow-md transition"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-4 italic">
                "{testimonial.text}"
              </p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 md:p-16 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Ready to Start Shopping?
        </h2>
        <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
          Explore our catalog and discover amazing products. Join thousands of satisfied customers.
        </p>
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg"
        >
          Browse Products
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
