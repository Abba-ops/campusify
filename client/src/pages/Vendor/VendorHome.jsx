import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  ListGroup,
  Form,
  Button,
} from "react-bootstrap";
import { useGetVendorDashboardQuery } from "../../features/vendorApiSlice";
import TablePlaceholder from "../../components/TablePlaceholder";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../../features/tasksApiSlice";
import { toast } from "react-toastify";

export default function VendorHome() {
  const [newTask, setNewTask] = useState("");

  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const {
    data: vendorDashboard,
    isError,
    isLoading,
    refetch,
  } = useGetVendorDashboardQuery();

  const getCurrentGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 18) return "Good afternoon";
    return "Good evening";
  };

  const stats = vendorDashboard?.data?.stats || {};
  const recentOrders = vendorDashboard?.data?.recentOrders || [];
  const notifications = vendorDashboard?.data?.notifications || [];
  const tasks = vendorDashboard?.data?.tasks || [];

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      try {
        await createTask({ task: newTask, role: "vendor" });
        setNewTask("");
        refetch();
      } catch (error) {
        toast.error((error && error?.data?.message) || "Error creating task");
      }
    }
  };

  const handleTaskToggle = async (task) => {
    try {
      const res = await updateTask({
        ...task,
        completed: !task.completed,
      }).unwrap();
      if (res.success) {
        refetch();
      }
    } catch (error) {
      toast.error((error && error?.data?.message) || "Error updating task");
    }
  };

  return (
    <>
      <div>
        <h2>{getCurrentGreeting()}, Vendor!</h2>
        <p>
          Manage products, track orders, and update your profile to keep
          customers happy.
        </p>
      </div>

      {isError ? (
        <div className="text-center mt-5">
          <h5 className="text-danger">Error Loading Dashboard Data</h5>
          <p className="mt-3">
            Failed to load dashboard data. Please try again later.
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
          <Row className="mb-4">
            <Col md={6} lg={3} className="mb-3">
              <Card className="text-center rounded-0">
                <Card.Body>
                  <Card.Title>Products</Card.Title>
                  <Card.Text>
                    <strong>{stats.totalProduct}</strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3} className="mb-3">
              <Card className="text-center rounded-0">
                <Card.Body>
                  <Card.Title>Customers</Card.Title>
                  <Card.Text>
                    <strong>{stats.totalCustomers}</strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3} className="mb-3">
              <Card className="text-center rounded-0">
                <Card.Body>
                  <Card.Title>Orders</Card.Title>
                  <Card.Text>
                    <strong>{stats.totalOrders}</strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3} className="mb-3">
              <Card className="text-center rounded-0">
                <Card.Body>
                  <Card.Title>Revenue</Card.Title>
                  <Card.Text>
                    <strong>&#8358;{stats.totalRevenue}</strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={8} className="mb-4">
              <Card className="rounded-0">
                <Card.Body>
                  <Card.Title>Recent Orders</Card.Title>
                  {recentOrders.length > 0 ? (
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Customer</th>
                          <th>Date</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order, index) => (
                          <tr key={order._id}>
                            <td>{index + 1}</td>
                            <td>
                              {order.user.lastName} {order.user.otherNames}
                            </td>
                            <td>
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td>&#8358;{order.totalPrice}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <p className="text-center mt-3">
                      No recent orders available
                    </p>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} className="mb-4">
              <Card className="rounded-0">
                <Card.Body>
                  <Card.Title>Notifications</Card.Title>
                  {notifications.length > 0 ? (
                    <ListGroup variant="flush">
                      {notifications.map((notification) => (
                        <ListGroup.Item key={notification._id}>
                          {notification.message}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <p className="text-center mt-3">
                      No notifications available
                    </p>
                  )}
                </Card.Body>
              </Card>
              <Card className="mt-3 rounded-0">
                <Card.Body>
                  <Card.Title>Tasks</Card.Title>
                  {tasks.length > 0 ? (
                    <ListGroup variant="flush">
                      {tasks.map((task) => (
                        <ListGroup.Item key={task._id}>
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleTaskToggle(task)}
                          />{" "}
                          {task.task}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <p className="text-center mt-3">No tasks available</p>
                  )}
                  <Form onSubmit={handleTaskSubmit} className="mt-3">
                    <Form.Group controlId="formTask">
                      <Form.Label>Add New Task</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter task"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="dark" type="submit" className="mt-2">
                      Add Task
                    </Button>
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
