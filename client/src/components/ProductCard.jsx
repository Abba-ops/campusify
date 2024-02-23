import { FaSearch } from "react-icons/fa";
import { Button, Card, Stack } from "react-bootstrap";
import ProductModal from "./ProductPreviewModal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { numberWithCommas } from "../utils/cartUtils";
import StarRating from "./StarRating";

export default function ProductCard({ product, showIcon }) {
  const [modalShow, setModalShow] = useState(false);
  const [iconShow, setIconShow] = useState(false);

  const { productName, imageUrl, price, rating, _id } = product;

  const handleShowIcon = () => {
    setIconShow(true);
  };

  const handleHideIcon = () => {
    setIconShow(false);
  };

  return (
    <>
      <Card
        className="text-center rounded-0 border-0"
        onMouseEnter={handleShowIcon}
        onMouseLeave={handleHideIcon}>
        <Link to={`/product/${_id}`} className="text-decoration-none">
          <Card.Img variant="top" src={imageUrl} className="rounded-0" />
        </Link>
        <Card.Body>
          <Card.Text className="text-truncate text-capitalize">
            <Link
              to={`/product/${_id}`}
              className="text-decoration-none text-muted">
              {productName}
            </Link>
          </Card.Text>
          <Card.Text className="d-flex justify-content-center">
            <StarRating value={rating} />
          </Card.Text>
          <Card.Title>&#8358;{numberWithCommas(price)}</Card.Title>
          {showIcon && (
            <Stack className="position-absolute top-0 end-0 my-3 mx-3">
              <Button
                style={{
                  opacity: !iconShow && 0,
                  visibility: !iconShow && "hidden",
                  transition: "opacity 1.5s ease-in-out",
                }}
                variant="dark"
                className={`rounded-pill py-2 visible-on-hover`}
                onClick={() => setModalShow(true)}>
                <FaSearch />
              </Button>
            </Stack>
          )}
        </Card.Body>
      </Card>
      <ProductModal
        show={modalShow}
        product={product}
        handleClose={() => setModalShow(false)}
      />
    </>
  );
}
