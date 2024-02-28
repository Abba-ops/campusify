import React from "react";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/esm/Image";
import Col from "react-bootstrap/esm/Col";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import AddedToCartModal from "./CartPreviewModal";
import { numberWithCommas } from "../utils/cartUtils";
import Stack from "react-bootstrap/esm/Stack";
import StarRating from "./StarRating";

export default function ProductPreviewModal({ product, show, handleClose }) {
  const [showAddedModal, setShowAddedModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const handleAddToCartClose = () => setShowAddedModal(false);
  const handleAddToCartShow = () => setShowAddedModal(true);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }));
    handleClose();
    handleAddToCartShow();
  };

  const isOutOfStock = product.countInStock <= 0;

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Row className="align-items-stretch">
          <Col lg={6} className="d-flex align-items-center">
            <Image
              src={product.imageUrl}
              fluid
              rounded
              style={{ height: "100%" }}
            />
          </Col>
          <Col lg={6}>
            <Modal.Body>
              <Modal.Title className="text-uppercase mb-3">
                {product.productName}
              </Modal.Title>
              <StarRating value={product.rating} size={24} />
              <p className="text-muted mb-3">{product.reviewCount} Reviews</p>
              <Modal.Title className="text-primary mb-4">
                &#8358;{numberWithCommas(product.price)}
              </Modal.Title>
              <p className="my-3">{product.productDescription}</p>
              <Row className="mb-3">
                <Col>
                  {isOutOfStock ? (
                    <p className="text-danger">Out of Stock</p>
                  ) : (
                    <Form.Select
                      onChange={(e) => setQuantity(Number(e.target.value))}>
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
                  variant="primary"
                  onClick={handleClose}
                  className="text-white text-uppercase">
                  Close
                </Button>
                <Button
                  variant="dark"
                  onClick={addToCartHandler}
                  className="text-uppercase"
                  disabled={isOutOfStock}>
                  {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </Button>
              </Stack>
            </Modal.Body>
          </Col>
        </Row>
      </Modal>
      <AddedToCartModal
        product={product}
        show={showAddedModal}
        onHide={() => setShowAddedModal(false)}
      />
    </>
  );
}
