import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  requireAdmin?: boolean;
};

export default function PrivateRoute({ children, requireAdmin = false }: Props) {
  const user = useUserStore((s) => s.user);
  const hasToken = !!user?.token;
  const isAdmin = !!(user?.role === "admin" || user?.is_staff);

  if (!user || !hasToken) return <Navigate to="/login" replace />;
  if (requireAdmin && !isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
}