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

export const faqItems = [
  {
    question: "How do I browse products available on the platform?",
    answer:
      "You can easily browse products by category or by using the search bar located at the top of the page. Additionally, you can explore featured products and promotions on the homepage.",
  },
  {
    question: "Is it safe to make transactions on the campus marketplace?",
    answer:
      "Yes, we prioritize the security of our users' transactions. Our platform employs encryption protocols to safeguard sensitive information, and we continually monitor for any suspicious activity.",
  },
  {
    question: "How are disputes between buyers and vendors resolved?",
    answer:
      "In the event of a dispute, we encourage both parties to communicate directly to resolve the issue amicably. If a resolution cannot be reached, our customer support team is available to mediate and provide assistance.",
  },
  {
    question: "Are there any fees associated with selling on the platform?",
    answer:
      "We charge a nominal commission fee on successful transactions made by vendors on the platform. This fee contributes to the maintenance and improvement of our services.",
  },
  {
    question: "How can I register as a buyer on the campus marketplace?",
    answer:
      "To register as a buyer, simply navigate to the registration page on our platform and provide the required information such as your name, email address, and student/staff identification details.",
  },
  {
    question:
      "What steps do I need to take to become a vendor on the platform?",
    answer:
      "To become a vendor, first register as a user on our platform. Then, navigate to the vendor registration section and fill out the necessary details regarding your store and products. Our team will review your application, and upon approval, you can start selling on the marketplace.",
  },
  {
    question: "What payment methods are accepted on the platform?",
    answer:
      "We accept various payment methods including debit/credit cards and mobile payment solutions facilitated through Paystack, a trusted online payment gateway in Nigeria. We do not offer cash on delivery (COD) at this time.",
  },
  {
    question:
      "Is there a minimum order requirement for purchasing items on the platform?",
    answer:
      "No, there is no minimum order requirement. You can purchase items according to your needs and preferences without any restrictions. Whether you're buying a single item or multiple products, our platform caters to all orders, big or small.",
  },
];
