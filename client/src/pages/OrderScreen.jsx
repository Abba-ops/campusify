import React from "react";
import {
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Image,
  Button,
  Badge,
  Spinner,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import {
  useGetOrderByIdQuery,
  useMarkOrderAsReceivedMutation,
} from "../features/ordersApiSlice";
import { numberWithCommas } from "../utils/cartUtils";
import TablePlaceholder from "../components/TablePlaceholder";
import { toast } from "react-toastify";

export default function OrderScreen() {
  const { orderId } = useParams();

  const {
    data: orderData,
    isLoading,
    isError,
    refetch,
  } = useGetOrderByIdQuery(orderId);

  const [markOrderAsReceived, { isLoading: isLoadingMarkReceived }] =
    useMarkOrderAsReceivedMutation();

  const handleMarkAsReceived = async (itemId) => {
    try {
      const response = await markOrderAsReceived({ orderId, itemId }).unwrap();
      if (response.success) {
        refetch();
        toast.success(response.message);
      }
    } catch (error) {
      toast.error((error && error.data.message) || "");
    }
  };

  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col lg={8} className="mb-5 mb-lg-0">
            {isError ? (
              <div className="text-center mt-5">
                <h4 className="text-danger">Error Loading Order</h4>
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
              <Card className="py-3">
                <Card.Body>
                  <h5 className="mb-4">Delivery Address</h5>
                  <p>{`${orderData.data.deliveryAddress.building}, ${orderData.data.deliveryAddress.locationNumber}, ${orderData.data.deliveryAddress.campus}`}</p>
                  <h5 className="mb-4">Order Items</h5>
                  <ListGroup variant="flush">
                    {orderData.data.orderItems.map((product) => (
                      <ListGroup.Item key={product._id}>
                        <Row className="align-items-center">
                          <Col xs={6} lg={2}>
                            <Image src={product.imageUrl} fluid />
                          </Col>
                          <Col
                            xs={6}
                            lg={4}
                            as={Link}
                            to={`/product/${product._id}`}
                            className="text-decoration-none text-capitalize">
                            {product.productName}
                          </Col>
                          <Col
                            xs={6}
                            lg={2}
                            className="text-primary text-lg-center">
                            &#8358;{numberWithCommas(product.price)}
                          </Col>
                          <Col xs={6} lg={2} className="text-lg-center">
                            {product.isDelivered ? (
                              <Badge bg="success">Delivered</Badge>
                            ) : (
                              <Badge bg="secondary">Not Delivered</Badge>
                            )}
                            {product.isReceived ? (
                              <Badge bg="success">Received</Badge>
                            ) : (
                              <Badge bg="secondary">Not Received</Badge>
                            )}
                          </Col>
                          <Col>
                            {product.isReceived ? (
                              <Badge bg="success">Received</Badge>
                            ) : (
                              <>
                                {product.isDelivered && (
                                  <Button
                                    size="sm"
                                    variant="dark"
                                    onClick={() =>
                                      handleMarkAsReceived(product._id)
                                    }>
                                    {isLoadingMarkReceived ? (
                                      <Spinner size="sm" animation="border">
                                        <span className="visually-hidden"></span>
                                      </Spinner>
                                    ) : (
                                      "Mark as Received"
                                    )}
                                  </Button>
                                )}
                              </>
                            )}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col lg={4}>
            {!isLoading ? (
              <ListGroup>
                <ListGroup.Item>
                  <Row className="my-3">
                    <Col xs={6}>
                      {orderData.data.orderItems.length === 1
                        ? "1 item"
                        : `${orderData.data.orderItems.length} items`}
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col xs={6}>Subtotal Amount</Col>
                    <Col xs={6} className="text-end text-primary">
                      &#8358;{numberWithCommas(orderData.data.itemsPrice)}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row className="my-3">
                    <Col xs={6}>Total Taxes</Col>
                    <Col xs={6} className="text-end text-primary">
                      &#8358;{numberWithCommas(orderData.data.taxPrice)}
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col xs={6}>Total Amount</Col>
                    <Col xs={6} className="text-end text-primary">
                      &#8358;{numberWithCommas(orderData.data.totalPrice)}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row className="my-3">
                    <Col xs={6}>Order Status</Col>
                    <Col xs={6} className="text-end">
                      {orderData.isOrderDelivered ? (
                        <Badge bg="success">Delivered</Badge>
                      ) : (
                        <Badge bg="warning">Pending</Badge>
                      )}
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col xs={6}>Payment Status</Col>
                    <Col xs={6} className="text-end">
                      {orderData.isPaid ? (
                        <Badge bg="success">Paid</Badge>
                      ) : (
                        <Badge bg="danger">Unpaid</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row className="my-3">
                    <Col xs={6}>User</Col>
                    <Col xs={6} className="text-end">
                      <Link to={`/user/${orderData.data.user._id}`}>
                        {`${orderData.data.user.otherNames} ${orderData.data.user.lastName}`}
                      </Link>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            ) : (
              <>
                {[...Array(6)].map((_, index) => (
                  <TablePlaceholder key={index} />
                ))}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
