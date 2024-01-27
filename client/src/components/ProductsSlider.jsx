import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Product from "./Product";
import { useGetProductsQuery } from "../features/productsApiSlice";

export default function ProductsSlider({ lg = 12, showIcon }) {
  const { data: products, isLoading } = useGetProductsQuery();

  return (
    <Container className="pt-4">
      <Row className="overflow-x-scroll overflow-y-hidden flex-nowrap products-slider">
        {!isLoading
          ? products.map((product, index) => (
              <Col lg={lg} key={index} md={6}>
                <Product product={product} showIcon={showIcon} />
              </Col>
            ))
          : "Loading..."}
      </Row>
    </Container>
  );
}
