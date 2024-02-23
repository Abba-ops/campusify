import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function VendorRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo?.success && userInfo.data.isVendor ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: window.location.pathname }} />
  );
}
