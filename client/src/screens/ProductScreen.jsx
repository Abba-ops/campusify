import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/esm/Image";
import Form from "react-bootstrap/Form";
import Rating from "../components/Rating";
import ProductsSlider from "../components/ProductsSlider";
import ScrollToTop from "../components/ScrollToTop";
import { useGetProductDetailsQuery } from "../features/productsApiSlice";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { addToCart } from "../features/cartSlice";

export default function ProductDetailsScreen() {
  const { id: productId } = useParams();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useGetProductDetailsQuery(productId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate("/cart");
  };

  return (
    <section className="bg-white py-5">
      <Container>
        <Row>
          <Col lg={4} className="mb-3 mb-lg-0">
            <Image src={`${product?.imageUrl}`} fluid loading="lazy" />
          </Col>
          <Col lg={5} className="mb-5 mb-lg-0">
            {isLoading ? (
              <>
                <h5 className="card-title placeholder-glow">
                  <span className="placeholder col-6"></span>
                </h5>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-7"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-6"></span>
                  <span className="placeholder col-8"></span>
                </p>
                <Button
                  className="disabled placeholder col-6 rounded-0"
                  variant="primary"></Button>
              </>
            ) : (
              <>
                <h3 className="text-uppercase fw-semibold text-body-secondary mb-3">
                  {product?.name}
                </h3>
                <Rating
                  value={product?.rating}
                  text={`(${product?.numReviews} Review)`}
                  linkText={"Add your review"}
                />
                <p className="raleway my-4">{product?.description}</p>
                <h4 className="fw-semibold text-primary my-3">
                  &#8358;{product?.price}
                </h4>
                <Row>
                  <Col lg={4}>
                    {product?.countInStock > 0 && (
                      <Form.Select
                        className="rounded-0"
                        onChange={(e) => setQuantity(Number(e.target.value))}>
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    )}
                  </Col>
                  <Col>
                    <Button
                      variant="dark"
                      className="rounded-pill py-2"
                      onClick={addToCartHandler}>
                      <RiShoppingBag2Fill />
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </Col>
          <Col lg={3}>
            <h4 className="text-uppercase fw-bolder text-body-secondary text-center">
              Other Products
            </h4>
            <ProductsSlider showIcons={false} />
          </Col>
        </Row>
      </Container>
      <ScrollToTop />
    </section>
  );
}
