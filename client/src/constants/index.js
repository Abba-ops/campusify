import {
  BsBarChart,
  BsBox,
  BsCart,
  BsClipboardData,
  BsGraphUp,
  BsPeople,
  BsPerson,
  BsPersonCheck,
  BsWallet,
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
export const ORDERS_URL = "/api/orders";

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
    title: "Customers Overview",
    link: "/admin/dashboard/customers",
    icon: <BsPeople />,
  },
  {
    title: "Vendor Management",
    link: "/admin/dashboard/vendors",
    icon: <BsPersonCheck />,
  },
];

export const vendorLinks = [
  {
    title: "Dashboard Overview",
    link: "/vendor/dashboard/",
    icon: <BsBarChart />,
  },
  {
    title: "Manage Orders",
    link: "/vendor/dashboard/orders",
    icon: <BsCart />,
  },
  {
    title: "Manage Products",
    link: "/vendor/dashboard/products",
    icon: <BsBox />,
  },
  {
    title: "Customers Overview",
    link: "/vendor/dashboard/customers",
    icon: <BsPeople />,
  },
  {
    title: "Profile Settings",
    link: "/vendor/dashboard/profile",
    icon: <BsPerson />,
  },
  {
    title: "Financial Overview",
    link: "/vendor/dashboard/wallet",
    icon: <BsWallet />,
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
    type: "email",
    icon: <FaEnvelope />,
    info: "jadesolakajeyale@gmail.com",
  },
];

export const footerLinks = [
  {
    heading: "Resources",
    links: [
      { text: "Campus Map", url: "/campus-map" },
      { text: "Academic Calendar", url: "/academic-calendar" },
      { text: "Student Services", url: "/student-services" },
      { text: "Campus News", url: "/campus-news" },
    ],
  },
  {
    heading: "Shop Categories",
    links: [
      { text: "Textbooks", url: "/shop/textbooks" },
      { text: "Electronics", url: "/shop/electronics" },
      { text: "Clothing", url: "/shop/clothing" },
      { text: "Accessories", url: "/shop/accessories" },
    ],
  },
  {
    heading: "Helpful Links",
    links: [
      { text: "How to Sell", url: "/help/sell" },
      { text: "Privacy Policy", url: "/privacy-policy" },
      { text: "Terms of Service", url: "/terms-of-service" },
      { text: "Contact Us", url: "/contact-us" },
    ],
  },
];
