import React, { useEffect } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials, setCredentials } from "./features/authSlice";
import PrivateRoute from "./components/PrivateRoute";
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
import VendorApplication from "./pages/Vendor/VendorApplication";
import PageNotFound from "./pages/PageNotFound";
import VendorProductsTable from "./pages/Vendor/VendorProductsTable";
import VendorCreateProduct from "./pages/Vendor/VendorCreateProduct";
import VendorProductDetails from "./pages/Vendor/VendorProductDetails";
import VendorEditProduct from "./pages/Vendor/VendorEditProduct";
import UserProfile from "./pages/UserProfile";
import UserProfileDetails from "./pages/UserProfileDetails";
import AdminVendorDetails from "./pages/Admin/AdminVendorDetails";
import CategoryPage from "./pages/CategoryPage";
import ProductSearch from "./pages/ProductSearch";
import SubcategoryProducts from "./pages/SubcategoryProducts";
import AdminEditProduct from "./pages/Admin/AdminEditProduct";
import AdminOrdersTable from "./pages/Admin/AdminOrdersTable";
import VendorOrdersTable from "./pages/Vendor/VendorOrdersTable";
import VendorOrderDetails from "./pages/Vendor/VendorOrderDetails";
import AdminOrderDetails from "./pages/Admin/AdminOrderDetails";
import VendorCustomersTable from "./pages/Vendor/VendorCustomersTable";
import AdminCustomersTable from "./pages/Admin/AdminCustomersTable";
import VendorProfileSettings from "./pages/Vendor/VendorProfileSettings";
import VendorLayout from "./layouts/VendorLayout";
import AdminLayout from "./layouts/AdminLayout";
import VendorFinance from "./pages/Vendor/VendorFinance";
import OrderScreen from "./pages/OrderScreen";
import MainLayout from "./layouts/MainLayout";
import { USERS_URL } from "./constants";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import "react-toastify/dist/ReactToastify.css";
import FeaturedProductsPage from "./pages/FeaturedProductsPage";
import BestSellerPage from "./pages/BestSellerPage";
import PopularProductsPage from "./pages/PopularProductsPage";

export default function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!userInfo) return;
      try {
        const response = await fetch(`${USERS_URL}/me`);
        const userData = await response.json();
        if (!userData?.success) {
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

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/" element={<MainLayout />}>
          <Route index path="/" element={<LandingPage />} />
          <Route path="/login" element={<UserSignIn />} />
          <Route path="/featured" element={<FeaturedProductsPage />} />
          <Route path="/best-sellers" element={<BestSellerPage />} />
          <Route path="/popular" element={<PopularProductsPage />} />
          <Route path="/cart" element={<UserCart />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/search/:query" element={<ProductSearch />} />
          <Route
            path="/category/:category/:categoryId"
            element={<CategoryPage />}
          />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route
            path="/:category/:subcategory/:subcategoryId"
            element={<SubcategoryProducts />}
          />
          <Route path="/profile/:userId" element={<UserProfile />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/checkout" element={<CartCheckout />} />
            <Route path="/profile" element={<UserProfileDetails />} />
            <Route path="/vendor-application" element={<VendorApplication />} />
            <Route path="/order/:orderId" element={<OrderScreen />} />
          </Route>
        </Route>

        <Route path="/" element={<VendorRoute />}>
          <Route path="/vendor/dashboard" element={<VendorLayout />}>
            <Route path="/vendor/dashboard" element={<VendorHome />} />
            <Route
              path="/vendor/dashboard/products"
              element={<VendorProductsTable />}
            />
            <Route
              path="/vendor/dashboard/profile"
              element={<VendorProfileSettings />}
            />
            <Route
              path="/vendor/dashboard/wallet"
              element={<VendorFinance />}
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
              path="/vendor/dashboard/orders"
              element={<VendorOrdersTable />}
            />
            <Route
              path="/vendor/dashboard/customers"
              element={<VendorCustomersTable />}
            />
            <Route
              path="/vendor/dashboard/orders/:orderId"
              element={<VendorOrderDetails />}
            />
            <Route
              path="/vendor/dashboard/products/:productId/edit"
              element={<VendorEditProduct />}
            />
          </Route>
        </Route>

        <Route path="/" element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminHome />} />
            <Route
              path="/admin/dashboard/users/:userId"
              element={<AdminUserDetails />}
            />
            <Route
              path="/admin/dashboard/users"
              element={<AdminUsersTable />}
            />
            <Route
              path="/admin/dashboard/products"
              element={<AdminProductsTable />}
            />
            <Route
              path="/admin/dashboard/products/:productId"
              element={<AdminProductDetails />}
            />
            <Route
              path="/admin/dashboard/orders"
              element={<AdminOrdersTable />}
            />
            <Route
              path="/admin/dashboard/customers"
              element={<AdminCustomersTable />}
            />
            <Route
              path="/admin/dashboard/orders/:orderId"
              element={<AdminOrderDetails />}
            />
            <Route
              path="/admin/dashboard/products/:productId/edit"
              element={<AdminEditProduct />}
            />
            <Route
              path="/admin/dashboard/vendors/:vendorId"
              element={<AdminVendorDetails />}
            />
            <Route
              path="/admin/dashboard/vendors"
              element={<AdminVendorsTable />}
            />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}
