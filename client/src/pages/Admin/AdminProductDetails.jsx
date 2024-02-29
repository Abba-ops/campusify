import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import {
  useDeleteReviewMutation,
  useGetProductDetailsQuery,
} from "../../features/productsApiSlice";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import StarRating from "../../components/StarRating";
import { MdDelete } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";

export default function AdminProductDetails() {
  const [visibleComments, setVisibleComments] = useState(3);

  const { productId } = useParams();

  const {
    data: product,
    isLoading,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [deleteReview, {}] = useDeleteReviewMutation();

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview({ productId, reviewId });
      refetch();
      toast.success("Review deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleLoadMore = () => {
    setVisibleComments((prevVisibleComments) => prevVisibleComments + 3);
  };

  console.log(product);
  const { userInfo } = useSelector((state) => state.auth);

  const sortedReviews =
    product &&
    product?.data?.reviews.slice().sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <>
      <Container>
        {isLoading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center my-3">
              <div>{/* <h2>{product.data.productName}</h2> */}</div>
              <div></div>
            </div>
            <Row>
              <Col className="bg-white border-0" lg={6} as={Card}>
                <Card.Img variant="top" src={product.data.imageUrl} />
                <Card.Body></Card.Body>
              </Col>
              <Col>
                <ListGroup variant="flush">
                  {product &&
                    sortedReviews &&
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
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
}
