import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import {
  useDeleteReviewMutation,
  useGetProductDetailsQuery,
} from "../../features/productsApiSlice";
import { toast } from "react-toastify";
import StarRating from "../../components/StarRating";
import { MdDelete } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import TablePlaceholder from "../../components/TablePlaceholder";
import { numberWithCommas } from "../../utils/cartUtils";

export default function AdminProductDetails() {
  const [visibleComments, setVisibleComments] = useState(3);
  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [deleteReview] = useDeleteReviewMutation();

  const handleDeleteReview = async (reviewId) => {
    try {
      const res = await deleteReview({ productId, reviewId }).unwrap();

      if (res?.success) {
        refetch();
        toast.success(res?.message);
      }
    } catch (error) {
      toast.error(
        (error && error?.data?.message) ||
          "An error occurred while deleting the review."
      );
    }
  };

  const handleLoadMore = () => {
    setVisibleComments((prevVisibleComments) => prevVisibleComments + 3);
  };

  const sortedReviews =
    product &&
    product?.data?.reviews?.slice().sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin/dashboard/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/admin/dashboard/products">Products</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              <span className="d-inline d-lg-none">
                {product?.data?.productName?.slice(0, 10)}
                {product?.data?.productName?.length > 10 && "..."}
              </span>
              <span className="d-none d-lg-inline">
                {product?.data?.productName?.slice(0, 20)}
                {product?.data?.productName?.length > 20 && "..."}
              </span>
            </>
          )}
        </Breadcrumb.Item>
      </Breadcrumb>
      {isError ? (
        <div className="text-center mt-5">
          <h4 className="text-danger">Error Loading Product Details</h4>
          <p className="mt-3">
            Failed to load product details. Please try again later.
          </p>
        </div>
      ) : isLoading ? (
        <>
          {[...Array(6)].map((_, index) => (
            <TablePlaceholder key={index} />
          ))}
        </>
      ) : (
        <>
          <Row>
            <Col md={4} className="mb-4 mb-lg-0">
              <Card className="border-0 rounded-0 shadow-sm">
                <Card.Body>
                  <div className="image-container">
                    <Image
                      fluid
                      loading="lazy"
                      className="product-image"
                      src={`${product?.data?.imageUrl}`}
                    />
                  </div>
                </Card.Body>
              </Card>
              <ListGroup variant="flush" className="mt-4">
                {sortedReviews && sortedReviews?.length > 0 ? (
                  sortedReviews?.slice(0, visibleComments)?.map((review) => (
                    <ListGroup.Item
                      key={review?._id}
                      className="mb-3 p-3 shadow-sm">
                      <div className="d-flex align-items-center mb-3">
                        <Link to={`/admin/dashboard/users/${review?.user}`}>
                          <div className="flex-shrink-0 me-3">
                            <Image
                              fluid
                              loading="lazy"
                              roundedCircle
                              src={review?.profilePictureURL}
                              className="profile-picture-sm text-break"
                              alt={`${review?.name}'s Profile`}
                            />
                          </div>
                        </Link>
                        <div>
                          <Link
                            to={`/admin/dashboard/users/${review?.user}`}
                            className="text-decoration-none">
                            <h6 className="mb-1 text-break">{review?.name}</h6>
                          </Link>
                          <small className="text-muted">
                            {formatDistanceToNow(new Date(review?.createdAt), {
                              addSuffix: true,
                            })}
                          </small>
                        </div>
                      </div>
                      <div className="mb-3">
                        <StarRating value={review?.rating} size={18} />
                      </div>
                      <p className="mb-2 text-break">{review?.comment}</p>
                      <Button
                        variant="link"
                        onClick={() => handleDeleteReview(review?._id)}
                        className="position-absolute top-0 end-0">
                        <MdDelete size={24} />
                      </Button>
                    </ListGroup.Item>
                  ))
                ) : (
                  <div className="text-center mt-4">
                    <h5>No Reviews Available</h5>
                    <p>
                      Sorry, there are currently no reviews available for this
                      product.
                    </p>
                  </div>
                )}
                <div className="d-flex justify-content-center">
                  {visibleComments <
                    (sortedReviews ? sortedReviews?.length : 0) && (
                    <Button
                      variant="dark"
                      onClick={handleLoadMore}
                      className="text-uppercase my-4 px-4 fw-semibold">
                      Load More
                    </Button>
                  )}
                </div>
              </ListGroup>
            </Col>
            <Col md={8}>
              <Card className="border-0 rounded-0 shadow-sm">
                <Card.Body>
                  <h5>{product?.data?.productName}</h5>
                  <p>{product?.data?.productDescription}</p>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Category: </strong>
                      {product?.data?.category?.name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Subcategory: </strong>
                      {product?.data?.subcategory?.name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Brand: </strong>
                      {product?.data?.brand}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Price: </strong>&#8358;
                      {numberWithCommas(product?.data?.price)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>In Stock: </strong>
                      {product?.data?.countInStock}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Rating: </strong>
                      {product?.data?.rating} / 5
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Review Count: </strong>
                      {product?.data?.reviewCount}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
