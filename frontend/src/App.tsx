// src/App.tsx
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function AppContent() {
  const location = useLocation();

  // Show Navbar only if NOT on admin routes
  const showNavbar = !location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar />}
      <main id="main" className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-white px-3 py-2 rounded"
      >
        Skip to content
      </a>
      <AppContent />
    </BrowserRouter>
  );
}
