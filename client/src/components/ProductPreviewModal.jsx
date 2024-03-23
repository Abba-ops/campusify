import React, { useState } from "react";
import { Button, Image, Col, Modal, Row, Form, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { numberWithCommas } from "../utils/cartUtils";
import StarRating from "./StarRating";

export default function ProductPreviewModal({ product, show, handleClose }) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: selectedQuantity }));
    handleClose();
  };

  const isOutOfStock = product.countInStock <= 0;

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Row className="align-items-stretch">
          <Col lg={6} className="d-flex align-items-center">
            <Image src={product.imageUrl} fluid rounded className="h-100" />
          </Col>
          <Col lg={6}>
            <Modal.Body>
              <Modal.Title className="text-uppercase mb-3">
                {product.productName}
              </Modal.Title>
              <div className="mb-3">
                <StarRating
                  value={product.rating}
                  text={`${product.reviewCount} ${
                    product.reviewCount === 1 ? "Review" : "Reviews"
                  }`}
                />
              </div>
              <p className="my-3">{product.productDescription}</p>
              <Modal.Title className="text-primary mb-4">
                &#8358;{numberWithCommas(product.price)}
              </Modal.Title>
              <Row className="mb-3">
                <Col>
                  {isOutOfStock ? (
                    <p className="text-danger">Out of Stock</p>
                  ) : (
                    <Form.Select
                      size="lg"
                      onChange={(e) =>
                        setSelectedQuantity(Number(e.target.value))
                      }>
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                </Col>
              </Row>
              <Stack direction="horizontal" gap={3} className="mt-4">
                <Button
                  onClick={handleClose}
                  className="text-uppercase"
                  variant="dark">
                  Close
                </Button>
                <Button
                  variant="light"
                  onClick={handleAddToCart}
                  className="text-uppercase"
                  disabled={isOutOfStock}>
                  {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </Button>
              </Stack>
            </Modal.Body>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
