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
  Spinner,
  Breadcrumb,
  FloatingLabel,
  Form,
  Stack,
} from "react-bootstrap";
import { toast } from "react-toastify";
import TablePlaceholder from "../../components/TablePlaceholder";

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

      if (res.success) {
        refetch();
        toast.success(res.message);
      }
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
              <Card.Text className="text-center">
                {vendor.data.vendorEmail}
              </Card.Text>
              <Card.Text className="text-center">
                {vendor.data.vendorPhone}
              </Card.Text>
              {vendor.data.isApproved && (
                <Card.Text className="text-center">
                  <Badge bg="primary">Approved</Badge>
                </Card.Text>
              )}
              {vendor.data.approvalStatus === "pending" && (
                <div className="d-flex justify-content-center mt-3">
                  <Stack direction="horizontal" gap={3}>
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
                  </Stack>
                </div>
              )}
            </Card>
          </Col>
          <Col md={8}>
            <Card className="border-0 rounded-0 shadow-sm">
              <Card.Body>
                <Card.Title>Vendor Information</Card.Title>
                <Form>
                  <FloatingLabel label="Vendor Description">
                    <Form.Control
                      readOnly
                      as="textarea"
                      className="border-0"
                      style={{ minHeight: "100px" }}
                      value={vendor.data.vendorDescription}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Sales Count">
                    <Form.Control
                      readOnly
                      type="text"
                      className="border-0"
                      value={vendor.data.salesCount}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Creator Full Name">
                    <Form.Control
                      readOnly
                      type="text"
                      className="border-0"
                      value={`${vendor.data.user.lastName} ${vendor.data.user.otherNames}`}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Creator Email">
                    <Form.Control
                      readOnly
                      type="email"
                      className="border-0"
                      value={vendor.data.user.email}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Creator Phone Number">
                    <Form.Control
                      readOnly
                      type="text"
                      className="border-0"
                      value={vendor.data.user.phoneNumber}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="User Type">
                    <Form.Control
                      readOnly
                      type="text"
                      className="border-0"
                      value={vendor.data.user.userType}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Approval Status">
                    <Form.Control
                      readOnly
                      type="text"
                      className="border-0"
                      value={vendor.data.approvalStatus}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Approval Date">
                    <Form.Control
                      readOnly
                      type="text"
                      className="border-0"
                      value={
                        vendor.data.approvalDate
                          ? new Date(
                              vendor.data.approvalDate
                            ).toLocaleDateString()
                          : "Not Approved"
                      }
                    />
                  </FloatingLabel>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}
