import React from "react";
import {
  useGetProductsByVendorQuery,
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
  ListGroup,
} from "react-bootstrap";
import { toast } from "react-toastify";
import TablePlaceholder from "../../components/TablePlaceholder";
import { numberWithCommas } from "../../utils/cartUtils";

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

  const { data: vendorProducts, isLoading: loadingVendorProducts } =
    useGetProductsByVendorQuery(vendorId);

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
          <Link to="/admin/dashboard/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/admin/dashboard/vendors">Vendors</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          {vendor && (
            <>
              <span className="d-inline d-lg-none">
                {vendor.data.vendorName.slice(0, 10)}
                {vendor.data.vendorName.length > 10 && "..."}
              </span>
              <span className="d-none d-lg-inline">
                {vendor.data.vendorName.slice(0, 20)}
                {vendor.data.vendorName.length > 20 && "..."}
              </span>
            </>
          )}
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
            <Card className="border-0 rounded-0 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-center mb-3">
                  <Image
                    fluid
                    roundedCircle
                    loading="lazy"
                    className="profile-picture-lg border"
                    src={vendor && vendor.data.vendorLogo}
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
                    <Badge bg="light" text="dark">
                      Approved
                    </Badge>
                  </Card.Text>
                )}
                {vendor.data.approvalStatus === "pending" && (
                  <div className="d-flex justify-content-center mt-3">
                    <Stack direction="horizontal" gap={3}>
                      <Button
                        variant="primary"
                        className="text-uppercase text-white fw-semibold"
                        onClick={handleApprove}>
                        {isApproving ? (
                          <Spinner size="sm" animation="border" />
                        ) : (
                          "Approve"
                        )}
                      </Button>
                      <Button
                        variant="dark"
                        className="text-uppercase fw-semibold"
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
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Card className="border-0 rounded-0 shadow-sm">
              <Card.Body>
                <Form>
                  <FloatingLabel label="Vendor Description">
                    <Form.Control
                      plaintext
                      readOnly
                      as="textarea"
                      value={vendor.data.vendorDescription}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Products Description">
                    <Form.Control
                      plaintext
                      readOnly
                      as="textarea"
                      value={vendor.data.productsDescription}
                    />
                  </FloatingLabel>

                  <FloatingLabel label="Sales Count">
                    <Form.Control
                      plaintext
                      readOnly
                      type="text"
                      value={vendor.data.salesCount}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Estimated Delivery Time">
                    <Form.Control
                      plaintext
                      readOnly
                      type="text"
                      value={vendor.data.estimatedDeliveryTime}
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
                      plaintext
                      readOnly
                      type="email"
                      value={vendor.data.user.email}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Creator Phone Number">
                    <Form.Control
                      plaintext
                      readOnly
                      type="text"
                      value={vendor.data.user.phoneNumber}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="User Type">
                    <Form.Control
                      plaintext
                      readOnly
                      type="text"
                      value={vendor.data.user.userType}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Approval Status">
                    <Form.Control
                      plaintext
                      readOnly
                      type="text"
                      value={vendor.data.approvalStatus}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Approval Date">
                    <Form.Control
                      plaintext
                      readOnly
                      type="text"
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
