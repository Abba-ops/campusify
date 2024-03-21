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
import { useVendorApplicationMutation } from "../../features/vendorApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../features/authSlice";
import MetaTags from "../../components/MetaTags";

export default function VendorApplication() {
  const [agreeToConditions, setAgreeToConditions] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.success && userInfo.data.vendor) {
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  const [vendorApplication, { isLoading }] = useVendorApplicationMutation();

  const [formState, setFormState] = useState({
    vendorEmail: "",
    vendorName: "",
    vendorPhone: "",
    vendorDescription: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await vendorApplication(formState).unwrap();
      if (res.success) {
        dispatch(setCredentials({ ...res }));
        toast.success("Application submitted successfully!");
        navigate("/profile");
      }
    } catch (error) {
      toast.error(
        (error && error.data.message) ||
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
                      Full Name
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Control
                        readOnly
                        type="text"
                        value={`${userInfo.data.lastName} ${userInfo.data.otherNames}`}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={3}
                      column
                      className="text-center text-lg-start">
                      Vendor Email
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
                      Vendor Name
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
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={3}
                      column
                      className="text-center text-lg-start">
                      Vendor Phone
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Control
                        required
                        type="tel"
                        name="vendorPhone"
                        value={formState.vendorPhone}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={3}
                      column
                      className="text-center text-lg-start">
                      Product Description
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="vendorDescription"
                        value={formState.vendorDescription}
                        onChange={handleInputChange}
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
                      className="text-uppercase px-4">
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
