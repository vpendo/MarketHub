import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import ProductManagement from "./ProductManagement";
import AdminDashboard from "./AdminDashboard";

export default function Admin() {
  return (
    <div className="flex min-h-[70vh]">
      <Sidebar />
      <div className="flex-1">
        <Routes>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<div className="p-6">Orders Management - Coming Soon</div>} />
          <Route path="inventory" element={<div className="p-6">Inventory Management - Coming Soon</div>} />
        </Routes>
      </div>
    </div>
  );
}
