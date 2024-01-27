import FeaturedProducts from "../components/FeaturedProducts";
import PopularProducts from "../components/PopularProducts";
import ScrollToTop from "../components/ScrollToTop";
import BestSeller from "../components/BestSeller";
import Services from "../components/Services";
import Hero from "../components/Hero";

export default function HomeScreen() {
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
