import React, { useState } from "react";
import { Button, Image, Col, Modal, Row, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { numberWithCommas } from "../utils/cartUtils";
import StarRating from "./StarRating";
import CartPreviewModal from "./CartPreviewModal";

export default function ProductPreviewModal({ product, show, handleClose }) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: selectedQuantity }));
    openModal();
    handleClose();
  };

  const isOutOfStock = product?.countInStock <= 0;

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Body>
          <Row>
            <Col lg={6} className="mb-3 mb-lg-0">
              <div className="image-container">
                <Image
                  fluid
                  loading="lazy"
                  className="product-image"
                  src={`${product?.imageUrl}`}
                />
              </div>
            </Col>
            <Col lg={6}>
              <Modal.Title className="text-uppercase mb-3">
                {product?.productName}
              </Modal.Title>
              <div className="mb-3">
                <StarRating
                  value={product?.rating}
                  text={`${product?.reviewCount} ${
                    product?.reviewCount === 1 ? "Review" : "Reviews"
                  }`}
                />
              </div>
              <p className="my-3 text-break">{product?.productDescription}</p>
              <Modal.Title className="text-primary mb-4">
                &#8358;{numberWithCommas(product?.price)}
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
                      {[...Array(product?.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleClose}
            className="text-white px-4"
            variant="primary">
            Close
          </Button>
          <Button
            variant="dark"
            onClick={handleAddToCart}
            className="px-4"
            disabled={isOutOfStock}>
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </Button>
        </Modal.Footer>
      </Modal>
      <CartPreviewModal
        handleClose={closeModal}
        show={isModalOpen}
        product={product}
      />
    </>
  );
}
