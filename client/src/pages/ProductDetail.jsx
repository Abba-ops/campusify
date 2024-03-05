import React, { useEffect, useState } from "react";
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
import MetaTags from "../components/MetaTags";
import { BsArrowLeft, BsCartPlus } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { numberWithCommas } from "../utils/cartUtils";
import { toast } from "react-toastify";
import { addToCart } from "../features/cartSlice";
import { formatDistanceToNow } from "date-fns";
import { MdDelete } from "react-icons/md";
import ErrorPage from "./ErrorPage";
import CarouselProducts from "../components/CarouselProducts";
import { FaCheckCircle } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import StarRating from "../components/StarRating";
import BackToTop from "../components/BackToTop";

export default function ProductDetail() {
  const [visibleComments, setVisibleComments] = useState(3);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [userComment, setUserComment] = useState("");
  const [userRating, setUserRating] = useState(0);

  const { userInfo } = useSelector((state) => state.auth);

  const { productId } = useParams();

  const {
    error: productError,
    refetch: refetchProduct,
    isLoading: productLoading,
    data: productData,
  } = useGetProductDetailsQuery(productId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createReview, { isLoading: loadingCreateReview }] =
    useCreateReviewMutation(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...productData?.data, quantity: cartQuantity }));
    navigate("/cart");
  };

  const [deleteReview] = useDeleteReviewMutation();

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview({ productId, reviewId });
      refetchProduct();
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

    if (userComment.length > maxChars) {
      toast.error(`Maximum ${maxChars} characters allowed.`);
      return;
    }

    try {
      await createReview({
        productId,
        rating: userRating,
        comment: userComment,
        userId: userInfo.id,
        name: `${userInfo.data.lastName} ${userInfo.data.otherNames}`,
      }).unwrap();
      refetchProduct();
      setUserRating(0);
      setUserComment("");
      toast.success("Review submitted successfully");
    } catch (error) {
      toast.error(error && (error.data.message || error.error));
    }
  };

  const ratingChanged = (newRating) => {
    setUserRating(newRating);
  };

  const sortedReviews =
    productData &&
    productData?.data?.reviews.slice().sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-5">
      {!productError ? (
        <Container>
          <Row>
            <Col lg={4} className="mb-3 mb-lg-0">
              {productLoading ? (
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
                    src={`${productData.data.imageUrl}`}
                  />
                </div>
              )}
            </Col>
            <Col lg={5} className="mb-6 mb-lg-0">
              {productLoading ? (
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
                  <MetaTags title={productData.data.productName} />
                  <h3 className="text-uppercase mb-3">
                    {productData.data.productName}
                  </h3>
                  <div className="mb-3">
                    <StarRating
                      value={productData.data.rating}
                      text={`${productData.data.reviewCount} ${
                        productData.data.reviewCount === 1
                          ? "Review"
                          : "Reviews"
                      }`}
                    />
                  </div>
                  <h5>
                    {productData.data.vendor.businessName}{" "}
                    {productData.data.vendor.isApproved && (
                      <FaCheckCircle color="green" title="Verified" />
                    )}
                  </h5>
                  <p className="my-3">{productData.data.productDescription}</p>
                  <h4 className="text-primary mb-3">
                    &#8358;{numberWithCommas(productData.data.price)}
                  </h4>
                  <Form.Group className="mb-3">
                    <Form.Select
                      size="lg"
                      disabled={!productData.data.countInStock > 0}
                      onChange={(e) => setCartQuantity(Number(e.target.value))}>
                      {[...Array(productData.data.countInStock).keys()].map(
                        (x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        )
                      )}
                    </Form.Select>
                  </Form.Group>
                  <div className="d-grid">
                    <Button
                      size="lg"
                      variant="dark"
                      className="text-uppercase"
                      onClick={addToCartHandler}
                      disabled={productData.data.countInStock === 0}>
                      <BsCartPlus className="me-2" />{" "}
                      {productData.data.countInStock > 0
                        ? "Add to Cart"
                        : "Out of Stock"}
                    </Button>
                  </div>
                </>
              )}
            </Col>
            <Col lg={3} className="mb-6">
              {!productLoading && (
                <h4 className="text-uppercase text-center mb-0">
                  Other Products
                </h4>
              )}
              <CarouselProducts lg={12} showPreviewIcon={false} />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              {productLoading ? (
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
                  {productData && productData.data.reviews.length === 0 && (
                    <>
                      <p className="mb-3">
                        No reviews yet for {productData.data.productName}.
                      </p>
                      <p className="mb-3">
                        Be the first to share your thoughts and help others make
                        informed decisions about this product.
                      </p>
                    </>
                  )}
                  <ListGroup variant="flush">
                    {productData &&
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
                                  roundedCircle
                                  loading="lazy"
                                  src={review.profilePictureURL}
                                  className="profile-picture-sm"
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
                          {userInfo && userInfo.data.id === review.user && (
                            <Button
                              variant="link"
                              onClick={() => handleDeleteReview(review._id)}
                              className="position-absolute top-0 end-0">
                              <MdDelete className="fs-4" />
                            </Button>
                          )}
                        </ListGroup.Item>
                      ))}
                    <div className="d-flex justify-content-center mt-3">
                      {visibleComments <
                        (sortedReviews ? sortedReviews.length : 0) && (
                        <Button
                          variant="dark"
                          onClick={handleLoadMore}
                          className="text-uppercase">
                          Load More
                        </Button>
                      )}
                    </div>
                    <div className="mt-5">
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
                              value={userComment}
                              placeholder="Write your review here..."
                              onChange={(e) => setUserComment(e.target.value)}
                            />
                          </Form.Group>
                          <p className="text-muted text-end">{`${userComment.length} / ${maxChars}`}</p>
                          <Button
                            type="submit"
                            className="text-uppercase"
                            disabled={loadingCreateReview}
                            variant="dark">
                            {loadingCreateReview ? (
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
                            {productData.data.productName}? Your feedback can
                            help others make informed decisions.
                          </p>
                          <div className="d-flex justify-content-center">
                            <Link
                              to={"/login"}
                              className="btn btn-dark text-uppercase">
                              Login
                            </Link>
                          </div>
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
