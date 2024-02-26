import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/esm/Image";
import Form from "react-bootstrap/Form";
import StarRating from "../components/StarRating";
import ReactStars from "react-rating-stars-component";
import ScrollToTop from "../components/BackToTop";
import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetProductDetailsQuery,
} from "../features/productsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "react-bootstrap/esm/Button";
import { addToCart } from "../features/cartSlice";
import { Alert, ListGroup, Spinner, Stack } from "react-bootstrap";
import { format } from "date-fns";
import { MdDelete } from "react-icons/md";
import { numberWithCommas } from "../utils/cartUtils";
import { FaCheck, FaTimes } from "react-icons/fa";
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

  return (
    <section className="bg-white py-5">
      {!error ? (
        <Container>
          <Row className="mb-5">
            <Col lg={4} className="mb-4 mb-lg-0">
              {isLoading ? (
                <div className="placeholder-glow">
                  <span
                    className="placeholder col-12"
                    style={{ height: "300px" }}></span>
                </div>
              ) : (
                <Image
                  fluid
                  rounded
                  loading="lazy"
                  src={`${product.data.imageUrl}`}
                />
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
                  <h3 className="text-uppercase mb-3">
                    {product.data.productName}
                  </h3>
                  <StarRating value={product.data.rating} />
                  <p className="my-3 lead">{product.data.productDescription}</p>
                  <h5 className="fw-semibold text-primary mb-3">
                    &#8358;{numberWithCommas(product?.data.price)}
                  </h5>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                      <h6 className="text-uppercase">Quantity</h6>
                    </Form.Label>
                    <Col sm="4">
                      {product.data.countInStock > 0 && (
                        <Form.Select
                          onChange={(e) => setQuantity(Number(e.target.value))}>
                          {[...Array(product.data.countInStock).keys()].map(
                            (x) => (
                              <option value={x + 1} key={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </Form.Select>
                      )}
                    </Col>
                    <Col className="d-flex align-items-center">
                      {product.data.countInStock ? (
                        <Stack
                          direction="horizontal"
                          gap={2}
                          className="text-success">
                          <FaCheck />
                          <div>In stock</div>
                        </Stack>
                      ) : (
                        <Stack
                          direction="horizontal"
                          gap={2}
                          className="text-danger">
                          <FaTimes />
                          <div>Out of stock</div>
                        </Stack>
                      )}
                    </Col>
                  </Form.Group>
                  <Button
                    variant="dark"
                    className="text-uppercase w-100"
                    size="lg"
                    onClick={addToCartHandler}>
                    Add to cart
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
                  <h5 className="text-uppercase mb-4">Customer Reviews</h5>
                  {product.data.reviews.length === 0 ? (
                    <Alert>No Reviews</Alert>
                  ) : (
                    <ListGroup variant="flush">
                      {product.data.reviews.map((review) => (
                        <ListGroup.Item
                          key={review._id}
                          className="mb-3 p-3 border">
                          <StarRating value={review.rating} />
                          <div className="d-flex align-items-center mt-3">
                            <div className="flex-shrink-0 me-3">
                              <Image
                                fluid
                                loading="lazy"
                                roundedCircle
                                className="profile-picture-sm"
                                src={review.profilePictureURL}
                              />
                            </div>
                            <div className="d-flex flex-column">
                              <h6 className="mb-1">{review.name}</h6>
                              <small className="text-muted">
                                {review.createdAt}
                              </small>
                            </div>
                          </div>
                          <p className="mt-3 mb-0">{review.comment}</p>
                          {userInfo.data.id === review.user && (
                            <Button
                              onClick={() => handleDeleteReview(review._id)}
                              variant=""
                              className="position-absolute top-0 end-0">
                              <MdDelete className="fs-4" />
                            </Button>
                          )}
                        </ListGroup.Item>
                      ))}
                      <ListGroup.Item className="mb-3 p-3 border">
                        <h5 className="text-uppercase mb-3">Write a review</h5>
                        {userInfo ? (
                          <Form onSubmit={handleReviewSubmit}>
                            <ReactStars
                              count={5}
                              size={45}
                              isHalf={true}
                              activeColor="#ffae42"
                              onChange={ratingChanged}
                              emptyIcon={<i className="far fa-star"></i>}
                              halfIcon={<i className="fa fa-star-half-alt"></i>}
                              fullIcon={<i className="fa fa-star"></i>}
                            />
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlTextarea1">
                              <Form.Label>Your Comments</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={3}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                              />
                            </Form.Group>
                            <Button
                              type="submit"
                              disabled={loadingProductReview}
                              variant="dark">
                              {loadingProductReview ? (
                                <Spinner size="sm" animation="border">
                                  <span className="visually-hidden"></span>
                                </Spinner>
                              ) : (
                                "Submit Review"
                              )}
                            </Button>
                          </Form>
                        ) : (
                          <Alert>
                            Please <Link to={"/login"}>login</Link> to write
                            your review
                          </Alert>
                        )}
                      </ListGroup.Item>
                    </ListGroup>
                  )}
                </>
              )}
            </Col>
          </Row>
        </Container>
      ) : (
        <ErrorPage />
      )}
      <ScrollToTop />
    </section>
  );
}
