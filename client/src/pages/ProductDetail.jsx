import React, { useState } from "react";
import {
  Image,
  Form,
  Col,
  Row,
  Button,
  Alert,
  Stack,
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

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const { userInfo } = useSelector((state) => state.auth);

  const { productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    error,
    refetch,
    isLoading,
    data: product,
  } = useGetProductDetailsQuery(productId);

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

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
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

  console.log(product);

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
                    style={{ height: "300px" }}></span>
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
                <div>
                  <h3 className="placeholder-glow">
                    <span
                      className="placeholder col-12"
                      style={{ height: "30px" }}></span>
                  </h3>
                  <p className="placeholder-glow">
                    <span
                      className="placeholder col-12"
                      style={{ height: "15px" }}></span>
                    <span
                      className="placeholder col-10"
                      style={{ height: "15px" }}></span>
                    <span
                      className="placeholder col-12"
                      style={{ height: "90px" }}></span>
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
                  </p>
                  <Button
                    size="lg"
                    variant="dark"
                    className="disabled placeholder col-6"
                  />
                </div>
              ) : (
                <>
                  <h3 className="text-capitalize mb-3">
                    {product.data.productName}
                  </h3>
                  <h6>
                    <StarRating
                      value={product.data.rating}
                      text="Customer Rating"
                    />
                  </h6>
                  <p className="my-3 lead fw-normal">
                    {product.data.productDescription}
                  </p>
                  <h4 className="text-primary mb-3">
                    &#8358;{numberWithCommas(product?.data.price)}
                  </h4>
                  <Button
                    variant="dark"
                    className="text-uppercase w-100"
                    size="lg"
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
              <CarouselProducts lg={12} />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={6}>
              {isLoading ? (
                <div className="placeholder-glow">
                  <span
                    className="placeholder col-12 mb-3"
                    style={{ height: "20px" }}></span>
                  <span
                    className="placeholder col-12"
                    style={{ height: "15px" }}></span>
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
                  {product.data.reviews.length === 0 && (
                    <Alert>No Reviews</Alert>
                  )}

                  <ListGroup variant="flush">
                    {product.data.reviews.map((review) => (
                      <ListGroup.Item
                        key={review._id}
                        className="mb-3 p-3 border">
                        <div className="d-flex align-items-center mb-3">
                          <div className="flex-shrink-0 me-3">
                            <Image
                              fluid
                              loading="lazy"
                              roundedCircle
                              className="profile-picture-sm"
                              src={review.profilePictureURL}
                              alt={`${review.name}'s Profile`}
                            />
                          </div>
                          <div>
                            <h6 className="mb-1 text-break">{review.name}</h6>
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
                        {userInfo.data.id === review.user && (
                          <Button
                            variant="link"
                            onClick={() => handleDeleteReview(review._id)}
                            className="position-absolute top-0 end-0">
                            <MdDelete className="fs-4" />
                          </Button>
                        )}
                      </ListGroup.Item>
                    ))}
                    <h5 className="text-uppercase mb-3">Write a Review</h5>
                    <ListGroup.Item className="mb-3 p-3 border">
                      {userInfo ? (
                        <Form onSubmit={handleReviewSubmit}>
                          <ReactStars
                            count={5}
                            size={24}
                            isHalf={true}
                            activeColor="#ffae42"
                            onChange={ratingChanged}
                          />
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1">
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Share your thoughts..."
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            />
                          </Form.Group>
                          <Button
                            type="submit"
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
                        <Alert>
                          Please <Link to={"/login"}>login</Link> to write your
                          review
                        </Alert>
                      )}
                    </ListGroup.Item>
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
