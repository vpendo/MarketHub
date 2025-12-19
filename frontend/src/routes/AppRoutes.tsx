import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Admin from "../pages/dashboard/Admin";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import Login from "../pages/Login";
import Register from "../pages/Register";
import OrderProduct from "../pages/OrderProduct"; 
import PrivateRoute from "./PrivateRoute";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Comparison from "../pages/Comparison";
import Analytics from "../pages/dashboard/Analytics";
import Wishlist from "../pages/Wishlist"; // ✅ added

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Protected routes for logged-in customers */}
      <Route
        path="/catalog"
        element={
          <PrivateRoute>
            <Catalog />
          </PrivateRoute>
        }
      />
      <Route
        path="/product/:id"
        element={
          <PrivateRoute>
            <Product />
          </PrivateRoute>
        }
      />
      <Route
        path="/order/:productId"
        element={
          <PrivateRoute>
            <OrderProduct />
          </PrivateRoute>
        }
      />

      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/comparison" element={<Comparison />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Wishlist page */}
      <Route
        path="/wishlist"
        element={
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        }
      />

      {/* Protected routes */}
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <PrivateRoute requireAdmin>
            <Analytics />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/*"
        element={
          <PrivateRoute requireAdmin>
            <Admin />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
