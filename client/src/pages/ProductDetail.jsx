import React, { useState } from "react";
import {
  Image,
  Form,
  Col,
  Row,
  Button,
  Spinner,
  ListGroup,
  Container,
} from "react-bootstrap";
import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetProductDetailsQuery,
} from "../features/productsApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { numberWithCommas } from "../utils/cartUtils";
import ReactStars from "react-rating-stars-component";
import StarRating from "../components/StarRating";
import BackToTop from "../components/BackToTop";
import { toast } from "react-toastify";
import { addToCart } from "../features/cartSlice";
import { formatDistanceToNow } from "date-fns";
import { MdDelete } from "react-icons/md";
import ErrorPage from "./ErrorPage";
import CarouselProducts from "../components/CarouselProducts";
import { FaCheckCircle } from "react-icons/fa";

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [visibleComments, setVisibleComments] = useState(3);

  const { userInfo } = useSelector((state) => state.auth);

  const { productId } = useParams();

  const {
    error,
    refetch,
    isLoading,
    data: product,
  } = useGetProductDetailsQuery(productId);

  console.log("product", product);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product.data, quantity }));
    navigate("/cart");
  };

  const [deleteReview] = useDeleteReviewMutation();

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview({ productId, reviewId });
      refetch();
      toast.success("Review deleted successfully");
    } catch (error) {
      toast.error(error && (error.data.message || error.error));
    }
  };

  const handleLoadMore = () => {
    setVisibleComments((prevVisibleComments) => prevVisibleComments + 3);
  };

  const maxChars = 500;

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (comment.length > maxChars) {
      toast.error(`Maximum ${maxChars} characters allowed.`);
      return;
    }

    try {
      await createReview({
        productId,
        rating: rating,
        comment: comment,
        userId: userInfo.id,
        name: `${userInfo.data.lastName} ${userInfo.data.otherNames}`,
      }).unwrap();
      refetch();
      setRating(0);
      setComment("");
      toast.success("Review submitted successfully");
    } catch (error) {
      toast.error(error && (error.data.message || error.error));
    }
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const sortedReviews =
    product &&
    product?.data?.reviews.slice().sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <section className="bg-white py-5">
      {!error ? (
        <Container>
          <Row>
            <Col lg={4} className="mb-4 mb-lg-0">
              {isLoading ? (
                <div className="placeholder-glow">
                  <span
                    className="placeholder col-12"
                    style={{ height: "400px" }}></span>
                </div>
              ) : (
                <div className="image-container">
                  <Image
                    fluid
                    loading="lazy"
                    className="product-image"
                    src={`${product.data.imageUrl}`}
                  />
                </div>
              )}
            </Col>
            <Col lg={5} className="mb-5 mb-lg-0">
              {isLoading ? (
                <div className="placeholder-glow">
                  <span
                    className="placeholder col-12 mb-3"
                    style={{ height: "30px", width: "80%" }}></span>
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="placeholder"
                      style={{
                        height: "20px",
                        width: "100px",
                        marginRight: "10px",
                      }}></div>
                    <div
                      className="placeholder"
                      style={{ height: "20px", width: "50%" }}></div>
                  </div>
                  <span
                    className="placeholder col-12 mb-3"
                    style={{ height: "20px", width: "50%" }}></span>
                  <span
                    className="placeholder col-12 mb-3"
                    style={{ height: "60px", width: "100%" }}></span>
                  <span
                    className="placeholder col-12 mb-3"
                    style={{ height: "30px", width: "30%" }}></span>
                  <span
                    className="placeholder col-12 mb-3"
                    style={{ height: "50px", width: "100%" }}></span>
                  <span
                    className="placeholder col-12"
                    style={{ height: "50px", width: "100%" }}></span>
                </div>
              ) : (
                <>
                  <h3 className="text-uppercase mb-3">
                    {product.data.productName}
                  </h3>
                  <StarRating
                    value={product.data.rating}
                    text={`${product.data.reviewCount} ${
                      product.data.reviewCount === 1 ? "Review" : "Reviews"
                    }`}
                  />
                  <h6 className="mt-3">
                    {product.data.vendor.vendorName}{" "}
                    {product.data.vendor.verificationStatus && (
                      <FaCheckCircle color="green" title="Verified" />
                    )}
                  </h6>
                  <p className="my-3">{product.data.productDescription}</p>
                  <h4 className="text-primary mb-3">
                    &#8358;{numberWithCommas(product.data.price)}
                  </h4>
                  <Form.Group className="mb-3">
                    <Form.Select
                      size="lg"
                      onChange={(e) => setQuantity(Number(e.target.value))}>
                      {[...Array(product.data.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Button
                    size="lg"
                    variant="dark"
                    className="text-uppercase w-100"
                    onClick={addToCartHandler}
                    disabled={product.data.countInStock === 0}>
                    {product.data.countInStock > 0
                      ? "Add to Cart"
                      : "Out of Stock"}
                  </Button>
                </>
              )}
            </Col>
            <Col lg={3}>
              <h4 className="text-uppercase text-center mb-0">
                Other Products
              </h4>
              <CarouselProducts lg={12} showPreviewIcon={false} />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={6}>
              {isLoading ? (
                <div className="placeholder-glow">
                  <span
                    className="placeholder col-12 mb-3"
                    style={{ height: "40px" }}></span>
                  <span
                    className="placeholder col-12"
                    style={{ height: "20px" }}></span>
                  <span
                    className="placeholder col-10"
                    style={{ height: "15px" }}></span>
                  <span
                    className="placeholder col-12 mb-3"
                    style={{ height: "70px" }}></span>
                  <span
                    className="placeholder col-8"
                    style={{ height: "15px" }}></span>
                  <span
                    className="placeholder col-10"
                    style={{ height: "20px" }}></span>
                  <span
                    className="placeholder col-6"
                    style={{ height: "15px" }}></span>
                  <span
                    className="placeholder col-12"
                    style={{ height: "25px" }}></span>
                  <span
                    className="placeholder col-8"
                    style={{ height: "15px" }}></span>
                  <span
                    className="placeholder col-10"
                    style={{ height: "20px" }}></span>
                </div>
              ) : (
                <>
                  <h5 className="text-uppercase mb-3">Customer Reviews</h5>
                  {product && product.data.reviews.length === 0 && (
                    <>
                      <p>No reviews yet for {product.data.productName}.</p>
                      <p>
                        Be the first to share your thoughts and help others make
                        informed decisions about this product.
                      </p>
                    </>
                  )}
                  <ListGroup variant="flush">
                    {product &&
                      sortedReviews &&
                      sortedReviews.slice(0, visibleComments).map((review) => (
                        <ListGroup.Item
                          key={review._id}
                          className="mb-3 p-3 border">
                          <div className="d-flex align-items-center mb-3">
                            <Link to={`/profile/${review.user}`}>
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
                                to={`/profile/${review.user}`}
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
                          {userInfo?.data.id === review.user && (
                            <Button
                              variant="link"
                              onClick={() => handleDeleteReview(review._id)}
                              className="position-absolute top-0 end-0">
                              <MdDelete className="fs-4" />
                            </Button>
                          )}
                        </ListGroup.Item>
                      ))}
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
                    <div>
                      <h5 className="text-uppercase mb-3">Write a Review</h5>
                      {userInfo ? (
                        <Form onSubmit={handleReviewSubmit}>
                          <div className="mb-3">
                            <ReactStars
                              count={5}
                              size={24}
                              isHalf={true}
                              activeColor="#ffae42"
                              onChange={ratingChanged}
                            />
                          </div>
                          <Form.Group className="mb-3">
                            <Form.Control
                              rows={3}
                              as="textarea"
                              value={comment}
                              placeholder="Write your review here..."
                              onChange={(e) => setComment(e.target.value)}
                            />
                          </Form.Group>
                          <p className="text-muted">{`Character Count: ${comment.length} / ${maxChars}`}</p>
                          <Button
                            type="submit"
                            className="text-uppercase"
                            disabled={loadingProductReview}
                            variant="dark">
                            {loadingProductReview ? (
                              <Spinner animation="border" size="sm" />
                            ) : (
                              "Submit"
                            )}
                          </Button>
                        </Form>
                      ) : (
                        <>
                          <p className="mb-4">
                            Ready to share your thoughts on{" "}
                            {product.data.productName}? Your feedback can help
                            others make informed decisions.
                          </p>
                          <Link
                            to={"/login"}
                            className="btn btn-dark text-uppercase">
                            Login
                          </Link>
                        </>
                      )}
                    </div>
                  </ListGroup>
                </>
              )}
            </Col>
          </Row>
        </Container>
      ) : (
        <ErrorPage />
      )}
      <BackToTop />
    </section>
  );
}
