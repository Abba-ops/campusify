import { FaPhoneAlt, FaChartLine, FaHandshake } from "react-icons/fa";
import { MdOutlineSecurity, MdOutlineHelpOutline } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export const BASE_URL = "";
export const USERS_URL = "/api/users";
export const PRODUCTS_URL = "/api/products";
export const VENDORS_URL = "/api/vendors";

export const services = [
  {
    icon: <MdOutlineHelpOutline />,
    service: "24/7 Help",
    text: "Always Available",
  },
  {
    icon: <FaChartLine />,
    service: "Boost Sales",
    text: "Sell with Ease",
  },
  {
    icon: <MdOutlineSecurity />,
    service: "Secure",
    text: "Safe Payments",
  },
  {
    icon: <FaHandshake />,
    service: "Connect",
    text: "Community Hub",
  },
];

export const contactInfo = [
  {
    icon: <FaPhoneAlt />,
    info: "0905-392-9899",
  },
  {
    icon: <MdEmail />,
    info: "info@tau.edu.ng",
  },
  {
    icon: <FaLocationDot />,
    info: "University Drive, Off Idofin Road, Oko-Irese, Kwara State",
  },
];
