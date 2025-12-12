import { ShoppingBag, Shield, Users, Award, Target, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Trust & Security",
      desc: "Your data and transactions are protected with industry-leading security measures.",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer First",
      desc: "We prioritize your satisfaction with exceptional service and support.",
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Products",
      desc: "Curated selection of high-quality products from trusted suppliers.",
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Innovation",
      desc: "Constantly improving our platform with the latest technology and features.",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  const stats = [
    { label: "Happy Customers", value: "10K+" },
    { label: "Products", value: "5K+" },
    { label: "Orders Delivered", value: "50K+" },
    { label: "Countries", value: "100+" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary via-primary-600 to-secondary text-white py-20 px-6 rounded-2xl mb-12 overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">About MarketHub</h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Your trusted marketplace for quality products at great prices
          </p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full -ml-48 -mb-48"></div>
      </section>

      {/* Mission Section */}
      <section className="mb-12 px-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 border shadow-sm">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              MarketHub is a modern e-commerce platform focused on speed, accessibility, and trust.
              We combine a curated catalog with smooth checkout and order tracking to make online
              shopping effortless.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Our mission is to make online shopping effortless with inclusive design, secure payments,
              and responsive experiences across all devices. We believe everyone deserves access to
              quality products at fair prices.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-12 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 border shadow-sm text-center hover:shadow-md transition"
            >
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => (
            <div
              key={idx}
              className={`p-6 border-2 rounded-xl ${value.bg} shadow-sm hover:shadow-md transition`}
            >
              <div className={`inline-flex p-3 rounded-lg ${value.bg} ${value.color} mb-4`}>
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-center mb-12">
        <div className="max-w-2xl mx-auto text-white">
          <Heart className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Join the MarketHub Community
          </h2>
          <p className="text-lg mb-6 text-blue-100">
            Experience the future of online shopping. Start browsing our catalog today!
          </p>
          <Link
            to="/catalog"
            className="inline-block px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
}
