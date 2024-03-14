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

export default function VendorApplication() {
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.success && userInfo.data.vendor) {
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  const [vendorApplication, { isLoading }] = useVendorApplicationMutation();

  const [formState, setFormState] = useState({
    businessEmail: "",
    businessName: "",
    businessPhone: "",
    businessDescription: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await vendorApplication(formState).unwrap();
      if (res.success) {
        dispatch(setCredentials({ ...res }));
        navigate("/profile");
        toast.success("Application submitted successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <section className="bg-white py-5">
      <Container>
        <h5 className="border-bottom pb-3 text-uppercase text-center">
          Apply Now to Become a Vendor!
        </h5>
        <Row>
          <Col>
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
                      Business Email
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Control
                        required
                        type="email"
                        name="businessEmail"
                        value={formState.businessEmail}
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
                        name="businessName"
                        value={formState.businessName}
                        onChange={handleInputChange}
                      />
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
                        name="businessPhone"
                        value={formState.businessPhone}
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
                        name="businessDescription"
                        value={formState.businessDescription}
                        onChange={handleInputChange}
                      />
                    </Col>
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
