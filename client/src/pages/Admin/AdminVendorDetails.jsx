import React from "react";
import {
  useApproveVendorMutation,
  useGetVendorByIdQuery,
  useRejectVendorMutation,
} from "../../features/vendorApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Card,
  Button,
  Image,
  Badge,
  ListGroup,
} from "react-bootstrap";
import { toast } from "react-toastify";

export default function AdminVendorDetails() {
  const navigate = useNavigate();
  const { vendorId } = useParams();
  const {
    data: vendor,
    isLoading,
    isError,
    refetch,
  } = useGetVendorByIdQuery(vendorId);
  const [approveVendor, { isLoading: isApproving }] =
    useApproveVendorMutation();
  const [rejectVendor, { isLoading: isRejecting }] = useRejectVendorMutation();
  const handleApprove = async () => {
    try {
      const res = await approveVendor(vendorId).unwrap();
      refetch();
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleReject = async () => {
    try {
      const res = await rejectVendor(vendorId).unwrap();
      refetch();
      navigate("/admin/dashboard/vendors");
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      {isError ? (
        <div>Error loading vendor details</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <Row>
          <Col md={4} className="col-12">
            <Card className="p-3">
              <div className="d-flex justify-content-center my-3">
                <Image
                  fluid
                  roundedCircle
                  loading="lazy"
                  className="profile-picture-lg border"
                  src={vendor.data.user.profilePictureURL}
                />
              </div>
              <Card.Title className="text-center">
                {`${vendor.data.businessName}`}
                {vendor.data.isApproved && (
                  <Badge bg="success" className="ms-2">
                    Approved
                  </Badge>
                )}
              </Card.Title>
              <Card.Subtitle className="text-center mb-2 text-muted">
                {vendor.data.businessEmail}
              </Card.Subtitle>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Sales Count:</strong> {vendor.data.salesCount}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Approval Status:</strong> {vendor.data.approvalStatus}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Date Joined:</strong>{" "}
                  {new Date(vendor.data.dateJoined).toLocaleDateString()}
                </ListGroup.Item>
              </ListGroup>
              {vendor.data.approvalStatus === "pending" && (
                <div className="text-center mt-3">
                  <Button variant="success" onClick={handleApprove}>
                    Approve
                  </Button>{" "}
                  <Button variant="danger" onClick={handleReject}>
                    Reject
                  </Button>
                </div>
              )}
            </Card>
          </Col>
          <Col md={8} className="col-12">
            <Card className="p-3">
              <h2 className="mb-4 text-center">Vendor Details</h2>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>
                    <strong>Vendor ID:</strong>
                  </span>
                  <span>{vendor.data._id}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>
                    <strong>Description:</strong>
                  </span>
                  <span>{vendor.data.businessDescription}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>
                    <strong>Approved:</strong>
                  </span>
                  <span>{vendor.data.isApproved ? "Yes" : "No"}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>
                    <strong>Average Rating:</strong>
                  </span>
                  <span>{vendor.data.averageRating}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>
                    <strong>Business Phone:</strong>
                  </span>
                  <span>{vendor.data.businessPhone}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>
                    <strong>Approval Date:</strong>
                  </span>
                  <span>
                    {vendor.data.approvalDate
                      ? new Date(vendor.data.approvalDate).toLocaleDateString()
                      : "Not Approved"}
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}
