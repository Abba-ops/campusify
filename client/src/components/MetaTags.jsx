import { Helmet } from "react-helmet-async";

MetaTags.defaultProps = {
  title: "Campusify - Your Campus Marketplace",
  description:
    "Explore and shop in the ultimate campus marketplace. Buy and sell products, connect with other students, and discover local campus deals.",
  keywords: "Campusify, campus marketplace, buy, sell, students",
};

export default function MetaTags({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
}
