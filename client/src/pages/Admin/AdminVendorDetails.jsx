import { useState } from "react";
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
  Spinner,
  Breadcrumb,
  Stack,
  ListGroup,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { format } from "date-fns";
import VendorLoadingPlaceholder from "../../components/VendorLoadingPlaceholder";

const TruncatedText = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= maxLength) return <p>{text}</p>;

  const truncatedText = isExpanded ? text : text.slice(0, maxLength) + "...";

  return (
    <div>
      <p>{truncatedText}</p>
      <Button variant="link" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "Read less" : "Read more"}
      </Button>
    </div>
  );
};

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

      if (res?.success) {
        refetch();
        toast.success(res?.message);
      }
    } catch (error) {
      toast.error(
        (error && error?.data?.message) ||
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

      if (res?.success) {
        refetch();
        navigate("/admin/dashboard/vendors");
        toast.success(res?.message);
      }
    } catch (error) {
      toast.error(
        (error && error?.data?.message) ||
          "An error occurred while rejecting the vendor."
      );
    }
  };

  return (
    <>
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/admin/dashboard/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/admin/dashboard/vendors">Vendors</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              <span className="d-inline d-lg-none">
                {vendor?.data?.vendorName?.slice(0, 10)}
                {vendor?.data?.vendorName?.length > 10 && "..."}
              </span>
              <span className="d-none d-lg-inline">
                {vendor?.data?.vendorName?.slice(0, 20)}
                {vendor?.data?.vendorName?.length > 20 && "..."}
              </span>
            </>
          )}
        </Breadcrumb.Item>
      </Breadcrumb>
      {isError ? (
        <div className="text-center mt-5">
          <h5 className="text-danger">Error Loading Vendor Details</h5>
          <p className="mt-3">
            Failed to load vendor details. Please try again later.
          </p>
        </div>
      ) : isLoading ? (
        <VendorLoadingPlaceholder />
      ) : (
        <Row>
          <Col md={4} className="mb-4 mb-lg-0">
            <Card className="shadow-sm">
              <Card.Body className="text-center">
                <Image
                  fluid
                  roundedCircle
                  loading="lazy"
                  className="profile-picture-lg border mb-3"
                  src={vendor && vendor?.data?.vendorLogo}
                />
                <h5 className="mb-3">{vendor?.data?.vendorName}</h5>
                {vendor?.data?.approvalStatus === "pending" && (
                  <div className="d-flex justify-content-center">
                    <Stack direction="horizontal" gap={3}>
                      <Button
                        variant="primary"
                        className="text-white"
                        onClick={handleApprove}>
                        {isApproving ? (
                          <Spinner size="sm" animation="border" />
                        ) : (
                          "Approve"
                        )}
                      </Button>
                      <Button
                        variant="dark"
                        className="px-4"
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
            <Card className="shadow-sm mt-3">
              <Card.Body>
                <h5>Recent Products</h5>
                {loadingVendorProducts ? (
                  <></>
                ) : vendorProducts?.data?.length === 0 ? (
                  <p className="text-muted">
                    No recent products available for this vendor.
                  </p>
                ) : (
                  <ListGroup variant="flush">
                    {vendorProducts?.data?.slice(-5)?.map((vendorProduct) => (
                      <ListGroup.Item key={vendorProduct?._id}>
                        <div className="text-truncate">
                          <Link
                            className="text-decoration-none"
                            to={`/admin/dashboard/products/${vendorProduct?._id}`}>
                            {vendorProduct?.productName}
                          </Link>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Card className="shadow-sm mb-3">
              <Card.Body>
                <h5>Vendor Description</h5>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <TruncatedText
                      text={vendor?.data?.vendorDescription}
                      maxLength={200}
                    />
                    <TruncatedText
                      text={vendor?.data?.productsDescription}
                      maxLength={200}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <p>
                      <strong>Estimated Delivery Time: </strong>
                      {vendor?.data?.estimatedDeliveryTime}
                    </p>
                    <p>
                      <strong>Approval Date: </strong>
                      {vendor?.data?.approvalStatus === "approved"
                        ? vendor?.data?.approvalDate &&
                          format(new Date(vendor?.data?.approvalDate), "PPP")
                        : "Not Approved"}
                    </p>
                    <p>
                      <strong>Date Joined: </strong>
                      {vendor?.data?.dateJoined &&
                        format(new Date(vendor?.data?.dateJoined), "PPP")}
                    </p>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>

            <Card className="shadow-sm">
              <Card.Body>
                <h5>Contact Information</h5>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Email: </strong>
                    {vendor?.data?.vendorEmail}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Phone: </strong>
                    {vendor?.data?.vendorPhone}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Average Rating: </strong>
                    {vendor?.data?.averageRating}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Sales Count: </strong>
                    {vendor?.data?.salesCount}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Approval Status: </strong>
                    {vendor?.data?.approvalStatus}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Created By: </strong>
                    {vendor?.data?.user?.otherNames}{" "}
                    {vendor?.data?.user?.lastName}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Creator's Email: </strong>
                    {vendor?.data?.user?.email}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Creator's Phone: </strong>
                    {vendor?.data?.user?.phoneNumber}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}
