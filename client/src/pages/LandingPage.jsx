import FeaturedProducts from "../components/FeaturedProducts";
import PopularProducts from "../components/PopularProducts";
import BackToTop from "../components/BackToTop";
import BestSeller from "../components/BestSeller";
import ServiceGrid from "../components/ServiceGrid";
import HeaderHero from "../components/HeaderHero";
import { useEffect } from "react";
import { Container } from "react-bootstrap";

export default function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-light">
      <Container className="bg-white">
        <HeaderHero />
        <ServiceGrid />
        <FeaturedProducts />
        <BestSeller />
        <PopularProducts />
        <BackToTop />
      </Container>
    </div>
  );
}
