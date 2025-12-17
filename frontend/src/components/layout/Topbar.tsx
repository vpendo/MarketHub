import { Bell, Search, Sun, Moon, User, LogOut, Menu } from "lucide-react";
import { useUserStore } from "../../store/userStore"; // Zustand store
import useDarkMode from "../../hooks/useDarkMode";

type TopbarProps = {
  onSidebarToggle?: () => void; // Optional callback for mobile sidebar
};

export default function Topbar({ onSidebarToggle }: TopbarProps) {
  const { theme, toggle } = useDarkMode(); // Dark mode hook
  const { user, logout } = useUserStore(); // Zustand store

  return (
    <header className="sticky top-0 z-50 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 shadow-sm">
      
      {/* Left: Sidebar Toggle + Search */}
      <div className="flex items-center gap-3 w-full max-w-lg">
        {/* Mobile sidebar toggle */}
        <button
          onClick={onSidebarToggle}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition sm:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>

        {/* Search bar (hidden on xs) */}
        <div className="hidden sm:flex items-center gap-3 flex-1">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search products, orders..."
            aria-label="Search products and orders"
            className="w-full bg-transparent outline-none text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Theme Toggle */}
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-slate-600" />
          )}
        </button>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Admin Profile */}
        <div className="flex items-center gap-2 sm:gap-3 border-l pl-3 sm:pl-4 border-slate-200 dark:border-slate-800">
          <div className="text-right hidden sm:flex flex-col">
            <p className="text-sm font-medium">{user?.name || "Admin"}</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>

          <User className="w-8 h-8 p-1.5 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
          <button
            onClick={logout}
            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
            aria-label="Log out"
          >
            <LogOut className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
