import { RiShoppingBag2Fill } from "react-icons/ri";
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

export default function ProductPreviewModal({ product, show, handleClose }) {
  const [quantity, setQuantity] = useState(1);
  const [showAddedModal, setShowAddedModal] = useState(false);

  const dispatch = useDispatch();

  const handleAddToCartClose = () => setShowAddedModal(false);
  const handleAddToCartShow = () => setShowAddedModal(true);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }));
    handleClose();
    handleAddToCartShow();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Row>
          <Col lg={6} className="d-flex">
            <Image src={product.imageUrl} fluid rounded />
          </Col>
          <Col lg={6}>
            <Modal.Header>
              <Modal.Title className="text-uppercase">
                {product.productName}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Modal.Title className="text-primary">
                &#8358;{numberWithCommas(product.price)}
              </Modal.Title>
              <p className="my-3 text-muted">{product.productDescription}</p>
              <Row>
                <Col>
                  {product.countInStock > 0 && (
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
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={handleClose}
                className="text-white text-uppercase">
                Close
              </Button>
              <Button
                variant="dark"
                onClick={addToCartHandler}
                className="text-uppercase">
                Add to cart
              </Button>
            </Modal.Footer>
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
