import React from "react";
import { Container, Row, Col, Card, Table, ListGroup } from "react-bootstrap";

export default function VendorHome() {
  const stats = {
    products: 120,
    customers: 45,
    orders: 34,
    revenue: 5600,
    reviews: 85,
    messages: 10,
  };

  const recentOrders = [
    { id: 1, customer: "John Doe", date: "2024-07-18", total: "$120.00" },
    { id: 2, customer: "Jane Smith", date: "2024-07-17", total: "$80.00" },
    { id: 3, customer: "Alice Johnson", date: "2024-07-16", total: "$150.00" },
    { id: 4, customer: "Bob Brown", date: "2024-07-15", total: "$200.00" },
  ];

  const notifications = [
    { id: 1, message: "New product added successfully." },
    { id: 2, message: "Order #1024 has been shipped." },
    { id: 3, message: "New customer review received." },
  ];

  const tasks = [
    { id: 1, task: "Update product descriptions.", completed: false },
    { id: 2, task: "Respond to customer messages.", completed: false },
    { id: 3, task: "Review sales reports.", completed: true },
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
          <h2 className="text-start">{getCurrentGreeting()}, Vendor!</h2>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6} lg={3} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Products</Card.Title>
              <Card.Text>
                Total Products: <strong>{stats.products}</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Customers</Card.Title>
              <Card.Text>
                Total Customers: <strong>{stats.customers}</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Orders</Card.Title>
              <Card.Text>
                Total Orders: <strong>{stats.orders}</strong>
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
              <Card.Title>Recent Orders</Card.Title>
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
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.date}</td>
                      <td>{order.total}</td>
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
              <Card.Title>Notifications</Card.Title>
              <ListGroup variant="flush">
                {notifications.map((notification) => (
                  <ListGroup.Item key={notification.id}>
                    {notification.message}
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
