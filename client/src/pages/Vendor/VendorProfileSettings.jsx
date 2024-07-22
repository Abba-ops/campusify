import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useUpdateVendorProfileMutation } from "../../features/vendorApiSlice";
import { toast } from "react-toastify";

export default function VendorProfileSettings() {
  const { userInfo } = useSelector((state) => state.auth);
  const [updateVendorProfile, { isLoading }] = useUpdateVendorProfileMutation();

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
    if (userInfo?.data?.vendor) {
      const {
        vendorName,
        vendorEmail,
        vendorPhone,
        productsDescription,
        vendorDescription,
        estimatedDeliveryTime,
        vendorLogo,
        socialMediaLinks,
      } = userInfo.data.vendor;

      setVendorData({
        vendorName,
        vendorEmail,
        vendorPhone,
        productsDescription,
        vendorDescription,
        estimatedDeliveryTime,
        vendorLogo,
        socialMediaLinks,
      });
    }
  }, [userInfo]);

  const [logoFile, setLogoFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prevData) => ({
      ...prevData,
      socialMediaLinks: { ...prevData.socialMediaLinks, [name]: value },
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(URL.createObjectURL(file));
      setVendorData((prevData) => ({ ...prevData, vendorLogo: file.name }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateVendorProfile(vendorData).unwrap();
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <>
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
                  <Form.Select
                    required
                    name="estimatedDeliveryTime"
                    onChange={handleChange}
                    value={vendorData.estimatedDeliveryTime}>
                    <option value="">Select Estimated Delivery Time</option>
                    <option value="15 minutes">Within 15 Minutes</option>
                    <option value="30 minutes">Within 30 Minutes</option>
                    <option value="1 hour">Within 1 Hour</option>
                    <option value="2 hours">Within 2 Hours</option>
                    <option value="3 hours">Within 3 Hours</option>
                    <option value="1 day">Within 1 Day</option>
                    <option value="2 days">Within 2 Days</option>
                    <option value="3 days">Within 3 Days</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="dark" type="submit" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Profile"}
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
                  src={logoFile || vendorData.vendorLogo}
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
    </>
  );
}
