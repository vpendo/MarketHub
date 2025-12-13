import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon, ShoppingBag } from "lucide-react";
import useDarkMode from "../../hooks/useDarkMode";
import { useUserStore } from "../../store/userStore";

export default function Navbar() {
  const { theme, toggle } = useDarkMode();
  const user = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link to="/" className="hover:text-primary">
        Home
      </Link>
      <Link to="/about" className="hover:text-primary">
        About
      </Link>
      <Link to="/contact" className="hover:text-primary">
        Contact
      </Link>
      <Link to="/catalog" className="hover:text-primary">
        Products
      </Link>
      <Link to="/comparison" className="hover:text-primary">
        Compare
      </Link>
      {user && (
        <Link to="/analytics" className="hover:text-primary">
          Analytics
        </Link>
      )}
      {user?.role === "admin" && (
        <Link to="/admin" className="hover:text-primary">
          Admin
        </Link>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <ShoppingBag size={22} />
          MarketHub
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-4 text-sm font-medium text-slate-700 dark:text-slate-200">
          <NavLinks />
          {user ? (
            <button
              onClick={logout}
              className="px-3 py-1 rounded bg-primary text-white hover:bg-primary-600 transition shadow-sm"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 rounded bg-primary text-white hover:bg-primary-600 transition shadow-sm"
            >
              Login
            </Link>
          )}
          <button
            onClick={toggle}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-900/98 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
            <NavLinks />
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="px-3 py-2 rounded bg-primary text-white hover:bg-primary-600 transition text-left shadow-sm"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded bg-primary text-white hover:bg-primary-600 transition text-left shadow-sm"
              >
                Login
              </Link>
            )}
            <button
              onClick={() => {
                toggle();
                setOpen(false);
              }}
              className="px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition text-left inline-flex items-center gap-2"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <>
                  <Sun size={18} /> Light mode
                </>
              ) : (
                <>
                  <Moon size={18} /> Dark mode
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
