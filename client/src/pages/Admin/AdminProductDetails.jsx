import React from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  useDeleteReviewMutation,
  useGetProductDetailsQuery,
} from "../../features/productsApiSlice";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import StarRating from "../../components/StarRating";
import { MdDelete } from "react-icons/md";

export default function AdminProductDetails() {
  const { productId } = useParams();

  const { data: product, isLoading ,refetch} = useGetProductDetailsQuery(productId);

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

  console.log(product);
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
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
              <Row>
                <Col lg={6}>
                  <div>
                    <Image fluid loading="lazy" src={product.data.imageUrl} />
                  </div>
                </Col>
                <Col lg={6}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Product ID:</strong> {product.data._id}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Product Name:</strong> {product.data.productName}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Category:</strong> {product.data.category}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Brand:</strong> {product.data.brand}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Price:</strong> {product.data.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Stock Count:</strong> {product.data.countInStock}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Average Rating:</strong> {product.data.rating}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Description:</strong>{" "}
                      {product.data.productDescription}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Vendor ID:</strong> {product.data.vendor._id}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Vendor Name:</strong>{" "}
                      {product.data.vendor.vendorName}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Vendor Email:</strong>{" "}
                      {product.data.vendor.contactInformation.email}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Vendor Phone:</strong>{" "}
                      {product.data.vendor.contactInformation.phone}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Vendor Verification Status:</strong>{" "}
                      {product.data.vendor.verificationStatus}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Number of Sales:</strong>{" "}
                      {product.data.vendor.numberOfSales}
                    </ListGroup.Item>

                    <ListGroup.Item>horizontally!</ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Col>
            <Col>
              <ListGroup variant="flush">
                {product?.data.reviews.map((review) => (
                  <ListGroup.Item key={review._id} className="mb-3 p-3 border">
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
                        <small className="text-muted">{review.createdAt}</small>
                      </div>
                    </div>
                    <p className="mt-3 mb-0">{review.comment}</p>
                    <Button
                      onClick={() => handleDeleteReview(review._id)}
                      variant=""
                      className="position-absolute top-0 end-0">
                      <MdDelete className="fs-4" />
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
