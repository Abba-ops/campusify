import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo?.success && userInfo?.data?.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
}
