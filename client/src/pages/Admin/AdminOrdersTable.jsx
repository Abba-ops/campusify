import { useState } from "react";
import {
  Breadcrumb,
  Button,
  ButtonGroup,
  OverlayTrigger,
  Table,
  Tooltip,
  Pagination,
  Stack,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../features/ordersApiSlice";
import TablePlaceholder from "../../components/TablePlaceholder";
import { BsEye, BsTrash } from "react-icons/bs";
import { formatCurrency } from "../../utilities";

export default function AdminOrdersTable() {
  const { data: orders, isLoading, isError } = useGetOrdersQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders =
    orders?.data?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const orderTableHeadings = [
    "Order ID",
    "User Name",
    "Phone Number",
    "Items Price",
    "Tax Price",
    "Total Price",
    "Order Items",
    "Order Date",
    "Status",
    "Completion Status",
    "Actions",
  ];

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
          <h5 className="text-danger">Error Loading Orders</h5>
          <p className="mt-3">Failed to load orders. Please try again later.</p>
        </div>
      ) : isLoading ? (
        <TablePlaceholder
          headers={orderTableHeadings}
          rowCount={itemsPerPage}
        />
      ) : (
        <>
          {currentOrders?.length === 0 ? (
            <div className="text-center mt-5">
              <h5>No Orders Found</h5>
              <p>There are currently no orders available.</p>
            </div>
          ) : (
            <>
              <Table size="sm" responsive striped>
                <thead>
                  <tr>
                    {orderTableHeadings.map((heading, index) => (
                      <th key={index}>{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentOrders?.map((order) => (
                    <tr key={order?.orderID}>
                      <td>{order?.orderID}</td>
                      <td>
                        {order?.user?.otherNames} {order?.user?.lastName}
                      </td>
                      <td>{order?.user?.phoneNumber}</td>
                      <td>&#8358;{formatCurrency(order?.itemsPrice)}</td>
                      <td>&#8358;{formatCurrency(order?.taxPrice)}</td>
                      <td>&#8358;{formatCurrency(order?.totalPrice)}</td>
                      <td>
                        <Stack direction="horizontal" gap={2}>
                          {order?.orderItems?.slice(-2).map((item, index) => (
                            <Image
                              key={index}
                              src={item?.imageUrl}
                              className="profile-picture-sm"
                            />
                          ))}
                        </Stack>
                      </td>
                      <td>{new Date(order?.createdAt).toLocaleDateString()}</td>
                      <td>{order?.isPaid ? "Paid" : "Unpaid"}</td>
                      <td>
                        {order?.isOrderDelivered ? "Completed" : "Pending"}
                      </td>
                      <td>
                        <ButtonGroup size="sm">
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip-view">View</Tooltip>}>
                            <Button
                              as={Link}
                              to={`/admin/dashboard/orders/${order?.orderID}`}
                              variant="light">
                              <BsEye />
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="tooltip-delete">Delete</Tooltip>
                            }>
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
              {orders &&
                orders?.data &&
                orders?.data?.length > itemsPerPage && (
                  <div className="d-flex justify-content-center">
                    <Pagination>
                      {[
                        ...Array(
                          Math.ceil(orders?.data?.length / itemsPerPage)
                        ),
                      ].map((_, index) => (
                        <Pagination.Item
                          key={index + 1}
                          active={index + 1 === currentPage}
                          onClick={() => paginate(index + 1)}>
                          {index + 1}
                        </Pagination.Item>
                      ))}
                    </Pagination>
                  </div>
                )}
            </>
          )}
        </>
      )}
    </>
  );
}
