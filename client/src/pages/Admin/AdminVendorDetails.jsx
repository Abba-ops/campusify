import React from "react";
import {
  useGetVendorByIdQuery,
  useUpdateVendorStatusMutation,
} from "../../features/vendorApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Col,
  Row,
  Card,
  Button,
  Image,
  Badge,
  ListGroup,
  Spinner,
  Breadcrumb,
  ButtonGroup,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import { toast } from "react-toastify";
import TablePlaceholder from "../../components/TablePlaceholder";
import { format } from "date-fns";

export default function AdminVendorDetails() {
  const { vendorId } = useParams();
  const navigate = useNavigate();

  const {
    data: vendor,
    isLoading,
    isError,
    refetch,
  } = useGetVendorByIdQuery(vendorId);
  const [updateVendorStatus, { isLoading: isApproving }] =
    useUpdateVendorStatusMutation();

  const handleApprove = async () => {
    try {
      const res = await updateVendorStatus({
        vendorId,
        status: "approved",
      }).unwrap();
      refetch();
      toast.success(res.message);
    } catch (error) {
      toast.error(
        (error && error.data.message) ||
          "An error occurred while approving the vendor."
      );
    }
  };

  const handleReject = async () => {
    try {
      const res = await updateVendorStatus({
        vendorId,
        status: "rejected",
      }).unwrap();

      if (res.success) {
        refetch();
        navigate("/admin/dashboard/vendors");
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(
        (error && error.data.message) ||
          "An error occurred while rejecting the vendor."
      );
    }
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/admin/dashboard/"}>Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={"/admin/dashboard/vendors"}>Vendors</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          {vendor && vendor.data.vendorName}
        </Breadcrumb.Item>
      </Breadcrumb>
      {isError ? (
        <div className="text-center mt-5">
          <h4 className="text-danger">Error Loading Vendor Details</h4>
          <p className="mt-3">
            Failed to load vendor details. Please try again later.
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
          <Col md={4} className="mb-4 mb-lg-0">
            <Card className="border-0 rounded-0 shadow-sm py-3">
              <div className="d-flex justify-content-center mb-3">
                <Image
                  fluid
                  roundedCircle
                  loading="lazy"
                  className="profile-picture-lg border"
                  src={vendor && vendor.data.user.profilePictureURL}
                />
              </div>
              <Card.Title className="text-center">
                {vendor.data.vendorName}
              </Card.Title>
              <Card.Text className="text-center mb-2">
                {vendor.data.vendorEmail}
              </Card.Text>
              <Card.Text className="text-center">
                {vendor.data.vendorPhone}
              </Card.Text>
              <Card.Text className="text-center">
                {vendor.data.isApproved && <Badge bg="success">Approved</Badge>}
              </Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Sales Count:</strong> {vendor.data.salesCount}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>User Type:</strong>{" "}
                  <span className="text-capitalize">
                    {vendor.data.user.userType}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Approval Status:</strong>{" "}
                  <span className="text-capitalize">
                    {vendor.data.approvalStatus}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Approval Date:</strong>{" "}
                  <span>
                    {vendor.data.approvalDate
                      ? new Date(vendor.data.approvalDate).toLocaleDateString()
                      : "Not Approved"}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Date Joined:</strong>{" "}
                  {format(new Date(vendor.data.dateJoined), "MM/dd/yyyy")}
                </ListGroup.Item>
              </ListGroup>
              {vendor.data.approvalStatus === "pending" && (
                <div className="text-center mt-3">
                  <ButtonGroup>
                    <Button
                      variant="outline-dark"
                      className="text-uppercase"
                      onClick={handleApprove}>
                      {isApproving ? (
                        <Spinner size="sm" animation="border" />
                      ) : (
                        "Approve"
                      )}
                    </Button>
                    <Button
                      variant="outline-dark"
                      className="text-uppercase"
                      onClick={handleReject}>
                      {isApproving ? (
                        <Spinner size="sm" animation="border" />
                      ) : (
                        "Reject"
                      )}
                    </Button>
                  </ButtonGroup>
                </div>
              )}
            </Card>
          </Col>
          <Col md={8}>
            <Card className="border-0 rounded-0 shadow-sm">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <FloatingLabel label="Description">
                    <Form.Control
                      as="textarea"
                      value={vendor.data.vendorDescription}
                      readOnly
                    />
                  </FloatingLabel>
                </ListGroup.Item>
                <ListGroup.Item>
                  <FloatingLabel label="Creator Full Name">
                    <Form.Control
                      type="email"
                      value={`${vendor.data.user.lastName} ${vendor.data.user.otherNames}`}
                      readOnly
                    />
                  </FloatingLabel>
                </ListGroup.Item>
                <ListGroup.Item>
                  <FloatingLabel label="Creator Phone Number">
                    <Form.Control
                      value={vendor.data.user.phoneNumber}
                      type="email"
                      readOnly
                    />
                  </FloatingLabel>
                </ListGroup.Item>
                <ListGroup.Item>
                  <FloatingLabel label="Creator Email">
                    <Form.Control type="email" value={vendor.data.user.email} />
                  </FloatingLabel>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}
