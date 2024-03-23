import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  FloatingLabel,
  Form,
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

      if (res.success) {
        refetch();
        toast.success(res.message);
      }
    } catch (error) {
      toast.error((error && error.data.message) || "");
    }
  };

  const handleLoadMore = () => {
    setVisibleComments((prevVisibleComments) => prevVisibleComments + 3);
  };

  const sortedReviews =
    product &&
    product?.data?.reviews.slice().sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/admin/dashboard/"}>Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={"/admin/dashboard/products"}>Products</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          {product && `${product.data.productName.slice(0, 10)}...`}
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
              <Card className="border-0 rounded-0 shadow-sm p-3">
                <Card.Img variant="top" src={product.data.imageUrl} />
                <Card.Body>
                  <Card.Title>{product.data.productName} </Card.Title>
                  <div className="my-3">
                    <StarRating
                      value={product.data.rating}
                      size={16}
                      text={`${product.data.reviewCount} ${
                        product.data.reviewCount === 1 ? "Review" : "Reviews"
                      }`}
                    />
                  </div>
                </Card.Body>
              </Card>
              <Card className="border-0 rounded-0 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-uppercase mb-3">
                    Customer Reviews
                  </Card.Title>
                  <ListGroup variant="flush">
                    {sortedReviews && sortedReviews.length > 0 ? (
                      sortedReviews.slice(0, visibleComments).map((review) => (
                        <ListGroup.Item
                          key={review._id}
                          className="mb-3 p-3 shadow-sm">
                          <div className="d-flex align-items-center mb-3">
                            <Link to={`/admin/dashboard/users/${review.user}`}>
                              <div className="flex-shrink-0 me-3">
                                <Image
                                  fluid
                                  loading="lazy"
                                  roundedCircle
                                  src={review.profilePictureURL}
                                  className="profile-picture-sm text-break"
                                  alt={`${review.name}'s Profile`}
                                />
                              </div>
                            </Link>
                            <div>
                              <Link
                                to={`/admin/dashboard/users/${review.user}`}
                                className="text-decoration-none">
                                <h6 className="mb-1 text-break">
                                  {review.name}
                                </h6>
                              </Link>
                              <small className="text-muted">
                                {formatDistanceToNow(
                                  new Date(review.createdAt),
                                  {
                                    addSuffix: true,
                                  }
                                )}
                              </small>
                            </div>
                          </div>
                          <div className="mb-3">
                            <StarRating value={review.rating} size={18} />
                          </div>
                          <p className="mb-2 text-break">{review.comment}</p>
                          <Button
                            variant="link"
                            onClick={() => handleDeleteReview(review._id)}
                            className="position-absolute top-0 end-0">
                            <MdDelete className="fs-4" />
                          </Button>
                        </ListGroup.Item>
                      ))
                    ) : (
                      <div className="text-center mt-5">
                        <p className="text-muted">No reviews available</p>
                      </div>
                    )}
                    <div className="d-flex justify-content-center">
                      {visibleComments <
                        (sortedReviews ? sortedReviews.length : 0) && (
                        <Button
                          variant="dark"
                          onClick={handleLoadMore}
                          className="text-uppercase mb-4">
                          Load More
                        </Button>
                      )}
                    </div>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col md={8}>
              <Card className="border-0 rounded-0 shadow-sm">
                <Card.Body>
                  <Card.Title>User Information</Card.Title>
                  <Form>
                    <FloatingLabel label="Product ID">
                      <Form.Control
                        readOnly
                        type="text"
                        className="border-0"
                        value={product.data._id}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Product Description">
                      <Form.Control
                        rows={3}
                        readOnly
                        as="textarea"
                        className="border-0"
                        value={product.data.productDescription}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Category">
                      <Form.Control
                        readOnly
                        type="text"
                        className="border-0"
                        value={product.data.category.name}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Subcategory">
                      <Form.Control
                        readOnly
                        type="text"
                        className="border-0"
                        value={product.data.subcategory.name}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Brand">
                      <Form.Control
                        readOnly
                        type="text"
                        className="border-0"
                        value={product.data.brand}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Vendor Name">
                      <Form.Control
                        readOnly
                        type="text"
                        className="border-0"
                        value={product.data.vendor.vendorName}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Vendor Email">
                      <Form.Control
                        readOnly
                        type="text"
                        className="border-0"
                        value={product.data.vendor.vendorEmail}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Vendor Phone">
                      <Form.Control
                        readOnly
                        type="text"
                        className="border-0"
                        value={product.data.vendor.vendorPhone}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Featured">
                      <Form.Control
                        readOnly
                        type="text"
                        className="border-0"
                        value={product.data.isFeatured}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Sales Count">
                      <Form.Control
                        readOnly
                        type="text"
                        className="border-0"
                        value={product.data.salesCount}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Created At">
                      <Form.Control
                        readOnly
                        type="text"
                        className="border-0"
                        value={
                          product &&
                          new Date(product.data.createdAt).toLocaleDateString()
                        }
                      />
                    </FloatingLabel>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {/* <Row className="mt-4">
            <Col lg={6}>
              <h4>Product Reviews</h4>
              <ListGroup variant="flush">
                {sortedReviews && sortedReviews.length > 0 ? (
                  sortedReviews.slice(0, visibleComments).map((review) => (
                    <ListGroup.Item
                      key={review._id}
                      className="mb-3 p-3 border">
                      <div className="d-flex align-items-center mb-3">
                        <Link to={`/admin/dashboard/users/${review.user}`}>
                          <div className="flex-shrink-0 me-3">
                            <Image
                              fluid
                              loading="lazy"
                              roundedCircle
                              src={review.profilePictureURL}
                              className="profile-picture-sm text-break"
                              alt={`${review.name}'s Profile`}
                            />
                          </div>
                        </Link>
                        <div>
                          <Link
                            to={`/admin/dashboard/users/${review.user}`}
                            className="text-decoration-none">
                            <h6 className="mb-1 text-break">{review.name}</h6>
                          </Link>
                          <small className="text-muted">
                            {formatDistanceToNow(new Date(review.createdAt), {
                              addSuffix: true,
                            })}
                          </small>
                        </div>
                      </div>
                      <div className="mb-3">
                        <StarRating value={review.rating} size={18} />
                      </div>
                      <p className="mb-2 text-break">{review.comment}</p>
                      <Button
                        variant="link"
                        onClick={() => handleDeleteReview(review._id)}
                        className="position-absolute top-0 end-0">
                        <MdDelete className="fs-4" />
                      </Button>
                    </ListGroup.Item>
                  ))
                ) : (
                  <div className="text-center">No reviews available</div>
                )}
                <div className="d-flex justify-content-center">
                  {visibleComments <
                    (sortedReviews ? sortedReviews.length : 0) && (
                    <Button
                      variant="dark"
                      onClick={handleLoadMore}
                      className="text-uppercase mb-4">
                      Load More
                    </Button>
                  )}
                </div>
              </ListGroup>
            </Col>
          </Row> */}
        </>
      )}
    </>
  );
}
