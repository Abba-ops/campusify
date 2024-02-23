import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Product from "./ProductCard";
import { useGetProductsQuery } from "../features/productsApiSlice";

export default function CarouselProducts({ lg = 12, showIcon }) {
  const { data, isLoading } = useGetProductsQuery();

  return (
    <Container className="pt-4">
      <Row className="overflow-x-scroll overflow-y-hidden flex-nowrap products-slider">
        {!isLoading
          ? data.data.map((product, index) => (
              <Col lg={lg} key={index} md={6}>
                <Product product={product} showIcon={showIcon} />
              </Col>
            ))
          : "Loading..."}
      </Row>
    </Container>
  );
}
