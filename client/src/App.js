import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetCurrentUserQuery } from "./features/usersApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "./features/authSlice";
import Footer from "./components/Footer";
import HeaderNav from "./components/HeaderNav";

export default function App() {
  const currentLocation = useLocation();
  const dispatch = useDispatch();

  const { data: currentUserData, isLoading: isCurrentUserLoading } =
    useGetCurrentUserQuery();

  useEffect(() => {
    const updateCredentials = () => {
      if (!isCurrentUserLoading && currentUserData) {
        dispatch(setCredentials({ ...currentUserData }));
      }
    };

    updateCredentials();
  }, [currentUserData, isCurrentUserLoading, dispatch]);

  const isNotDashboardPath = !currentLocation.pathname.includes("dashboard");

  return (
    <div>
      {isNotDashboardPath && <HeaderNav />}
      <main>
        <Outlet />
      </main>
      {isNotDashboardPath && <Footer />}
      <ToastContainer />
    </div>
  );
}
