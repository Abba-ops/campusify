import React from "react";
import { Modal, Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../utils/cartUtils";

export default function CartPreviewModal({ show, handleClose, product }) {
  const { cartItems } = useSelector((state) => state.cart);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="text-uppercase text-truncate">
          {product.productName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6} className="mb-3 mb-lg-0">
            <div className="image-container">
              <Image
                fluid
                loading="lazy"
                className="product-image"
                src={`${product.imageUrl}`}
              />
            </div>
          </Col>
          <Col md={6}>
            <Modal.Title className="text-uppercase mb-3">
              {totalItems} items in your cart
            </Modal.Title>
            <ListGroup variant="flush">
              {cartItems.slice(-5).map((cartItem) => (
                <ListGroup.Item key={cartItem.id}>
                  <Row>
                    <Col xs={2}>
                      <Image
                        src={cartItem.imageUrl}
                        className="profile-picture-sm"
                        alt={cartItem.productName}
                      />
                    </Col>
                    <Col xs={8} className="text-truncate">
                      {cartItem.productName}
                    </Col>
                    <Col xs={2}>&#8358;{numberWithCommas(cartItem.price)}</Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          className="text-uppercase fw-semibold text-white px-4"
          onClick={handleClose}>
          Continue
        </Button>
        <Button
          as={Link}
          to="/cart"
          variant="dark"
          className="text-uppercase fw-semibold px-4">
          Checkout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
