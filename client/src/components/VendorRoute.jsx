import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function VendorRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo &&
    userInfo?.success &&
    userInfo?.data?.isVendor &&
    !userInfo?.data?.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
}
