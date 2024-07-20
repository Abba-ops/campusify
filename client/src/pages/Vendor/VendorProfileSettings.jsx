import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import { useSelector } from "react-redux";

export default function VendorProfileSettings() {
  const { userInfo } = useSelector((state) => state.auth);

  const [vendorData, setVendorData] = useState({
    vendorName: "",
    vendorEmail: "",
    vendorPhone: "",
    productsDescription: "",
    vendorDescription: "",
    estimatedDeliveryTime: "",
    vendorLogo: "",
    socialMediaLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
    },
  });

  useEffect(() => {
    setVendorData({
      vendorName: userInfo?.data?.vendor?.vendorName,
      vendorEmail: userInfo?.data?.vendor?.vendorEmail,
      vendorPhone: userInfo?.data?.vendor?.vendorPhone,
      productsDescription: userInfo?.data?.vendor?.productsDescription,
      vendorDescription: userInfo?.data?.vendor?.vendorDescription,
      estimatedDeliveryTime: userInfo?.data?.vendor?.estimatedDeliveryTime,
      vendorLogo: userInfo?.data?.vendor?.vendorLogo,
      socialMediaLinks: userInfo?.data?.vendor?.socialMediaLinks,
    });
  }, [userInfo]);

  const [logoFile, setLogoFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData({ ...vendorData, [name]: value });
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setVendorData({
      ...vendorData,
      socialMediaLinks: { ...vendorData.socialMediaLinks, [name]: value },
    });
  };

  const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("vendorName", vendorData.vendorName);
    formData.append("vendorEmail", vendorData.vendorEmail);
    formData.append("vendorPhone", vendorData.vendorPhone);
    formData.append("productsDescription", vendorData.productsDescription);
    formData.append("vendorDescription", vendorData.vendorDescription);
    formData.append("estimatedDeliveryTime", vendorData.estimatedDeliveryTime);
    if (logoFile) {
      formData.append("vendorLogo", logoFile);
    }
    for (const [key, value] of Object.entries(vendorData.socialMediaLinks)) {
      formData.append(key, value);
    }
  };

  return (
    <Container fluid className="mt-3">
      <div>
        <h2>Vendor Profile Settings</h2>
        <p>
          Manage your profile information to ensure a professional and
          up-to-date vendor profile.
        </p>
      </div>
      <Row>
        <Col md={6} className="mb-4">
          <Card className="rounded-0">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formVendorName" className="mb-3">
                  <Form.Label>Vendor Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="vendorName"
                    value={vendorData.vendorName}
                    onChange={handleChange}
                    placeholder="Enter vendor name"
                  />
                </Form.Group>
                <Form.Group controlId="formVendorEmail" className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="vendorEmail"
                    value={vendorData.vendorEmail}
                    onChange={handleChange}
                    placeholder="Enter email address"
                  />
                </Form.Group>
                <Form.Group controlId="formVendorPhone" className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="vendorPhone"
                    value={vendorData.vendorPhone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </Form.Group>
                <Form.Group
                  controlId="formProductsDescription"
                  className="mb-3">
                  <Form.Label>Products Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="productsDescription"
                    value={vendorData.productsDescription}
                    onChange={handleChange}
                    placeholder="Describe your products"
                  />
                </Form.Group>
                <Form.Group controlId="formVendorDescription" className="mb-3">
                  <Form.Label>Vendor Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="vendorDescription"
                    value={vendorData.vendorDescription}
                    onChange={handleChange}
                    placeholder="Describe your vendor"
                  />
                </Form.Group>
                <Form.Group
                  controlId="formEstimatedDeliveryTime"
                  className="mb-3">
                  <Form.Label>Estimated Delivery Time</Form.Label>
                  <Form.Control
                    type="text"
                    name="estimatedDeliveryTime"
                    value={vendorData.estimatedDeliveryTime}
                    onChange={handleChange}
                    placeholder="Enter estimated delivery time"
                  />
                </Form.Group>
                <Button variant="dark" type="submit" className="px-4">
                  Update Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="rounded-0">
            <Card.Body>
              <Form.Group controlId="formVendorLogo" className="mb-3">
                <Form.Label>Logo</Form.Label>
                <Form.Control
                  type="file"
                  name="vendorLogo"
                  onChange={handleLogoChange}
                />
              </Form.Group>
              <div className="text-center">
                <Image
                  src={vendorData.vendorLogo}
                  rounded
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            </Card.Body>
          </Card>
          <Card className="mt-3 rounded-0">
            <Card.Body>
              <Card.Title>Social Media Links</Card.Title>
              <Form.Group controlId="formFacebook" className="mb-3">
                <Form.Label>Facebook</Form.Label>
                <Form.Control
                  type="text"
                  name="facebook"
                  value={vendorData.socialMediaLinks.facebook}
                  onChange={handleSocialMediaChange}
                  placeholder="Enter Facebook link"
                />
              </Form.Group>
              <Form.Group controlId="formTwitter" className="mb-3">
                <Form.Label>Twitter</Form.Label>
                <Form.Control
                  type="text"
                  name="twitter"
                  value={vendorData.socialMediaLinks.twitter}
                  onChange={handleSocialMediaChange}
                  placeholder="Enter Twitter link"
                />
              </Form.Group>
              <Form.Group controlId="formInstagram">
                <Form.Label>Instagram</Form.Label>
                <Form.Control
                  type="text"
                  name="instagram"
                  value={vendorData.socialMediaLinks.instagram}
                  onChange={handleSocialMediaChange}
                  placeholder="Enter Instagram link"
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
