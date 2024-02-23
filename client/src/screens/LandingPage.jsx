import FeaturedProducts from "../components/FeaturedProducts";
import PopularProducts from "../components/PopularProducts";
import ScrollToTop from "../components/BackToTop";
import BestSeller from "../components/BestSeller";
import Services from "../components/ServiceGrid";
import Hero from "../components/HeaderHero";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProducts />
      <BestSeller />
      <PopularProducts />
      <ScrollToTop />
    </>
  );
}
