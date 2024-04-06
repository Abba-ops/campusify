import React from "react";
import {
  Breadcrumb,
  Button,
  ButtonGroup,
  OverlayTrigger,
  Table,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../features/ordersApiSlice";
import TablePlaceholder from "../../components/TablePlaceholder";
import { numberWithCommas } from "../../utils/cartUtils";
import { BsEye, BsTrash } from "react-icons/bs";

export default function AdminOrdersTable() {
  const { data: orders, isLoading } = useGetOrdersQuery();

  console.log(orders);

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
      {isLoading ? (
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
              <th>User Email</th>
              <th>Items Price</th>
              <th>Total Price</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.data.map((order) => (
              <tr>
                <td>{order._id}</td>
                <td>
                  {order.user.otherNames} {order.user.lastName}
                </td>
                <td>{order.user.email}</td>
                <td>&#8358;{numberWithCommas(order.itemsPrice)}</td>
                <td>&#8358;{numberWithCommas(order.totalPrice)}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <ButtonGroup size="sm">
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id="tooltip-view">View</Tooltip>}>
                      <Button
                        as={Link}
                        to={`/admin/dashboard/users/${order._id}`}
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
