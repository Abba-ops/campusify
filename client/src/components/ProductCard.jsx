import { FaSearch } from "react-icons/fa";
import { Button, Card } from "react-bootstrap";
import ProductModal from "./ProductPreviewModal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { numberWithCommas } from "../utils/cartUtils";
import StarRating from "./StarRating";

export default function ProductCard({ product, showPreviewIcon }) {
  const [isPreviewIconVisible, setPreviewIconVisibility] = useState(false);
  const [isPreviewModalVisible, setPreviewModalVisibility] = useState(false);

  const { productName, imageUrl, price, rating, _id } = product;

  const handleShowPreviewIcon = () => {
    setPreviewIconVisibility(true);
  };

  const handleHidePreviewIcon = () => {
    setPreviewIconVisibility(false);
  };

  const handleShowPreviewModal = () => {
    setPreviewModalVisibility(true);
  };

  const handleHidePreviewModal = () => {
    setPreviewModalVisibility(false);
  };

  return (
    <>
      <Card
        className="text-center rounded-0 border-0"
        onMouseEnter={handleShowPreviewIcon}
        onMouseLeave={handleHidePreviewIcon}>
        <Link to={`/product/${_id}`} className="text-decoration-none">
          <Card.Img variant="top" src={imageUrl} className="rounded-0" />
        </Link>
        <Card.Body>
          <Card.Text className="text-truncate text-capitalize text-muted">
            <Link to={`/product/${_id}`} className="text-decoration-none">
              {productName}
            </Link>
          </Card.Text>
          <Card.Text className="d-flex justify-content-center">
            <StarRating value={rating} />
          </Card.Text>
          <Card.Text>
            <h6>&#8358;{numberWithCommas(price)}</h6>
          </Card.Text>
          {showPreviewIcon && (
            <Button
              className="position-absolute top-0 end-0 my-3 mx-3 d-none d-lg-block rounded-pill py-2 visible-on-hover"
              style={{
                opacity: !isPreviewIconVisible && 0,
                visibility: !isPreviewIconVisible && "hidden",
                transition: "opacity 1.5s ease-in-out",
              }}
              variant="dark"
              onClick={handleShowPreviewModal}>
              <FaSearch />
            </Button>
          )}
          <Button
            className="position-absolute top-0 end-0 my-3 mx-3 rounded-pill py-2 d-lg-none"
            variant="dark"
            onClick={handleShowPreviewModal}>
            <FaSearch />
          </Button>
        </Card.Body>
      </Card>
      <ProductModal
        product={product}
        show={isPreviewModalVisible}
        handleClose={handleHidePreviewModal}
      />
    </>
  );
}
