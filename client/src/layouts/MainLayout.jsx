import { Outlet } from "react-router-dom";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <>
      <HeaderNav />
      <Outlet />
      <Footer />
    </>
  );
}
