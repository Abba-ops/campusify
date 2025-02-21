import { useEffect } from "react";
import {
  Col,
  Container,
  ListGroup,
  Row,
  Image,
  Button,
  Badge,
  Spinner,
  Placeholder,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetOrderByIdQuery,
  useMarkOrderAsReceivedMutation,
} from "../features/ordersApiSlice";
import { toast } from "react-toastify";
import { BsCheckCircleFill, BsExclamationCircleFill } from "react-icons/bs";
import MetaTags from "../components/MetaTags";
import BackToTop from "../components/BackToTop";
import { formatCurrency } from "../utilities";
import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";

export default function OrderScreen() {
  const { userInfo } = useSelector((state) => state.auth);
  const { orderId } = useParams();

  const navigate = useNavigate();

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
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      }
    } catch (error) {
      toast.error(
        (error && error?.data?.message) ||
          "An error occurred while processing your request."
      );
    }
  };

  useEffect(() => {
    if (userInfo?.data?.isAdmin) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-5">
      <MetaTags
        title={`Order ${orderId} - Campusify`}
        description="View details of your order on Campusify, including order items, delivery address, and total cost."
        keywords="order details, order summary, delivery address, total cost, Campusify"
      />
      <Container>
        <Row>
          <Col lg={8} className="mb-5 mb-lg-0">
            {isError ? (
              <div className="text-center mt-5">
                <h5 className="text-danger">Error Loading Order</h5>
                <p className="mt-3">
                  Failed to load order details. Please try again later.
                </p>
              </div>
            ) : isLoading ? (
              <ListGroup>
                <ListGroup.Item>
                  <h5 className="my-2">
                    <Placeholder as="span" animation="glow">
                      <Placeholder xs={7} />
                    </Placeholder>
                  </h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <ListGroup variant="flush">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <ListGroup.Item key={index}>
                        <div>
                          <Placeholder as="span" animation="glow">
                            <Placeholder xs={6} />
                          </Placeholder>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5 className="my-2">
                    <Placeholder as="span" animation="glow">
                      <Placeholder xs={7} />
                    </Placeholder>
                  </h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <ListGroup variant="flush">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <ListGroup.Item key={index}>
                        <Row className="align-items-center">
                          <Col lg={2} className="mb-3 mb-lg-0">
                            <div className="image-container">
                              <Image
                                fluid
                                loading="lazy"
                                className="product-image placeholder"
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
                            <Placeholder as="div" animation="glow">
                              <Placeholder xs={8} />
                            </Placeholder>
                            <Placeholder as="div" animation="glow">
                              <Placeholder xs={6} />
                            </Placeholder>
                            <Placeholder as="div" animation="glow">
                              <Placeholder xs={4} />
                            </Placeholder>
                            <Placeholder as="div" animation="glow">
                              <Placeholder xs={5} />
                            </Placeholder>
                          </Col>
                          <Col
                            xs={6}
                            lg={3}
                            className="text-lg-center mt-3 mt-lg-0">
                            <Placeholder as="div" animation="glow">
                              <Placeholder xs={7} />
                            </Placeholder>
                            <Placeholder
                              as="div"
                              animation="glow"
                              className="mt-1">
                              <Placeholder xs={7} />
                            </Placeholder>
                          </Col>
                          <Col xs={6} lg={3}>
                            <Placeholder.Button
                              variant="dark"
                              size="sm"
                              xs={6}
                            />
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </ListGroup.Item>
              </ListGroup>
            ) : (
              <ListGroup>
                <ListGroup.Item>
                  <h5 className="my-2">Summary of Your Order</h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <div>
                        <strong>Order ID:</strong> {orderData?.data?.orderID}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div>
                        <strong>Delivery Address:</strong>{" "}
                        {orderData?.data?.deliveryAddress?.building},{" "}
                        {orderData?.data?.deliveryAddress?.locationNumber},{" "}
                        {orderData?.data?.deliveryAddress?.campus}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div>
                        <strong>User Name:</strong>{" "}
                        {orderData?.data?.user?.otherNames}{" "}
                        {orderData?.data?.user?.lastName}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div>
                        <strong>User Email:</strong>{" "}
                        {orderData?.data?.user?.email}
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5 className="my-2">Items in Your Order</h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <ListGroup variant="flush">
                    {orderData?.data?.orderItems?.map((product) => (
                      <ListGroup.Item key={product?._id}>
                        <Row className="align-items-center">
                          <Col lg={2} className="mb-3 mb-lg-0">
                            <div className="image-container">
                              <Image
                                fluid
                                loading="lazy"
                                className="product-image"
                                src={product?.imageUrl}
                                alt={product?.productName}
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
                            <Link
                              className="text-decoration-none"
                              to={`/product/${product?._id}`}>
                              <div className="text-truncate">
                                {product?.productName}
                              </div>
                            </Link>
                            <div>
                              <strong>Estimated Delivery Time:</strong>{" "}
                              {product?.vendor?.estimatedDeliveryTime ||
                                "Not available"}
                            </div>
                            <div>
                              <strong>Quantity:</strong> {product?.quantity}
                            </div>
                            <div>
                              <strong>Price:</strong> &#8358;
                              {formatCurrency(product?.price)}
                            </div>
                          </Col>
                          <Col
                            xs={6}
                            lg={3}
                            className="text-lg-center mt-3 mt-lg-0">
                            {product?.isDelivered ? (
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
                                <BsExclamationCircleFill
                                  color="red"
                                  size={20}
                                />
                              </div>
                            )}
                            {product?.isReceived ? (
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
                                <BsExclamationCircleFill
                                  color="red"
                                  size={20}
                                />
                              </div>
                            )}
                          </Col>
                          <Col xs={6} lg={3}>
                            {product?.isDelivered && product?.isReceived ? (
                              <Badge bg="success">Completed</Badge>
                            ) : (
                              <Button
                                size="sm"
                                variant="dark"
                                disabled={
                                  !product?.isDelivered && !product?.isReceived
                                }
                                onClick={() =>
                                  handleMarkAsReceived(product?._id)
                                }>
                                {isLoadingMarkReceived ? (
                                  <Spinner animation="border" size="sm" />
                                ) : (
                                  <>
                                    <FaCheckCircle className="me-2" /> Received
                                  </>
                                )}
                              </Button>
                            )}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </ListGroup.Item>
              </ListGroup>
            )}
          </Col>
          <Col lg={4}>
            {!isLoading ? (
              <ListGroup>
                <ListGroup.Item>
                  <Row className="my-3">
                    <Col xs={6}>
                      {orderData?.data?.orderItems
                        ? orderData.data.orderItems.length === 1
                          ? "1 item in cart"
                          : `${orderData.data.orderItems.length} items in cart`
                        : "No items in cart"}
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col xs={6}>Total (Before Tax)</Col>
                    <Col xs={6} className="text-end">
                      <div className="text-primary">
                        &#8358;{formatCurrency(orderData?.data?.itemsPrice)}
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row className="my-3">
                    <Col xs={6}>Tax Amount</Col>
                    <Col xs={6} className="text-end">
                      <div className="text-primary">
                        &#8358;{formatCurrency(orderData?.data?.taxPrice)}
                      </div>
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col xs={6}>Total Cost</Col>
                    <Col xs={6} className="text-end">
                      <div className="text-primary">
                        &#8358;{formatCurrency(orderData?.data?.totalPrice)}
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row className="my-3">
                    <Col xs={6}>Order Status</Col>
                    <Col xs={6} className="text-end">
                      {orderData?.data?.isOrderDelivered ? (
                        <Badge bg="success">Delivered</Badge>
                      ) : (
                        <Badge bg="primary">Pending</Badge>
                      )}
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col xs={6}>Payment Status</Col>
                    <Col xs={6} className="text-end">
                      {orderData?.data?.isPaid ? (
                        <Badge bg="success">Paid</Badge>
                      ) : (
                        <Badge bg="primary">Unpaid</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            ) : (
              <ListGroup>
                <ListGroup.Item>
                  <Row className="my-3">
                    <Col xs={6}>
                      <Placeholder as="span" animation="glow">
                        <Placeholder xs={5} />
                      </Placeholder>
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col xs={6}>
                      <Placeholder as="span" animation="glow">
                        <Placeholder xs={6} />
                      </Placeholder>
                    </Col>
                    <Col xs={6} className="text-end">
                      <Placeholder as="span" animation="glow">
                        <Placeholder xs={4} />
                      </Placeholder>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row className="my-3">
                    <Col xs={6}>
                      <Placeholder as="span" animation="glow">
                        <Placeholder xs={6} />
                      </Placeholder>
                    </Col>
                    <Col xs={6} className="text-end">
                      <Placeholder as="span" animation="glow">
                        <Placeholder xs={4} />
                      </Placeholder>
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col xs={6}>
                      <Placeholder as="span" animation="glow">
                        <Placeholder xs={6} />
                      </Placeholder>
                    </Col>
                    <Col xs={6} className="text-end">
                      <Placeholder as="span" animation="glow">
                        <Placeholder xs={4} />
                      </Placeholder>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row className="my-3">
                    <Col xs={6}>
                      <Placeholder as="span" animation="glow">
                        <Placeholder xs={6} />
                      </Placeholder>
                    </Col>
                    <Col xs={6} className="text-end">
                      <Placeholder as="span" animation="glow">
                        <Placeholder xs={5} />
                      </Placeholder>
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col xs={6}>
                      <Placeholder as="span" animation="glow">
                        <Placeholder xs={6} />
                      </Placeholder>
                    </Col>
                    <Col xs={6} className="text-end">
                      <Placeholder as="span" animation="glow">
                        <Placeholder xs={5} />
                      </Placeholder>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            )}
          </Col>
        </Row>
      </Container>
      <BackToTop />
    </section>
  );
}
