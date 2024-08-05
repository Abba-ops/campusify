import React, { useState } from "react";
import {
  Breadcrumb,
  Card,
  Col,
  Row,
  ListGroup,
  Image,
  Button,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../features/ordersApiSlice";
import TablePlaceholder from "../../components/TablePlaceholder";
import { BsCheckCircleFill, BsExclamationCircleFill } from "react-icons/bs";
import { formatCurrency } from "../../utilities";

export default function AdminOrderDetails() {
  const { orderId } = useParams();
  const { data: order, isLoading, isError } = useGetOrderByIdQuery(orderId);
  const [showFullComment, setShowFullComment] = useState(false);

  const toggleComment = () => setShowFullComment(!showFullComment);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin/dashboard/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/admin/dashboard/orders/">Orders</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{orderId}</Breadcrumb.Item>
      </Breadcrumb>

      {isError ? (
        <div className="text-center mt-5">
          <h5 className="text-danger">Error Loading Order Details</h5>
          <p className="mt-3">
            Failed to load order details. Please try again later.
          </p>
        </div>
      ) : isLoading ? (
        <Row>
          {[...Array(6)].map((_, index) => (
            <Col key={index} md={12}>
              <TablePlaceholder />
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          <Col md={6}>
            <Card className="border-0 rounded-0 shadow-sm mb-4">
              <Card.Body>
                <h5>Summary of Order Details</h5>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Order ID:</strong> {orderId}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Items Price:</strong> &#8358;
                    {formatCurrency(order?.data?.itemsPrice)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Tax Price:</strong> &#8358;
                    {formatCurrency(order?.data?.taxPrice)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Total Price:</strong> &#8358;
                    {formatCurrency(order?.data?.totalPrice)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Payment Status:</strong>{" "}
                    {order?.data?.isPaid ? "Paid" : "Not Paid"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Order Delivered:</strong>{" "}
                    {order?.data?.isOrderDelivered ? "Yes" : "No"}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>

            <Card className="border-0 rounded-0 shadow-sm mb-4">
              <Card.Body>
                <h5>Customer Information</h5>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Name:</strong> {order?.data?.user?.lastName}{" "}
                    {order?.data?.user?.otherNames}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Email:</strong> {order?.data?.user?.email}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Phone Number:</strong>{" "}
                    {order?.data?.user?.phoneNumber}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Building:</strong>{" "}
                    {order?.data?.deliveryAddress?.building}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Location Number:</strong>{" "}
                    {order?.data?.deliveryAddress?.locationNumber}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Campus:</strong>{" "}
                    {order?.data?.deliveryAddress?.campus}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Comment:</strong>{" "}
                    {order?.data?.comment
                      ? order?.data?.comment.length > 100 && !showFullComment
                        ? `${order?.data?.comment.substring(0, 100)}...`
                        : order?.data?.comment
                      : "No comment provided"}
                    {order?.data?.comment?.length > 100 && (
                      <Button
                        variant="link"
                        onClick={toggleComment}
                        className="p-0 ms-2">
                        {showFullComment ? "Show Less" : "Read More"}
                      </Button>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="border-0 rounded-0 shadow-sm mb-4">
              <Card.Body>
                <h5>List of Ordered Items</h5>
                <ListGroup variant="flush">
                  {order?.data?.orderItems?.map((item) => (
                    <ListGroup.Item key={item?.product}>
                      <Row className="align-items-center">
                        <Col xs={4} lg={3}>
                          <div className="image-container">
                            <Image
                              fluid
                              loading="lazy"
                              className="product-image"
                              src={item?.imageUrl}
                              alt={item?.productName}
                            />
                          </div>
                        </Col>
                        <Col xs={8} lg={5}>
                          <Link
                            className="text-decoration-none"
                            to={`/admin/dashboard/products/${item?.product}`}>
                            <div className="text-truncate">
                              {item?.productName}
                            </div>
                          </Link>
                          <div>
                            <strong>Price:</strong> &#8358;
                            {formatCurrency(item?.price)}
                          </div>
                          <div>
                            <strong>Quantity:</strong> {item?.quantity}
                          </div>
                        </Col>
                        <Col lg={4} className="text-lg-center mt-3 mt-lg-0">
                          {item?.isDelivered ? (
                            <div className="d-flex align-items-center">
                              <span className="me-1 text-success">
                                Delivered
                              </span>
                              <BsCheckCircleFill color="green" size={20} />
                            </div>
                          ) : (
                            <div className="d-flex align-items-center">
                              <span className="me-1 text-secondary">
                                Not Delivered
                              </span>
                              <BsExclamationCircleFill color="red" size={20} />
                            </div>
                          )}
                          {item?.isReceived ? (
                            <div className="d-flex align-items-center mt-1">
                              <span className="me-1 text-success">
                                Received
                              </span>
                              <BsCheckCircleFill color="green" size={20} />
                            </div>
                          ) : (
                            <div className="d-flex align-items-center mt-1">
                              <span className="me-1 text-secondary">
                                Not Received
                              </span>
                              <BsExclamationCircleFill color="red" size={20} />
                            </div>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}
