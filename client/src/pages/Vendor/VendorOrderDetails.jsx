import React, { useState } from "react";
import {
  Breadcrumb,
  Card,
  Col,
  Row,
  FloatingLabel,
  Form,
  ListGroup,
  Image,
  Button,
  Spinner,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import {
  useGetVendorOrderQuery,
  useMarkOrderAsDeliveredMutation,
} from "../../features/ordersApiSlice";
import TablePlaceholder from "../../components/TablePlaceholder";
import { toast } from "react-toastify";
import { numberWithCommas } from "../../utils/cartUtils";
import { BsCheckCircleFill, BsExclamationCircleFill } from "react-icons/bs";

export default function VendorOrderDetails() {
  const { orderId } = useParams();
  const {
    data: order,
    isLoading,
    isError,
    refetch,
  } = useGetVendorOrderQuery(orderId);
  const [showOrderItems, setShowOrderItems] = useState(false);

  const [markOrderAsDelivered, { isLoading: isLoadingMarkDelivered }] =
    useMarkOrderAsDeliveredMutation();

  const handleMarkOrderDelivered = async () => {
    try {
      const response = await markOrderAsDelivered(orderId).unwrap();

      if (response?.success) {
        refetch();
        toast.success(response?.message);
      }
    } catch (error) {
      toast.error(
        (error && error?.data && error?.data?.message) ||
          "An error occurred while marking the order as delivered."
      );
    }
  };

  const toggleOrderItems = () => {
    setShowOrderItems(!showOrderItems);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/vendor/dashboard/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/vendor/dashboard/orders/">Orders</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{orderId}</Breadcrumb.Item>
      </Breadcrumb>
      {isError ? (
        <div className="text-center mt-5">
          <h4 className="text-danger">Error Loading Order Details</h4>
          <p className="mt-3">
            Failed to load order details. Please try again later.
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
            <Col md={6}>
              <Card className="border-0 rounded-0 shadow-sm mb-4">
                <Card.Body>
                  <h5 className="mb-3 text-uppercase">Delivery Address</h5>
                  <FloatingLabel label="Building">
                    <Form.Control
                      readOnly
                      plaintext
                      type="text"
                      value={order?.data?.deliveryAddress?.building}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Location Number">
                    <Form.Control
                      readOnly
                      plaintext
                      type="text"
                      value={order?.data?.deliveryAddress?.locationNumber}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Campus">
                    <Form.Control
                      readOnly
                      plaintext
                      type="text"
                      value={order?.data?.deliveryAddress?.campus}
                    />
                  </FloatingLabel>
                  <h5 className="mb-3 text-uppercase">Items in This Order</h5>
                  <div>
                    <Link
                      className="text-primary fw-bold text-decoration-none"
                      onClick={toggleOrderItems}>
                      {showOrderItems ? "Hide Order Items" : "Show Order Items"}
                    </Link>
                    <ListGroup variant="flush">
                      {showOrderItems && (
                        <>
                          {order?.data?.orderItems?.map((item) => (
                            <ListGroup.Item key={item?._id}>
                              <Row className="align-items-center">
                                <Col xs={4} lg={2}>
                                  <div className="image-container">
                                    <Image
                                      fluid
                                      loading="lazy"
                                      className="product-image"
                                      src={`${item?.imageUrl}`}
                                    />
                                  </div>
                                </Col>
                                <Col xs={8} lg={6}>
                                  <Link
                                    className="text-decoration-none"
                                    to={`/vendor/dashboard/products/${item?._id}`}>
                                    <div className="text-truncate">
                                      {item?.productName}
                                    </div>
                                  </Link>
                                  <div>
                                    <strong>Price:</strong> &#8358;
                                    {numberWithCommas(item?.price)}
                                  </div>
                                  <div>
                                    <strong>Quantity:</strong> {item?.quantity}
                                  </div>
                                </Col>
                                <Col
                                  lg={4}
                                  className="text-lg-center mt-3 mt-lg-0">
                                  {item?.isDelivered ? (
                                    <div className="d-flex align-items-center">
                                      <span className="me-1 text-success">
                                        Delivered
                                      </span>
                                      <BsCheckCircleFill
                                        color="green"
                                        size={20}
                                      />
                                    </div>
                                  ) : (
                                    <div className="d-flex align-items-center">
                                      <span className="me-1 text-secondary">
                                        Not Delivered
                                      </span>
                                      <BsExclamationCircleFill
                                        color="red"
                                        size={20}
                                      />
                                    </div>
                                  )}
                                  {item?.isReceived ? (
                                    <div className="d-flex align-items-center mt-1">
                                      <span className="me-1 text-success">
                                        Received
                                      </span>
                                      <BsCheckCircleFill
                                        color="green"
                                        size={20}
                                      />
                                    </div>
                                  ) : (
                                    <div className="d-flex align-items-center mt-1">
                                      <span className="me-1 text-secondary">
                                        Not Received
                                      </span>
                                      <BsExclamationCircleFill
                                        color="red"
                                        size={20}
                                      />
                                    </div>
                                  )}
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          ))}
                        </>
                      )}
                    </ListGroup>
                  </div>
                  {!order?.data?.orderItems[0]?.isDelivered && (
                    <Button
                      variant="dark"
                      onClick={handleMarkOrderDelivered}
                      className="mt-3 text-uppercase px-4 fw-semibold">
                      {isLoadingMarkDelivered ? (
                        <Spinner size="sm" animation="border">
                          <span className="visually-hidden"></span>
                        </Spinner>
                      ) : (
                        "Mark as Delivered"
                      )}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-0 rounded-0 shadow-sm mb-4">
                <Card.Body>
                  <h5 className="mb-3 text-uppercase">Details of This Order</h5>
                  <Form>
                    <FloatingLabel label="Order ID">
                      <Form.Control
                        plaintext
                        readOnly
                        type="text"
                        value={order?.data?.orderID}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Total Price">
                      <Form.Control
                        plaintext
                        readOnly
                        type="text"
                        value={`₦${order?.data?.totalPrice}`}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Tax Price">
                      <Form.Control
                        plaintext
                        readOnly
                        type="text"
                        value={`₦${order?.data?.taxPrice}`}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Items Price">
                      <Form.Control
                        plaintext
                        readOnly
                        type="text"
                        value={`₦${order?.data?.itemsPrice}`}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Payment Status">
                      <Form.Control
                        readOnly
                        plaintext
                        type="text"
                        value={order?.data?.isPaid ? "Paid" : "Unpaid"}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Comment">
                      <Form.Control
                        rows={3}
                        readOnly
                        plaintext
                        as="textarea"
                        value={order?.data?.comment}
                      />
                    </FloatingLabel>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
