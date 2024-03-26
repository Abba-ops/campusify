import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import {
  Container,
  ListGroup,
  Button,
  Image,
  Col,
  Row,
  Form,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/cartSlice";
import { numberWithCommas } from "../utils/cartUtils";
import { BsArrowLeft } from "react-icons/bs";
import MetaTags from "../components/MetaTags";

export default function UserCart() {
  const { cartItems, itemsPrice, deliveryPrice, taxPrice, totalPrice } =
    useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = (product, quantity) =>
    dispatch(addToCart({ ...product, quantity }));
  const removeFromCartHandler = (id) => dispatch(removeFromCart(id));
  const checkoutHandler = () => navigate("/login?redirect=/checkout");

  const renderCartItem = (product) => (
    <ListGroup.Item key={product._id}>
      <Row className="align-items-center">
        <Col xs={6} lg={2}>
          <Image src={product.imageUrl} fluid />
        </Col>
        <Col
          xs={6}
          lg={4}
          as={Link}
          to={`/product/${product._id}`}
          className="text-decoration-none text-capitalize">
          {product.productName}
        </Col>
        <Col xs={6} lg={2} className="mt-4 mt-lg-0">
          <Form.Select
            value={product.quantity}
            onChange={(e) => addToCartHandler(product, Number(e.target.value))}>
            {[...Array(product.countInStock).keys()].map((x) => (
              <option value={x + 1} key={x + 1}>
                {x + 1}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={6} lg={2} className="text-primary text-lg-center">
          &#8358;{numberWithCommas(product.price)}
        </Col>
        <Col lg={2} className="text-end">
          <MdDelete
            className="fs-4"
            onClick={() => removeFromCartHandler(product._id)}
          />
        </Col>
      </Row>
    </ListGroup.Item>
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-5">
      <MetaTags
        title="Your Shopping Cart - Campusify"
        description="View and manage items in your shopping cart on Campusify."
        keywords="shopping cart, items, view, manage, checkout"
      />
      <Container>
        <Row>
          <Col lg={8}>
            <ListGroup>
              <ListGroup.Item>
                <h5 className="text-uppercase my-2">Shopping Cart</h5>
              </ListGroup.Item>
              {cartItems.length === 0 ? (
                <ListGroup.Item>
                  <div>Your shopping cart is currently empty.</div>
                </ListGroup.Item>
              ) : (
                cartItems.map(renderCartItem)
              )}
            </ListGroup>
            <Button
              to={"/"}
              as={Link}
              size="sm"
              className="my-5 px-3 fw-semibold"
              variant="dark">
              <BsArrowLeft className="me-2" /> Continue Shopping
            </Button>
          </Col>
          <Col lg={4}>
            <ListGroup>
              <ListGroup.Item>
                <Row className="my-3">
                  <Col xs={6}>
                    {cartItems.length === 1
                      ? "1 item"
                      : `${cartItems.length} items`}
                  </Col>
                  <Col xs={6}>
                    <div className="text-primary text-end">
                      &#8358;{numberWithCommas(itemsPrice)}
                    </div>
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col xs={6}>Delivery Fee</Col>
                  <Col xs={6}>
                    <div className="text-primary text-end">
                      &#8358;{numberWithCommas(deliveryPrice)}
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="my-3">
                  <Col xs={6}>Total Taxes</Col>
                  <Col xs={6}>
                    <div className="text-primary text-end">
                      &#8358;{numberWithCommas(taxPrice)}
                    </div>
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col xs={6}>Total Amount</Col>
                  <Col xs={6}>
                    <div className="text-primary text-end">
                      &#8358;{numberWithCommas(totalPrice)}
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-flex justify-content-center my-3">
                  <Button
                    onClick={checkoutHandler}
                    disabled={cartItems.length === 0}
                    className="text-uppercase px-4 fw-semibold"
                    variant="dark">
                    Proceed to Checkout
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
