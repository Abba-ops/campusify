import React from "react";
import { MdDelete, MdArrowBackIos } from "react-icons/md";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/cartSlice";
import { numberWithCommas } from "../utils/cartUtils";

export default function CartScreen() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/checkout");
  };

  const renderCartItem = (product, index) => (
    <ListGroup.Item key={index}>
      <Row className="align-items-center">
        <Col xs={6} lg={2}>
          <Image src={product.imageUrl} fluid rounded />
        </Col>
        <Col xs={6} lg={4}>
          <Link
            to={`/product/${product._id}`}
            className="text-decoration-none text-capitalize">
            {product.productName}
          </Link>
        </Col>
        <Col xs={6} lg={2} className="mt-3 mt-lg-0">
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
        <Col xs={6} lg={2}>
          <div className="text-lg-center text-primary">
            &#8358;{numberWithCommas(product.price)}
          </div>
        </Col>
        <Col lg={2} className="text-end">
          <Link>
            <h4>
              <MdDelete onClick={() => removeFromCartHandler(product._id)} />
            </h4>
          </Link>
        </Col>
      </Row>
    </ListGroup.Item>
  );

  return (
    <section className="bg-white py-5">
      <Container>
        <Row>
          <Col lg={8}>
            <ListGroup>
              <ListGroup.Item>
                <h5 className="text-uppercase my-2">Shopping Cart</h5>
              </ListGroup.Item>
              {cartItems.map(renderCartItem)}
              {cartItems.length === 0 && (
                <ListGroup.Item>
                  <div>There are no more items in your cart</div>
                </ListGroup.Item>
              )}
            </ListGroup>
            <Link to={"/"}>
              <Button size="sm" className="my-5 px-3" variant="dark">
                <MdArrowBackIos />
                Continue Shopping
              </Button>
            </Link>
          </Col>
          <Col lg={4}>
            <ListGroup>
              <ListGroup.Item>
                <Row className="my-3">
                  <Col xs={6}>
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                    items
                  </Col>
                  <Col xs={6}>
                    <div className="text-end text-primary">
                      &#8358;{numberWithCommas(cart.itemsPrice)}
                    </div>
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col xs={6}>Delivery</Col>
                  <Col xs={6}>
                    <div className="text-end text-primary">
                      &#8358;{numberWithCommas(cart.shippingPrice)}
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="my-3">
                  <Col xs={6}>Taxes</Col>
                  <Col xs={6}>
                    <div className="text-end text-primary">
                      &#8358;{numberWithCommas(cart.taxPrice)}
                    </div>
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col xs={6}>Total</Col>
                  <Col xs={6}>
                    <div className="text-end text-primary">
                      &#8358;{numberWithCommas(cart.totalPrice)}
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-flex justify-content-center my-3">
                  <Button
                    onClick={checkoutHandler}
                    disabled={cartItems.length === 0}
                    className="text-uppercase px-4"
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
