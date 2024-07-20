import React from "react";
import { Container, Row, Col, Card, Table, ListGroup } from "react-bootstrap";

export default function AdminHome() {
  const stats = {
    totalUsers: 500,
    activeUsers: 300,
    totalOrders: 1000,
    revenue: 15000,
    pendingReviews: 20,
    systemAlerts: 5,
  };

  const recentActivities = [
    { id: 1, user: "Admin", action: "Updated user roles.", date: "2024-07-20" },
    { id: 2, user: "Admin", action: "Fixed system bug.", date: "2024-07-19" },
    {
      id: 3,
      user: "Admin",
      action: "Reviewed pending reviews.",
      date: "2024-07-18",
    },
    {
      id: 4,
      user: "Admin",
      action: "Added new analytics dashboard.",
      date: "2024-07-17",
    },
  ];

  const recentMessages = [
    { id: 1, sender: "User123", message: "Having issues with order #456." },
    { id: 2, sender: "Vendor456", message: "Product out of stock update." },
    {
      id: 3,
      sender: "User789",
      message: "Requesting a refund for order #789.",
    },
  ];

  const tasks = [
    { id: 1, task: "Review system logs.", completed: false },
    { id: 2, task: "Update system documentation.", completed: false },
    { id: 3, task: "Check pending user registrations.", completed: true },
  ];

  const getCurrentGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <Container fluid className="mt-3">
      <Row className="mb-4">
        <Col>
          <h2 className="text-start">{getCurrentGreeting()}, Admin!</h2>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6} lg={3} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>
                Total Users: <strong>{stats.totalUsers}</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Active Users</Card.Title>
              <Card.Text>
                Active Users: <strong>{stats.activeUsers}</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <Card.Text>
                Total Orders: <strong>{stats.totalOrders}</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Revenue</Card.Title>
              <Card.Text>
                Total Revenue: <strong>${stats.revenue}</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={8} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Recent Activities</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Action</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map((activity) => (
                    <tr key={activity.id}>
                      <td>{activity.id}</td>
                      <td>{activity.user}</td>
                      <td>{activity.action}</td>
                      <td>{activity.date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Recent Messages</Card.Title>
              <ListGroup variant="flush">
                {recentMessages.map((message) => (
                  <ListGroup.Item key={message.id}>
                    <strong>{message.sender}:</strong> {message.message}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Tasks</Card.Title>
              <ListGroup variant="flush">
                {tasks.map((task) => (
                  <ListGroup.Item key={task.id}>
                    <input type="checkbox" checked={task.completed} readOnly />{" "}
                    {task.task}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
