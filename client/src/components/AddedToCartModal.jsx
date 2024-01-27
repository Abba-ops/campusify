import React from "react";
import { Alert, ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/esm/Image";
import Row from "react-bootstrap/esm/Row";
import Stack from "react-bootstrap/esm/Stack";
import { useSelector } from "react-redux";
import { numberWithCommas } from "../utils/cartUtils";

export default function AddedToCartModal({ show, onHide, product }) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Row>
        <Col lg={6}>
          <Modal.Body>
            <Alert variant="success" className="border-0">
              Product successfully added to your shopping cart
            </Alert>
            <Row>
              <Col xs={6}>
                <Image src={product.imageUrl} fluid rounded />
              </Col>
              <Col xs={6}>
                <h6 className="text-uppercase">{product.productName}</h6>
                <div className="text-primary">
                  &#8358;{numberWithCommas(product.price)}
                </div>
                <div>{product.category}</div>
              </Col>
            </Row>
          </Modal.Body>
        </Col>
        <Col lg={6}>
          <Modal.Header>
            <Modal.Title as={"h6"} className="text-uppercase">
              There are{" "}
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items in
              your cart
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col xs={6}>
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                    items
                  </Col>
                  <Col xs={6} className="text-end  text-primary">
                    &#8358;{numberWithCommas(cart.itemsPrice)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col xs={6}>Shipping</Col>
                  <Col xs={6} className="text-end  text-primary">
                    &#8358;{numberWithCommas(cart.shippingPrice)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col xs={6}>Taxes</Col>
                  <Col xs={6} className="text-end  text-primary">
                    &#8358;{numberWithCommas(cart.taxPrice)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col xs={6}>Total</Col>
                  <Col xs={6} className="text-end  text-primary">
                    &#8358;{numberWithCommas(cart.totalPrice)}
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              size="sm"
              disabled={cartItems.length === 0}
              className="rounded-0 text-uppercase raleway"
              variant="dark">
              Continue Shopping
            </Button>
            <Button
              size="sm"
              disabled={cartItems.length === 0}
              className="rounded-0 text-uppercase raleway"
              variant="dark">
              Proceed to Checkout
            </Button>
          </Modal.Footer>
        </Col>
      </Row>
      {/* <Row>
        <Col lg={6} className="p-3">
          <Row>
            <Modal.Title className="text-success fw-light fs-5 mb-3">
              Product successfully added to your shopping cart
            </Modal.Title>
            <Col lg={6}>
              <Image src={product.imageUrl} fluid />
            </Col>
            <Col lg={6}>
              <h6>{product.productName}</h6>
              <h6 >&#8358;{product.price}</h6>
              <p>
                Quantity: <span>{cart.quantity}</span>
              </p>
            </Col>
          </Row>
        </Col>
        <Col lg={6} className="border-start">
          <Modal.Header>
            <Modal.Title className="raleway fw-light">
              There are{" "}
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items in
              your cart
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p >
              Total products:{" "}
              <span className="text-primary">&#8358;{cart.itemsPrice}</span>
            </p>
            <p >
              Total shipping:{" "}
              <span className="text-primary">&#8358;{cart.shippingPrice}</span>
            </p>
            <p >
              Taxes:{" "}
              <span className="text-primary">&#8358;{cart.taxPrice}</span>
            </p>
            <p >
              Total:{" "}
              <span className="text-primary">&#8358;{cart.totalPrice}</span>
            </p>
          </Modal.Body>
          <Stack direction="horizontal" gap={3} className="mb-4">
            <Button
              size="sm"
              disabled={cartItems.length === 0}
              className="rounded-0 text-uppercase raleway"
              variant="dark">
              Continue Shopping
            </Button>
            <Button
              size="sm"
              disabled={cartItems.length === 0}
              className="rounded-0 text-uppercase raleway"
              variant="dark">
              Proceed to Checkout
            </Button>
          </Stack>
        </Col>
      </Row> */}
    </Modal>
  );
}
