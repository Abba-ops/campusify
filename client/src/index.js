import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import store from "./app/store";
import PrivateRoute from "./components/PrivateRoute";
import "./assets/css/bootstrap.min.css";
import "./assets/css/style.min.css";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import AdminUsersTable from "./pages/Admin/AdminUsersTable";
import AdminProductsTable from "./pages/Admin/AdminProductsTable";
import AdminVendorsTable from "./pages/Admin/AdminVendorsTable";
import AdminHome from "./pages/Admin/AdminHome";
import LandingPage from "./pages/LandingPage";
import UserSignIn from "./pages/UserSignIn";
import UserCart from "./pages/UserCart";
import ContactUs from "./pages/ContactUs";
import UserRegistration from "./pages/UserRegistration";
import ProductDetail from "./pages/ProductDetail";
import CartCheckout from "./pages/CartCheckout";
import VendorHome from "./pages/Vendor/VendorHome";
import VendorRoute from "./components/VendorRoute";
import AdminUserDetails from "./pages/Admin/AdminUserDetails";
import AdminProductDetails from "./pages/Admin/AdminProductDetails";
import AdminEditProduct from "./pages/Admin/AdminEditProduct";
import VendorApplication from "./pages/Vendor/VendorApplication";
import VendorDashboard from "./pages/Vendor/VendorDashboard";
import PageNotFound from "./pages/PageNotFound";
import VendorProductsTable from "./pages/Vendor/VendorProductsTable";
import VendorCreateProduct from "./pages/Vendor/VendorCreateProduct";
import VendorProductDetails from "./pages/Vendor/VendorProductDetails";
import VendorEditProduct from "./pages/Vendor/VendorEditProduct";
import UserProfile from "./pages/UserProfile";
import MyProfileDetails from "./pages/MyProfileDetails";
import { HelmetProvider } from "react-helmet-async";
import AdminVendorDetails from "./pages/Admin/AdminVendorDetails";
import About from "./pages/About";
import FAQ from "./pages/FAQ";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<LandingPage />} />
      <Route path="/login" element={<UserSignIn />} />
      <Route path="/cart" element={<UserCart />} />
      <Route path="/register" element={<UserRegistration />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/profile/:userId" element={<UserProfile />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" component={FAQ} />

      <Route path="*" element={<PageNotFound />} />

      <Route path="/" element={<PrivateRoute />}>
        <Route path="/checkout" element={<CartCheckout />} />
        <Route path="/profile" element={<MyProfileDetails />} />
        <Route path="/vendor-application" element={<VendorApplication />} />
      </Route>

      <Route path="/" element={<VendorRoute />}>
        <Route path="/vendor/dashboard" element={<VendorDashboard />}>
          <Route path="/vendor/dashboard" element={<VendorHome />} />
          <Route
            path="/vendor/dashboard/products"
            element={<VendorProductsTable />}
          />
          <Route
            path="/vendor/dashboard/products/create"
            element={<VendorCreateProduct />}
          />
          <Route
            path="/vendor/dashboard/products/:productId"
            element={<VendorProductDetails />}
          />
          <Route
            path="/vendor/dashboard/products/:productId/edit"
            element={<VendorEditProduct />}
          />
        </Route>
      </Route>

      <Route path="/" element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route path="/admin/dashboard" element={<AdminHome />} />
          <Route
            path="/admin/dashboard/users/:userId"
            element={<AdminUserDetails />}
          />
          <Route path="/admin/dashboard/users" element={<AdminUsersTable />} />
          <Route
            path="/admin/dashboard/products"
            element={<AdminProductsTable />}
          />
          <Route
            path="/admin/dashboard/products/:productId"
            element={<AdminProductDetails />}
          />
          <Route
            path="/admin/dashboard/vendors/:vendorId"
            element={<AdminVendorDetails />}
          />
          <Route
            path="/admin/dashboard/products/:productId/edit"
            element={<AdminEditProduct />}
          />
          <Route
            path="/admin/dashboard/vendors"
            element={<AdminVendorsTable />}
          />
        </Route>
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
