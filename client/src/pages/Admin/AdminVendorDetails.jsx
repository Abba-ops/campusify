import React from "react";
import { useGetVendorByIdQuery } from "../../features/vendorApiSlice";
import { useParams } from "react-router-dom";
import { Col, Container, Row, Card, Button } from "react-bootstrap";

export default function AdminVendorDetails() {
  const { vendorId } = useParams();
  const { data: vendor, isLoading } = useGetVendorByIdQuery(vendorId);

  console.log(vendor);

  const handleApprove = () => {
    // Implement logic to approve vendor
    console.log("Vendor approved");
  };

  const handleReject = () => {
    // Implement logic to reject vendor
    console.log("Vendor rejected");
  };

  return (
    <Container className="mt-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Row>
          <Col md={6}>
            {vendor.data.approvalStatus === "pending" ? (
              // Show vendor application UI if approval status is pending
              <Card>
                <Card.Body>
                  <h1 className="text-center">Vendor Application Review</h1>
                  <p>
                    <strong>Business Name:</strong> {vendor.data.businessName}
                  </p>
                  <p>
                    <strong>Business Description:</strong>{" "}
                    {vendor.data.businessDescription}
                  </p>
                  {/* Other vendor application details... */}
                  <div className="text-center mt-3">
                    <Button variant="success" onClick={handleApprove}>
                      Approve
                    </Button>{" "}
                    <Button variant="danger" onClick={handleReject}>
                      Reject
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ) : (
              // Show vendor details if approval status is approved
              <Card>
                <Card.Header>
                  <h1 className="text-center">{vendor.data.businessName}</h1>
                </Card.Header>
                <Card.Body>
                  <p>Email: {vendor.data.businessEmail}</p>
                  <p>Phone: {vendor.data.businessPhone}</p>
                  <p>Sales Count: {vendor.data.salesCount}</p>
                  <p>Approval Status: {vendor.data.approvalStatus}</p>
                  <p>Description: {vendor.data.businessDescription}</p>
                  <p>
                    Date Joined:{" "}
                    {new Date(vendor.data.dateJoined).toLocaleDateString()}
                  </p>
                  <p>Approved: {vendor.data.isApproved ? "Yes" : "No"}</p>
                  <p>Average Rating: {vendor.data.averageRating}</p>

                  {/* Social Media Links */}
                  <p>Social Media Links:</p>
                  <ul className="list-unstyled">
                    <li>
                      Facebook:{" "}
                      <a
                        href={vendor?.socialMediaLinks?.facebook}
                        target="_blank"
                        rel="noopener noreferrer">
                        {vendor?.socialMediaLinks?.facebook}
                      </a>
                    </li>
                    <li>
                      Twitter:{" "}
                      <a
                        href={vendor?.socialMediaLinks?.twitter}
                        target="_blank"
                        rel="noopener noreferrer">
                        {vendor?.socialMediaLinks?.twitter}
                      </a>
                    </li>
                    <li>
                      Instagram:{" "}
                      <a
                        href={vendor?.socialMediaLinks?.instagram}
                        target="_blank"
                        rel="noopener noreferrer">
                        {vendor?.socialMediaLinks?.instagram}
                      </a>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col md={6}></Col>
        </Row>
      )}
    </Container>
  );
}
