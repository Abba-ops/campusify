import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials, setCredentials } from "./features/authSlice";
import Footer from "./components/Footer";
import HeaderNav from "./components/HeaderNav";
import { USERS_URL } from "./constants";

export default function App() {
  const currentLocation = useLocation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!userInfo) return;
      try {
        const response = await fetch(`${USERS_URL}/current`);
        const userData = await response.json();
        if (!userData.success) {
          await fetch(`${USERS_URL}/logout`);
          dispatch(clearCredentials());
          toast.error("User not found. Please try to log in again.");
          return;
        }
        dispatch(setCredentials({ ...userData }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchCurrentUser();
  }, []);

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
