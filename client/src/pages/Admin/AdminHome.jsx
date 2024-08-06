import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  ListGroup,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import {
  useCreateTaskMutation,
  useGetAdminDashboardQuery,
  useUpdateTaskMutation,
} from "../../features/usersApiSlice";
import TablePlaceholder from "../../components/TablePlaceholder";
import { toast } from "react-toastify";
import { formatCurrency } from "../../utilities";
import { format } from "date-fns";

const MAX_TASK_LENGTH = 50;
const MAX_TEXT_LENGTH = 50;

const AdminHome = () => {
  const [newTask, setNewTask] = useState("");
  const [createTask, { isLoading: isSubmittingTask }] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [expandedMessage, setExpandedMessage] = useState(null);

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

  const {
    stats = {},
    recentMessages = [],
    recentActivities = [],
    tasks = [],
  } = adminDashboard?.data || {};

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (newTask.trim() && newTask.length <= MAX_TASK_LENGTH) {
      try {
        await createTask({ task: newTask, role: "admin" }).unwrap();
        setNewTask("");
        refetch();
        toast.success("Task created successfully!");
      } catch (error) {
        toast.error(error?.data?.message || "Error creating task");
      }
    } else {
      toast.error(`Task cannot exceed ${MAX_TASK_LENGTH} characters`);
    }
  };

  const handleTaskToggle = async (task) => {
    try {
      const res = await updateTask({
        ...task,
        completed: !task?.completed,
      }).unwrap();
      if (res?.success) {
        refetch();
        toast.success("Task updated successfully!");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Error updating task");
    }
  };

  const handleExpandToggle = (id) => {
    setExpandedMessage(expandedMessage === id ? null : id);
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
        <ErrorMessage />
      ) : isLoading ? (
        <LoadingPlaceholders />
      ) : (
        <>
          <Statistics stats={stats} />
          <Row>
            <Col lg={8} className="mb-4">
              <RecentActivities activities={recentActivities} />
            </Col>
            <Col lg={4} className="mb-4">
              <RecentMessages
                messages={recentMessages}
                expandedMessage={expandedMessage}
                onToggleExpand={handleExpandToggle}
              />
              <Tasks
                tasks={tasks}
                newTask={newTask}
                isSubmittingTask={isSubmittingTask}
                onTaskChange={setNewTask}
                onTaskSubmit={handleTaskSubmit}
                onTaskToggle={handleTaskToggle}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

const ErrorMessage = () => (
  <div className="text-center mt-5">
    <h5 className="text-danger">Error Loading Dashboard Data</h5>
    <p className="mt-3">
      Failed to load dashboard data. Please try again later.
    </p>
  </div>
);

const LoadingPlaceholders = () => (
  <>
    <Row className="mb-4">
      {[1, 2, 3, 4].map((item) => (
        <Col key={item} md={6} lg={3} className="mb-3">
          <Card className="rounded-0 shadow-sm">
            {[...Array(1)].map((_, index) => (
              <TablePlaceholder key={index} />
            ))}
          </Card>
        </Col>
      ))}
    </Row>
    <Row>
      <Col lg={8} className="mb-4">
        <Card className="rounded-0 shadow-sm">
          {[...Array(4)].map((_, index) => (
            <TablePlaceholder key={index} />
          ))}
        </Card>
      </Col>
      <Col lg={4} className="mb-4">
        <Card className="rounded-0 shadow-sm">
          {[...Array(2)].map((_, index) => (
            <TablePlaceholder key={index} />
          ))}
        </Card>
        <Card className="mt-3 rounded-0 shadow-sm">
          {[...Array(3)].map((_, index) => (
            <TablePlaceholder key={index} />
          ))}
        </Card>
      </Col>
    </Row>
  </>
);

const Statistics = ({ stats }) => (
  <Row className="mb-4">
    {[
      { title: "Total Users", value: stats?.totalUsers },
      { title: "Active Users", value: stats?.activeUsers },
      { title: "Total Orders", value: stats?.totalOrders },
      { title: "Revenue", value: `₦${formatCurrency(stats?.totalRevenue)}` },
    ].map((stat, index) => (
      <Col key={index} md={6} lg={3} className="mb-3">
        <Card className="text-center rounded-0 shadow-sm">
          <Card.Body>
            <Card.Title>{stat?.title}</Card.Title>
            <Card.Text>
              <strong>{stat?.value}</strong>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
);

const RecentActivities = ({ activities }) => (
  <Card className="rounded-0 shadow-sm">
    <Card.Body>
      <Card.Title>Recent Activities</Card.Title>
      {activities.length > 0 ? (
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
            {activities.map((activity, index) => (
              <tr key={activity?._id}>
                <td>{index + 1}</td>
                <td>{activity?.type}</td>
                <td>{activity?.message}</td>
                <td>{format(new Date(activity?.createdAt), "PPpp")}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center mt-3">No recent activities available</p>
      )}
    </Card.Body>
  </Card>
);

const RecentMessages = ({ messages, expandedMessage, onToggleExpand }) => (
  <Card className="rounded-0 shadow-sm">
    <Card.Body>
      <Card.Title>Recent Messages</Card.Title>
      {messages?.length > 0 ? (
        <ListGroup variant="flush">
          {messages.map((message) => (
            <ListGroup.Item key={message?._id}>
              <strong>{message?.sender?.vendorName}:</strong>{" "}
              {expandedMessage === message?._id
                ? message?.content
                : truncateText(message?.content)}
              {message.content.length > MAX_TEXT_LENGTH && (
                <Button
                  variant="link"
                  onClick={() => onToggleExpand(message._id)}>
                  {expandedMessage === message?._id ? "Read less" : "Read more"}
                </Button>
              )}
              <br />
              <small className="text-muted">
                {format(new Date(message?.createdAt), "PPpp")}
              </small>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p className="text-center mt-3">No recent messages available</p>
      )}
    </Card.Body>
  </Card>
);

const Tasks = ({
  tasks,
  newTask,
  isSubmittingTask,
  onTaskChange,
  onTaskSubmit,
  onTaskToggle,
}) => (
  <Card className="mt-3 rounded-0 shadow-sm">
    <Card.Body>
      <Card.Title>Tasks</Card.Title>
      {tasks.length > 0 ? (
        <ListGroup variant="flush">
          {tasks
            .filter((task) => !task?.completed)
            .map((task) => (
              <ListGroup.Item key={task?._id}>
                <input
                  type="checkbox"
                  checked={task?.completed}
                  onChange={() => onTaskToggle(task)}
                />{" "}
                {task.task}
              </ListGroup.Item>
            ))}
        </ListGroup>
      ) : (
        <p className="text-center mt-3">No tasks available</p>
      )}
      <Form onSubmit={onTaskSubmit} className="mt-3">
        <Form.Group controlId="formTask">
          <Form.Label>Add New Task</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task"
            value={newTask}
            onChange={(e) => onTaskChange(e.target.value)}
            maxLength={MAX_TASK_LENGTH}
          />
        </Form.Group>
        <Button
          variant="dark"
          type="submit"
          className="mt-2"
          disabled={isSubmittingTask}>
          {isSubmittingTask ? (
            <Spinner size="sm" animation="border">
              <span className="visually-hidden"></span>
            </Spinner>
          ) : (
            "Add Task"
          )}
        </Button>
      </Form>
    </Card.Body>
  </Card>
);

const truncateText = (text) => {
  return text.length > MAX_TEXT_LENGTH
    ? `${text.substring(0, MAX_TEXT_LENGTH)}...`
    : text;
};

export default AdminHome;
