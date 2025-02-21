import { Container, Badge } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import ProductCard from "./ProductCard";
import SingleProductPlaceholder from "./SingleProductPlaceholder";
import { Swiper, SwiperSlide } from "swiper/react";

export default function CarouselProducts({
  lgColumnSize = 4,
  showPreviewIcon,
  productsData,
  isLoading,
  isError,
  noProductsMessage,
}) {
  return (
    <Container className="pt-4">
      {!isError ? (
        <div>
          {productsData?.length === 0 ? (
            <div className="text-center mt-5">
              <h5>No Products Available</h5>
              <p className="mt-3">{noProductsMessage}</p>{" "}
            </div>
          ) : (
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              breakpoints={{
                992: {
                  slidesPerView: lgColumnSize,
                },
              }}>
              {!isLoading
                ? productsData?.map((product, index) => (
                    <SwiperSlide key={index}>
                      <ProductCard
                        product={product}
                        showPreviewIcon={showPreviewIcon}
                      />
                    </SwiperSlide>
                  ))
                : Array.from({ length: 4 }, (_, index) => (
                    <SwiperSlide key={index}>
                      <SingleProductPlaceholder />
                    </SwiperSlide>
                  ))}
            </Swiper>
          )}
          {productsData?.length > 0 && (
            <div className="scroll-indicator text-center mt-3">
              <BsArrowRight className="scroll-icon" />
              <span className="scroll-text">
                Swipe or scroll <Badge variant="secondary">right</Badge> to see
                more
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center mt-5">
          <h5 className="text-danger">Error Fetching Products</h5>
          <p className="mt-3">
            Sorry, we couldn't retrieve the products at the moment. Please try
            again later or contact support.
          </p>
        </div>
      )}
    </Container>
  );
}
