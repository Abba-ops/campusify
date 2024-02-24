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
import VendorDashboard from "./screens/Vendor/VendorDashboard";
import VendorApplication from "./screens/Vendor/VendorApplication";
import "./assets/css/bootstrap.min.css";
import "./assets/css/style.min.css";
import AdminDashboard from "./screens/Admin/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import AdminUsersTable from "./screens/Admin/AdminUsersTable";
import AdminProductsTable from "./screens/Admin/AdminProductsTable";
import AdminVendorsTable from "./screens/Admin/AdminVendorsTable";
import AdminHome from "./screens/Admin/AdminHome";
import LandingPage from "./screens/LandingPage";
import UserSignIn from "./screens/UserSignIn";
import UserCart from "./screens/UserCart";
import ContactUs from "./screens/ContactUs";
import UserRegistration from "./screens/UserRegistration";
import ProductDetail from "./screens/ProductDetail";
import CartCheckout from "./screens/CartCheckout";
import VendorHome from "./screens/Vendor/VendorHome";
import PersonalInfo from "./screens/PersonalInfo";
import VendorRoute from "./components/VendorRoute";
import AdminUserDetails from "./screens/Admin/AdminUserDetails";
import AdminProductDetails from "./screens/Admin/AdminProductDetails";
import AdminEditProduct from "./screens/Admin/AdminEditProduct";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<LandingPage />} />
      <Route path="/login" element={<UserSignIn />} />
      <Route path="/cart" element={<UserCart />} />
      <Route path="/register" element={<UserRegistration />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/product/:productId" element={<ProductDetail />} />

      <Route path="/" element={<PrivateRoute />}>
        <Route path="/checkout" element={<CartCheckout />} />
        <Route path="/profile" element={<PersonalInfo />} />
        <Route path="/vendor-application" element={<VendorApplication />} />
      </Route>

      <Route path="/" element={<VendorRoute />}>
        <Route path="/vendor/dashboard" element={<VendorDashboard />}>
          <Route path="/vendor/dashboard" element={<VendorHome />} />
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
