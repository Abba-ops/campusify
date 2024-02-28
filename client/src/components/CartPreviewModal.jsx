import React from "react";
import {
  Alert,
  Button,
  Col,
  Image,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import { useSelector } from "react-redux";
import { numberWithCommas } from "../utils/cartUtils";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";

export default function CartPreviewModal({ show, onHide, product }) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const isCartEmpty = cartItems.length === 0;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Row xs={1} md={2} className="g-4">
        <Col lg={6}>
          <Modal.Body>
            <Alert variant="success" className="border-0 rounded-0 mb-3">
              Product successfully added to your shopping cart
            </Alert>
            <div className="mb-3" style={{ height: "100%" }}>
              <Image src={product.imageUrl} fluid className="h-100" />
            </div>
          </Modal.Body>
        </Col>
        <Col lg={6}>
          <Modal.Body>
            <Row className="mb-3">
              <Col
                xs={12}
                className="d-flex flex-column justify-content-center">
                <h6 className="text-uppercase mb-3">{product.productName}</h6>
                <div className="mb-2">
                  <StarRating value={product.rating} size={16} />
                </div>
                <h6 className="text-primary">
                  &#8358;{numberWithCommas(product.price)}
                </h6>
              </Col>
            </Row>
            <Modal.Title as="h6" className="text-uppercase mb-3">
              {cartItems.length === 1 ? "1 item" : `${cartItems.length} items`}{" "}
              in your cart
            </Modal.Title>
            <div className="mb-4">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <ListGroupItems
                    label="Total items"
                    value={numberWithCommas(cart.itemsPrice)}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <ListGroupItems
                    label="Shipping"
                    value={numberWithCommas(cart.shippingPrice)}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <ListGroupItems
                    label="Taxes"
                    value={numberWithCommas(cart.taxPrice)}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <ListGroupItems
                    label="Total"
                    value={numberWithCommas(cart.totalPrice)}
                  />
                </ListGroup.Item>
              </ListGroup>
            </div>
            <Stack direction="vertical" gap={3} className="mt-4">
              <Button
                disabled={isCartEmpty}
                className="text-uppercase w-100"
                variant="dark"
                onClick={onHide}>
                Continue Shopping
              </Button>
              <Link to="/checkout" className="text-decoration-none">
                <Button
                  disabled={isCartEmpty}
                  className="text-uppercase w-100"
                  variant="dark">
                  Proceed to Checkout
                </Button>
              </Link>
            </Stack>
          </Modal.Body>
        </Col>
      </Row>
    </Modal>
  );
}

const ListGroupItems = ({ label, value }) => (
  <div className="d-flex justify-content-between align-items-center mb-2">
    <span className="text-muted">{label}</span>
    <h6 className="text-primary">&#8358;{value}</h6>
  </div>
);
