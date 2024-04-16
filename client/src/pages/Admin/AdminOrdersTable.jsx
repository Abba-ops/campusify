import React from "react";
import {
  Accordion,
  Breadcrumb,
  Button,
  ButtonGroup,
  Col,
  Image,
  ListGroup,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../features/ordersApiSlice";
import TablePlaceholder from "../../components/TablePlaceholder";
import { numberWithCommas } from "../../utils/cartUtils";
import { BsEye, BsTrash } from "react-icons/bs";

export default function AdminOrdersTable() {
  const { data: orders, isLoading, isError } = useGetOrdersQuery();

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/admin/dashboard/"}>Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Orders</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <h2>Order Management</h2>
        <p>
          Explore and manage orders to ensure smooth transactions and customer
          satisfaction.
        </p>
      </div>
      {isError ? (
        <div className="text-center mt-5">
          <h4 className="text-danger">Error Loading Orders</h4>
          <p className="mt-3">Failed to load orders. Please try again later.</p>
        </div>
      ) : isLoading ? (
        <>
          {[...Array(5)].map((_, index) => (
            <TablePlaceholder key={index} />
          ))}
        </>
      ) : (
        <Table size="sm" responsive striped>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User Name</th>
              <th>Items Price</th>
              <th>Total Price</th>
              <th>Order Items</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.data.map((order) => (
              <tr key={order.orderID}>
                <td>{order.orderID}</td>
                <td>
                  {order.user.otherNames} {order.user.lastName}
                </td>
                <td>&#8358;{numberWithCommas(order.itemsPrice)}</td>
                <td>&#8358;{numberWithCommas(order.totalPrice)}</td>
                <td>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Order Items</Accordion.Header>
                      <Accordion.Body>
                        <ListGroup variant="flush">
                          {order.orderItems.map((item) => (
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
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <ButtonGroup size="sm">
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id="tooltip-view">View</Tooltip>}>
                      <Button
                        as={Link}
                        to={`/admin/dashboard/orders/${order.orderID}`}
                        variant="light">
                        <BsEye />
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id="tooltip-delete">Delete</Tooltip>}>
                      <Button variant="light">
                        <BsTrash />
                      </Button>
                    </OverlayTrigger>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
