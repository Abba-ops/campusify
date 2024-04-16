import React from "react";
import {
  Breadcrumb,
  Card,
  Col,
  Row,
  FloatingLabel,
  Form,
  ListGroup,
  Image,
  Accordion,
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

export default function VendorOrderDetails() {
  const { orderId } = useParams();
  const { data: order, isLoading, isError } = useGetVendorOrderQuery(orderId);

  const [markOrderAsDelivered, { isLoading: isLoadingMarkDelivered }] =
    useMarkOrderAsDeliveredMutation();

  const handleMarkOrderDelivered = async () => {
    try {
      const response = await markOrderAsDelivered(orderId).unwrap();

      if (response.success) {
        toast.success(response.message);
      }
    } catch (error) {
      toast.error((error && error.data.message) || "");
    }
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
                  <h5 className="mb-4">Delivery Address</h5>
                  <FloatingLabel label="Building">
                    <Form.Control
                      readOnly
                      plaintext
                      type="text"
                      value={order.data.deliveryAddress.building}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Location Number">
                    <Form.Control
                      readOnly
                      plaintext
                      type="text"
                      value={order.data.deliveryAddress.locationNumber}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Campus">
                    <Form.Control
                      readOnly
                      plaintext
                      type="text"
                      value={order.data.deliveryAddress.campus}
                    />
                  </FloatingLabel>
                  <h5 className="mb-4">Order Items</h5>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Order Items</Accordion.Header>
                      <Accordion.Body>
                        <ListGroup variant="flush">
                          {order.data.orderItems.map((item) => (
                            <ListGroup.Item key={item._id}>
                              <Row className="align-items-center">
                                <Col
                                  xs={3}
                                  className="d-flex justify-content-center">
                                  <Image
                                    src={item.imageUrl}
                                    className="profile-picture-sm"
                                    rounded
                                  />
                                </Col>
                                <Col>
                                  <div>
                                    <strong>{item.product.productName}</strong>
                                  </div>
                                  <div>Quantity: {item.quantity}</div>
                                  <div>Price: ${item.price}</div>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <Button
                    variant="dark"
                    onClick={handleMarkOrderDelivered}
                    className="mt-3">
                    {isLoadingMarkDelivered ? (
                      <Spinner size="sm" animation="border">
                        <span className="visually-hidden"></span>
                      </Spinner>
                    ) : (
                      "Mark as Delivered"
                    )}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-0 rounded-0 shadow-sm mb-4">
                <Card.Body>
                  <h5 className="mb-4">Order Details</h5>
                  <Form>
                    <FloatingLabel label="Order ID">
                      <Form.Control
                        plaintext
                        readOnly
                        type="text"
                        value={order.data._id}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Total Price">
                      <Form.Control
                        plaintext
                        readOnly
                        type="text"
                        value={order.data.totalPrice}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Tax Price">
                      <Form.Control
                        plaintext
                        readOnly
                        type="text"
                        value={order.data.taxPrice}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Items Price">
                      <Form.Control
                        plaintext
                        readOnly
                        type="text"
                        value={order.data.itemsPrice}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Payment Status">
                      <Form.Control
                        readOnly
                        plaintext
                        type="text"
                        value={order.data.isPaid ? "Paid" : "Unpaid"}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Comment">
                      <Form.Control
                        rows={3}
                        readOnly
                        plaintext
                        as="textarea"
                        value={order.data.comment}
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
