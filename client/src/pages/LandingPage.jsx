import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import BackToTop from "../components/BackToTop";
import BestSeller from "../components/BestSeller";
import FeaturedProducts from "../components/FeaturedProducts";
import HeaderHero from "../components/HeaderHero";
import MetaTags from "../components/MetaTags";
import PopularProducts from "../components/PopularProducts";
import ServiceGrid from "../components/ServiceGrid";
import ApplyAsVendorAlert from "../components/ApplyAsVendorAlert";
import { useSelector } from "react-redux";

export default function LandingPage() {
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-light">
      <MetaTags
        title="Welcome to our online store"
        description="Explore our featured products, best sellers, and popular products."
        keywords="online store, featured products, best sellers, popular products"
      />
      <Container className="bg-white">
        <HeaderHero />
        <ServiceGrid />
        <FeaturedProducts />
        {userInfo && !userInfo?.data?.isVendor && <ApplyAsVendorAlert />}
        {!userInfo && <ApplyAsVendorAlert />}
        <BestSeller />
        <PopularProducts />
        <BackToTop />
      </Container>
    </div>
  );
}
