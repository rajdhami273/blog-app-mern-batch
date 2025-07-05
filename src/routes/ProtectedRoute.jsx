import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    return <Navigate to="/auth" />;
  }
  return children;
}
