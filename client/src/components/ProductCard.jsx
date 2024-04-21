import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../utils/cartUtils";
import StarRating from "./StarRating";
import ProductPreviewModal from "./ProductPreviewModal";

export default function ProductCard({ product, showPreviewIcon }) {
  const [isPreviewIconVisible, setPreviewIconVisibility] = useState(false);
  const [isPreviewModalVisible, setPreviewModalVisibility] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState(false);

  const { productName, imageUrl, price, rating, _id, createdAt } = product;

  useEffect(() => {
    const createdAtDate = new Date(createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - createdAtDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    const newThresholdDays = 30;

    setIsNewProduct(daysDifference <= newThresholdDays);
  }, [createdAt]);

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
        className="text-center rounded-0"
        onMouseEnter={handleShowPreviewIcon}
        onMouseLeave={handleHidePreviewIcon}>
        <Link to={`/product/${_id}`} className="text-decoration-none">
          <div className="image-container">
            <Card.Img variant="top" src={imageUrl} className="rounded-0" />
          </div>
        </Link>
        <Card.Body>
          {isNewProduct && (
            <Badge className="position-absolute top-0 start-0 m-3" bg="dark">
              New
            </Badge>
          )}
          <Card.Text className="text-truncate text-capitalize">
            <Link to={`/product/${_id}`} className="text-decoration-none">
              {productName}
            </Link>
          </Card.Text>
          <div className="d-flex justify-content-center mb-3">
            <StarRating value={rating} size={16} />
          </div>
          <Card.Title>&#8358;{numberWithCommas(price)}</Card.Title>
          {showPreviewIcon && (
            <>
              <Button
                className="position-absolute top-0 end-0 my-3 mx-3 d-none d-lg-block rounded-pill py-2 visible-on-hover"
                style={{
                  opacity: isPreviewIconVisible ? 1 : 0,
                  visibility: isPreviewIconVisible ? "visible" : "hidden",
                  transition: "opacity 1.5s ease-in-out",
                }}
                variant="dark"
                onClick={handleShowPreviewModal}>
                <FaSearch />
              </Button>
              <Button
                className="position-absolute top-0 end-0 my-3 mx-3 rounded-pill py-2 d-lg-none"
                variant="dark"
                onClick={handleShowPreviewModal}>
                <FaSearch />
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
      <ProductPreviewModal
        product={product}
        show={isPreviewModalVisible}
        handleClose={handleHidePreviewModal}
      />
    </>
  );
}
