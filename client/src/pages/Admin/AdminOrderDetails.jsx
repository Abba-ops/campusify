import { useGetOrderByIdQuery } from "../../features/ordersApiSlice";
import { Breadcrumb, Card, Col, Row, ListGroup, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import TablePlaceholder from "../../components/TablePlaceholder";
import { BsCheckCircleFill, BsExclamationCircleFill } from "react-icons/bs";
import { formatCurrency } from "../../utilities";

export default function AdminOrderDetails() {
  const { orderId } = useParams();
  const { data: order, isLoading, isError } = useGetOrderByIdQuery(orderId);

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
          <h5 className="text-danger">Error Loading Order Details</h5>
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
        <Row>
          <Col md={6}>
            <Card className="border-0 rounded-0 shadow-sm mb-4">
              <Card.Body>
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
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="border-0 rounded-0 shadow-sm mb-4">
              <Card.Body>
                <ListGroup variant="flush">
                  {order?.data?.orderItems?.map((item) => (
                    <ListGroup.Item key={item?._id}>
                      <Row className="align-items-center">
                        <Col xs={4} lg={2}>
                          <div className="image-container">
                            <Image
                              fluid
                              loading="lazy"
                              className="product-image"
                              src={item?.imageUrl}
                            />
                          </div>
                        </Col>
                        <Col xs={8} lg={6}>
                          <Link
                            className="text-decoration-none"
                            to={`/admin/dashboard/products/${item?._id}`}>
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
