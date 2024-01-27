import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const location = useLocation();

  return (
    <div>
      {!location.pathname.includes("dashboard") && <Header />}
      <main className="bg-light">
        <Outlet />
      </main>
      {!location.pathname.includes("dashboard") && <Footer />}
      <ToastContainer />
    </div>
  );
}
