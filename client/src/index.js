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
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import ContactScreen from "./screens/ContactScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductScreen from "./screens/ProductScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import PrivateRoute from "./components/PrivateRoute";
import ProfileScreen from "./screens/ProfileScreen";
import VendorDashboard from "./screens/VendorDashboard";
import "./assets/css/bootstrap.min.css";
import "./assets/css/style.min.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/contact" element={<ContactScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/vendor/dashboard" element={<VendorDashboard />} />

      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/checkout" element={<CheckoutScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
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
