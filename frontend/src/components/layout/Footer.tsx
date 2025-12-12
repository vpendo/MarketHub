import { Link } from "react-router-dom";
import { Mail, ShoppingBag, ShieldCheck } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-6 grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white">
            <ShoppingBag size={20} />
            <span className="text-lg font-semibold">MarketHub</span>
          </div>
          <p className="text-sm text-slate-400">
            Modern e-commerce built for speed, trust, and accessibility.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-white">Quick Links</h3>
          <nav className="flex flex-wrap gap-3 text-sm text-slate-400">
            <Link to="/catalog" className="hover:text-white">Catalog</Link>
            <Link to="/comparison" className="hover:text-white">Compare</Link>
            <Link to="/wishlist" className="hover:text-white">Wishlist</Link>
            <Link to="/orders" className="hover:text-white">Orders</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </nav>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-white">Stay in the loop</h3>
          <form className="space-y-2">
            <label className="sr-only" htmlFor="newsletter-email">Email</label>
            <div className="flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 px-3 py-2">
              <Mail size={16} className="text-slate-400" />
              <input
                id="newsletter-email"
                type="email"
                placeholder="you@example.com"
                className="w-full bg-transparent text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="w-full rounded-lg bg-primary text-white px-3 py-2 text-sm font-medium hover:bg-primary-600 transition"
            >
              Subscribe
            </button>
          </form>
          <p className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={16} /> Secure payments and data.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4 py-3 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span>© {year} MarketHub.</span>
          <span>Built with accessibility and performance in mind.</span>
        </div>
      </div>
    </footer>
  );
}