import {
  BsBarChart,
  BsBox,
  BsCart,
  BsClipboardData,
  BsGraphUp,
  BsPeople,
  BsPerson,
  BsPersonCheck,
} from "react-icons/bs";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import {
  MdOutlineSecurity,
  MdOutlineLocalShipping,
  MdOutlineLocalCafe,
  MdOutlineShoppingBasket,
} from "react-icons/md";

export const BASE_URL = "";
export const USERS_URL = "/api/users";
export const PRODUCTS_URL = "/api/products";
export const VENDORS_URL = "/api/vendors";
export const UPLOAD_URL = "/api/upload";

export const adminLinks = [
  {
    title: "Dashboard Overview",
    link: "/admin/dashboard/",
    icon: <BsGraphUp />,
  },
  {
    title: "User Management",
    link: "/admin/dashboard/users",
    icon: <BsPeople />,
  },
  {
    title: "Order Overview",
    link: "/admin/dashboard/orders",
    icon: <BsClipboardData />,
  },
  {
    title: "Product Management",
    link: "/admin/dashboard/products",
    icon: <BsBox />,
  },
  {
    title: "Vendor Management",
    link: "/admin/dashboard/vendors",
    icon: <BsPersonCheck />,
  },
];
export const vendorLinks = [
  {
    title: "Dashboard",
    link: "/vendor/dashboard/",
    icon: <BsBarChart />,
  },
  {
    title: "Order Management",
    link: "/vendor/dashboard/orders",
    icon: <BsCart />,
  },
  {
    title: "Product Management",
    link: "/vendor/dashboard/products",
    icon: <BsBox />,
  },
  {
    title: "Customer",
    link: "/vendor/dashboard/customers",
    icon: <BsPeople />,
  },
  {
    title: "Profile",
    link: "/vendor/dashboard/profile",
    icon: <BsPerson />,
  },
];

export const services = [
  {
    icon: <MdOutlineSecurity />,
    service: "Secure Transactions",
    text: "Safe payments.",
  },
  {
    icon: <MdOutlineLocalShipping />,
    service: "Fast Delivery",
    text: "Quick shipping.",
  },
  {
    icon: <MdOutlineLocalCafe />,
    service: "Local Marketplace",
    text: "Support locals.",
  },
  {
    icon: <MdOutlineShoppingBasket />,
    service: "Shopping Convenience",
    text: "Effortless shopping.",
  },
];

export const contactInfo = [
  {
    type: "phone",
    icon: <FaPhoneAlt />,
    info: "0905-392-9899",
  },
  {
    type: "phone",
    icon: <FaPhoneAlt />,
    info: "0905-392-9899",
  },
  {
    type: "email",
    icon: <FaEnvelope />,
    info: "jadesolakajeyale@gmail.com",
  },
];
