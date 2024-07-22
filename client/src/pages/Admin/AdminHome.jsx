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
import { useGetAdminDashboardQuery } from "../../features/usersApiSlice";
import TablePlaceholder from "../../components/TablePlaceholder";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../../features/tasksApiSlice";
import { toast } from "react-toastify";
import { formatCurrency } from "../../utilities";
import { format } from "date-fns";

export default function AdminHome() {
  const [newTask, setNewTask] = useState("");

  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const {
    data: adminDashboard,
    isError,
    isLoading,
    refetch,
  } = useGetAdminDashboardQuery();

  const getCurrentGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 18) return "Good afternoon";
    return "Good evening";
  };

  const stats = adminDashboard?.data?.stats || {};
  const recentMessages = adminDashboard?.data?.recentMessages || [];
  const recentActivities = adminDashboard?.data?.recentActivities || [];
  const tasks = adminDashboard?.data?.tasks || [];

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      try {
        await createTask({ task: newTask, role: "admin" }).unwrap();
        setNewTask("");
        refetch();
        toast.success("Task created successfully!");
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
        toast.success("Task updated successfully!");
      }
    } catch (error) {
      toast.error((error && error?.data?.message) || "Error updating task");
    }
  };

  return (
    <>
      <div>
        <h2>{getCurrentGreeting()}, Admin!</h2>
        <p>
          Welcome to the admin dashboard. Manage users, monitor activities, and
          view recent messages here.
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
                  <Card.Title>Total Users</Card.Title>
                  <Card.Text>
                    <strong>{stats.totalUsers}</strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3} className="mb-3">
              <Card className="text-center rounded-0">
                <Card.Body>
                  <Card.Title>Active Users</Card.Title>
                  <Card.Text>
                    <strong>{stats.activeUsers}</strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3} className="mb-3">
              <Card className="text-center rounded-0">
                <Card.Body>
                  <Card.Title>Total Orders</Card.Title>
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
                    <strong>&#8358;{formatCurrency(stats.totalRevenue)}</strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={8} className="mb-4">
              <Card className="rounded-0">
                <Card.Body>
                  <Card.Title>Recent Activities</Card.Title>
                  {recentActivities.length > 0 ? (
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Type</th>
                          <th>Action</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentActivities.map((activity, index) => (
                          <tr key={activity._id}>
                            <td>{index + 1}</td>
                            <td>{activity.type}</td>
                            <td>{activity.message}</td>
                            <td>
                              {format(new Date(activity.createdAt), "PPpp")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <p className="text-center mt-3">
                      No recent activities available
                    </p>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} className="mb-4">
              <Card className="rounded-0">
                <Card.Body>
                  <Card.Title>Recent Messages</Card.Title>
                  {recentMessages.length > 0 ? (
                    <ListGroup variant="flush">
                      {recentMessages.map((message) => (
                        <ListGroup.Item key={message._id}>
                          <strong>{message.sender?.vendorName}:</strong>{" "}
                          {message.content}
                          <br />
                          <small className="text-muted">
                            {format(new Date(message.createdAt), "PPpp")}
                          </small>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <p className="text-center mt-3">
                      No recent messages available
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
