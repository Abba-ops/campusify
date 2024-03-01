import { FaPhoneAlt } from "react-icons/fa";
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
    icon: <FaPhoneAlt />,
    info: "0905-392-9899",
  },
  {
    icon: <FaPhoneAlt />,
    info: "0905-392-9899",
  },
  {
    icon: <FaPhoneAlt />,
    info: "0905-392-9899",
  },
];
