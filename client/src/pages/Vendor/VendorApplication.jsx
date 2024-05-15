import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  useUploadVendorLogoMutation,
  useVendorApplicationMutation,
} from "../../features/vendorApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../features/authSlice";
import MetaTags from "../../components/MetaTags";

export default function VendorApplication() {
  const [agreeToConditions, setAgreeToConditions] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo?.success && userInfo?.data?.vendor) {
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  const [uploadVendorLogo, { isLoading: loadingImageUpload }] =
    useUploadVendorLogoMutation();

  const [vendorApplication, { isLoading }] = useVendorApplicationMutation();

  const [formState, setFormState] = useState({
    vendorName: "",
    vendorPhone: userInfo?.data?.phoneNumber,
    vendorEmail: userInfo?.data?.email,
    vendorDescription: "",
    productsDescription: "",
    estimatedDeliveryTime: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await vendorApplication({
        ...formState,
        vendorLogo: imageUrl,
      }).unwrap();
      if (res?.success) {
        dispatch(setCredentials({ ...res }));
        toast.success("Application submitted successfully!");
        navigate("/profile");
      }
    } catch (error) {
      toast.error(
        (error && error?.data?.message) ||
          "An error occurred while submitting the form."
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("logoImage", e.target.files[0]);
    try {
      const res = await uploadVendorLogo(formData).unwrap();
      setImageUrl(res.image);
      toast.success(res.message || "Image uploaded successfully");
    } catch (error) {
      toast.error((error && error.data.message) || "Failed to upload image");
    }
  };

  return (
    <section className="py-5">
      <MetaTags
        title="Apply Now to Become a Vendor - Campusify"
        description="Apply now to become a vendor on Campusify. Fill in the required details and submit your application."
        keywords="vendor application, apply to become a vendor, Campusify"
      />
      <Container>
        <h5 className="border-bottom pb-3 text-uppercase text-center">
          Apply Now to Become a Vendor!
        </h5>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="my-3 py-3">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={3}
                      column
                      className="text-center text-lg-start">
                      Applicant's Full Name
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Control
                        readOnly
                        type="text"
                        value={`${userInfo?.data?.lastName} ${userInfo?.data?.otherNames}`}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={3}
                      column
                      className="text-center text-lg-start">
                      Business Email
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Control
                        required
                        type="email"
                        name="vendorEmail"
                        value={formState.vendorEmail}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={3}
                      column
                      className="text-center text-lg-start">
                      Business Name
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Control
                        required
                        type="text"
                        name="vendorName"
                        value={formState.vendorName}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formFile" className="mb-3">
                    <Form.Label
                      sm={3}
                      column
                      className="text-center text-lg-start">
                      Business Logo
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Control
                        required
                        type="file"
                        onChange={uploadFileHandler}
                      />
                      {loadingImageUpload && (
                        <div className="mt-3">Uploading image...</div>
                      )}
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={3}
                      column
                      className="text-center text-lg-start">
                      Business Phone
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Control
                        required
                        type="tel"
                        name="vendorPhone"
                        onChange={handleInputChange}
                        value={formState.vendorPhone}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={3}
                      column
                      className="text-center text-lg-start">
                      Estimated Delivery Time
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Select
                        required
                        name="estimatedDeliveryTime"
                        value={formState.estimatedDeliveryTime}
                        onChange={handleInputChange}>
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
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={3}
                      column
                      className="text-center text-lg-start">
                      Describe Your Business
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Control
                        rows={3}
                        as="textarea"
                        name="vendorDescription"
                        onChange={handleInputChange}
                        value={formState.vendorDescription}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={3}
                      column
                      className="text-center text-lg-start">
                      Describe Your Products
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Control
                        rows={3}
                        as="textarea"
                        name="productsDescription"
                        onChange={handleInputChange}
                        value={formState.productsDescription}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="my-4 d-flex justify-content-center">
                    <Form.Check
                      required
                      type="checkbox"
                      checked={agreeToConditions}
                      label="Agree to terms and conditions"
                      onChange={(e) => setAgreeToConditions(e.target.checked)}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-end my-3">
                    <Button
                      type="submit"
                      variant="dark"
                      className="text-uppercase px-4 fw-semibold">
                      {isLoading ? (
                        <Spinner size="sm" animation="border">
                          <span className="visually-hidden"></span>
                        </Spinner>
                      ) : (
                        "Apply"
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
