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
    <Modal show={show} size="lg" onHide={onHide} centered>
      <Modal.Body>
        <Row>
          <Col lg={6} className="mb-4 mb-lg-0">
            <Alert variant="success" className="border-0 rounded-0 mb-3">
              Product successfully added to your shopping cart
            </Alert>
            <Row>
              <Col>
                <Image src={product.imageUrl} fluid />
              </Col>
              <Col>
                <h5>{product.productName}</h5>
                <h6 className="text-primary my-3">
                  &#8358;{numberWithCommas(product.price)}
                </h6>
                <StarRating value={product.rating} size={16} />
              </Col>
            </Row>
          </Col>
          <Col lg={6}>
            <Modal.Title className="text-uppercase mb-3">
              {cartItems.length === 1 ? "1 item" : `${cartItems.length} items`}{" "}
              in your cart
            </Modal.Title>
            <ListGroup variant="flush" className="mb-3">
              <ListGroup.Item>
                <ListGroupItem
                  label="Total items"
                  value={numberWithCommas(cart.itemsPrice)}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <ListGroupItem
                  label="Shipping"
                  value={numberWithCommas(cart.shippingPrice)}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <ListGroupItem
                  label="Taxes"
                  value={numberWithCommas(cart.taxPrice)}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <ListGroupItem
                  label="Total"
                  value={numberWithCommas(cart.totalPrice)}
                />
              </ListGroup.Item>
            </ListGroup>
            <Stack direction="horizontal" gap={3}>
              <Button
                size="sm"
                variant="dark"
                onClick={onHide}
                className="text-uppercase"
                disabled={isCartEmpty}>
                Continue shopping
              </Button>
              <Link to="/checkout">
                <Button variant="dark" size="sm" className="text-uppercase">
                  Proceed to checkout
                </Button>
              </Link>
            </Stack>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

const ListGroupItem = ({ label, value }) => (
  <div className="d-flex justify-content-between align-items-center">
    <span className="text-muted">{label}</span>
    <h6 className="text-primary">&#8358;{value}</h6>
  </div>
);
