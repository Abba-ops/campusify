import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/esm/Image";
import Form from "react-bootstrap/Form";
import Rating from "../components/StarRating";
import ReactStars from "react-rating-stars-component";
import ProductsSlider from "../components/CarouselProducts";
import ScrollToTop from "../components/BackToTop";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../features/productsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Button from "react-bootstrap/esm/Button";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { addToCart } from "../features/cartSlice";
import { Alert, FloatingLabel, ListGroup } from "react-bootstrap";
import Loader from "../components/Loader";

const ReviewComponent = () => {};

export default function ProductDetail() {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const { userInfo } = useSelector((state) => state.auth);

  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate("/cart");
  };

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation(productId);

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
      toast.success("Review submitted successfully");
      setComment("");
      setRating(0);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  console.log(product);

  return (
    <section className="bg-white py-5">
      <Container>
        <Row>
          <Col lg={4} className="mb-3 mb-lg-0">
            <Image src={`${product?.data.imageUrl}`} fluid loading="lazy" />
          </Col>
          <Col lg={5} className="mb-5 mb-lg-0">
            {isLoading ? (
              <>
                <h5 className="card-title placeholder-glow">
                  <span className="placeholder col-6"></span>
                </h5>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-7"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-6"></span>
                  <span className="placeholder col-8"></span>
                </p>
                <Button
                  className="disabled placeholder col-6 rounded-0"
                  variant="primary"></Button>
              </>
            ) : (
              <>
                <h3 className="text-uppercase fw-semibold text-body-secondary mb-3">
                  {product?.data.productName}
                </h3>
                <Rating
                  value={product?.data.rating}
                  text={`(${product?.data.reviewCount} Review)`}
                  linkText={"Add your review"}
                />
                <p className="raleway my-4">
                  {product?.data.productDescription}
                </p>
                <h4 className="fw-semibold text-primary my-3">
                  &#8358;{product?.data.price}
                </h4>
                <Row>
                  <Col lg={4}>
                    {product?.data.countInStock > 0 && (
                      <Form.Select
                        className="rounded-0"
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
                  <Col>
                    <Button
                      variant="dark"
                      className="rounded-pill py-2"
                      onClick={addToCartHandler}>
                      <RiShoppingBag2Fill />
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </Col>
          <Col lg={3}>
            <h4 className="text-uppercase fw-bolder text-body-secondary text-center">
              Other Products
            </h4>
            <ProductsSlider showIcons={false} />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h2>Reviews</h2>
            {product?.data.reviews.length === 0 && <Alert>No Reviews</Alert>}
            <ListGroup variant="flush">
              {product?.data.reviews.map((review) => (
                <ListGroup.Item key={review._id} className="mb-3 p-3 border">
                  <Rating value={review.rating} />
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
                      <small className="text-muted">{review.createdAt}</small>
                    </div>
                  </div>
                  <p className="mt-3 mb-0">{review.comment}</p>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <h2>Write a review</h2>
                {userInfo ? (
                  <Form onSubmit={handleReviewSubmit}>
                    <ReactStars
                      count={5}
                      size={45}
                      isHalf={true}
                      activeColor="#ffae42"
                      onChange={ratingChanged}
                    />
                    <FloatingLabel
                      controlId="comment"
                      label="Your Comments"
                      className="mb-3">
                      <Form.Control
                        as="textarea"
                        placeholder="Write your comments here"
                        style={{ height: "100px" }}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </FloatingLabel>
                    <Button
                      type="submit"
                      disabled={loadingProductReview}
                      variant="dark">
                      {loadingProductReview ? "Submitting..." : "Submit Review"}
                    </Button>
                  </Form>
                ) : (
                  <Alert>
                    Please <Link to={"/login"}>login</Link> to write your review
                  </Alert>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <ScrollToTop />
    </section>
  );
}
