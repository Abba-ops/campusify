import {
  Button,
  Col,
  Container,
  ListGroup,
  Row,
  Stack,
} from "react-bootstrap";
import { numberWithCommas } from "../utils/cartUtils";
import { useSelector } from "react-redux";
import { Accordion, Form } from "react-bootstrap";
import { PaystackButton } from "react-paystack";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CartCheckout() {
  const { userInfo } = useSelector((state) => state.auth);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const publicKey = "pk_test_930251134c7b44c106b9cb5b678b626a4bd438c5";

  const [email, setEmail] = useState(userInfo.data.email);
  const [phone, setPhone] = useState(userInfo.data.phoneNumber);
  const [name] = useState(
    `${userInfo.data.lastName} ${userInfo.data.otherNames}`
  );

  const componentProps = {
    email: email,
    amount: Math.ceil(cart.totalPrice * 100),
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => {
      toast.success("Payment Successful! Thank you for your purchase.");
    },
    onClose: () => {
      toast.error("Payment Cancelled or Error occurred. Please try again.");
    },
  };

  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col lg={8} className="mb-5 mb-lg-0">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h5 className="text-uppercase">Customer Information</h5>
                </Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label
                        sm={3}
                        column
                        className="text-center text-lg-start">
                        User Type
                      </Form.Label>
                      <Col sm={6} className="d-flex justify-content-center">
                        <Stack direction="horizontal" gap={3}>
                          <Form.Check
                            readOnly
                            type={"radio"}
                            label="Student"
                            name="userType"
                            checked={userInfo.data.userType === "student"}
                          />
                          <Form.Check
                            readOnly
                            label="Staff"
                            type={"radio"}
                            name="userType"
                            checked={userInfo.data.userType === "staff"}
                          />
                        </Stack>
                      </Col>
                    </Form.Group>
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
                        Email Address
                      </Form.Label>
                      <Col sm={6}>
                        <Form.Control
                          readOnly
                          type="text"
                          value={userInfo.data.email}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label
                        sm={3}
                        column
                        className="text-center text-lg-start">
                        Phone Number
                      </Form.Label>
                      <Col sm={6}>
                        <Form.Control
                          required
                          type="text"
                          value={userInfo.data.phoneNumber}
                          readOnly
                        />
                      </Col>
                    </Form.Group>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <h5 className="text-uppercase">Shipping Address</h5>
                </Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label
                        sm={3}
                        column
                        className="text-center text-lg-start">
                        Building/Residence Name
                      </Form.Label>
                      <Col sm={6}>
                        <Form.Select required>
                          {userInfo.data.userType === "student" && (
                            <>
                              <option value="Rev. James Abolarin Hall">
                                Rev. James Abolarin Hall
                              </option>
                              <option value="Mary Bojuwoye Hall">
                                Mary Bojuwoye Hall
                              </option>
                            </>
                          )}
                          <option value="Faculty">Faculty</option>
                          <option value="Cafeteria">Cafeteria</option>
                          {userInfo.data.userType === "staff" && (
                            <>
                              <option value="Staff Quarters">
                                Staff Quarters
                              </option>
                            </>
                          )}
                        </Form.Select>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label
                        column
                        sm={3}
                        className="text-center text-lg-start">
                        Room/Office Number
                      </Form.Label>
                      <Col sm={6}>
                        <Form.Control required type="number" />
                      </Col>
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                      <Button className="text-uppercase px-4" variant="dark">
                        Continue
                      </Button>
                    </div>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <h5 className="text-uppercase">Shipping Method</h5>
                </Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        If you would like to add a comment about your order,
                        please write it in the field below.
                      </Form.Label>
                      <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <Button className="text-uppercase px-4" variant="dark">
                      Continue
                    </Button>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  <h5 className="text-uppercase">Proceed to Payment</h5>
                </Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label
                        sm={3}
                        column
                        className="text-center text-lg-start">
                        Full Name
                      </Form.Label>
                      <Col sm={6}>
                        <Form.Control readOnly type="text" value={name} />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label
                        sm={3}
                        column
                        className="text-center text-lg-start">
                        Email Address
                      </Form.Label>
                      <Col sm={6}>
                        <Form.Control
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label
                        sm={3}
                        column
                        className="text-center text-lg-start">
                        Phone Number
                      </Form.Label>
                      <Col sm={6}>
                        <Form.Control
                          required
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </Col>
                    </Form.Group>
                  </Form>
                  <PaystackButton
                    className="btn btn-dark text-uppercase px-4"
                    {...componentProps}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col lg={4}>
            <ListGroup>
              <ListGroup.Item>
                <Row className="my-3">
                  <Col xs={6}>
                    {cartItems.length === 1
                      ? "1 item"
                      : `${cartItems.length} items`}
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col xs={6}>Subtotal Amount</Col>
                  <Col xs={6} className="text-end text-primary">
                    &#8358;{numberWithCommas(cart.itemsPrice)}
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col xs={6}>Delivery Fee</Col>
                  <Col xs={6} className="text-end text-primary">
                    &#8358;{numberWithCommas(cart.deliveryPrice)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="my-3">
                  <Col xs={6}>Total Taxes</Col>
                  <Col xs={6} className="text-end text-primary">
                    &#8358;{numberWithCommas(cart.taxPrice)}
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col xs={6}>Total Amount</Col>
                  <Col xs={6} className="text-end text-primary">
                    &#8358;{numberWithCommas(cart.totalPrice)}
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
