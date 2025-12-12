import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = useUserStore((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}