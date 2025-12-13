import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const user = useUserStore((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;
  return children;
}
