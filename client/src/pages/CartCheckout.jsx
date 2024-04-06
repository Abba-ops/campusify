import React, { useState } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Stack,
} from "react-bootstrap";
import { numberWithCommas } from "../utils/cartUtils";
import { useSelector } from "react-redux";
import { PaystackButton } from "react-paystack";
import { toast } from "react-toastify";
import { useCreateNewOrderMutation } from "../features/ordersApiSlice";
import { useNavigate } from "react-router-dom";

export default function CartCheckout() {
  const { userInfo } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [email, setEmail] = useState(userInfo.data.email);
  const [phone, setPhone] = useState(userInfo.data.phoneNumber);
  const [name] = useState(
    `${userInfo.data.lastName} ${userInfo.data.otherNames}`
  );
  const [campus, setCampus] = useState("");
  const [building, setBuilding] = useState("");
  const [locationNumber, setLocationNumber] = useState("");
  const [comment, setComment] = useState("");

  const publicKey = "pk_test_930251134c7b44c106b9cb5b678b626a4bd438c5";
  const [createNewOrder, { isLoading }] = useCreateNewOrderMutation();

  const componentProps = {
    email: email,
    amount: Math.ceil(cart.totalPrice * 100),
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Proceed to Payment",
    onSuccess: () => {
      toast.success("Payment Successful! Thank you for your purchase.");
      placeOrder();
    },
    onClose: () => {
      toast.error("Payment Cancelled or Error occurred. Please try again.");
    },
  };

  const navigate = useNavigate();

  const placeOrder = async () => {
    try {
      const result = await createNewOrder({
        comment,
        deliveryAddress: { campus, building, locationNumber },
        itemsPrice: cart.itemsPrice,
        totalPrice: cart.totalPrice,
        taxPrice: cart.taxPrice,
        orderItems: cart.cartItems,
      }).unwrap();

      if (result.success) {
        toast.success(result.message);
        navigate(`/order/${result.data._id}`);
      }
    } catch (error) {
      console.error("Error placing order: ", error);
    }
  };

  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col lg={8} className="mb-5 mb-lg-0">
            <Card className="py-3">
              <Card.Body>
                <Form>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={4}
                      column
                      className="text-center text-lg-start">
                      User Type
                    </Form.Label>
                    <Col sm={7} className="d-flex justify-content-center">
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
                      sm={4}
                      column
                      className="text-center text-lg-start">
                      Full Name
                    </Form.Label>
                    <Col sm={7}>
                      <Form.Control
                        readOnly
                        type="text"
                        value={`${userInfo.data.lastName} ${userInfo.data.otherNames}`}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={4}
                      column
                      className="text-center text-lg-start">
                      Email Address
                    </Form.Label>
                    <Col sm={7}>
                      <Form.Control
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={4}
                      column
                      className="text-center text-lg-start">
                      Phone Number
                    </Form.Label>
                    <Col sm={7}>
                      <Form.Control
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={4}
                      column
                      className="text-center text-lg-start">
                      Campus
                    </Form.Label>
                    <Col sm={7}>
                      <Form.Select
                        aria-label="Select Campus"
                        onChange={(e) => setCampus(e.target.value)}
                        value={campus}>
                        <option value="">Select Campus</option>
                        <option value="west">West Campus</option>
                        <option value="east">East Campus</option>
                      </Form.Select>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={4}
                      column
                      className="text-center text-lg-start">
                      Building/Residence Name
                    </Form.Label>
                    <Col sm={7}>
                      <Form.Select
                        required
                        onChange={(e) => setBuilding(e.target.value)}
                        value={building}>
                        <option value="">Select Building/Residence</option>
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
                      sm={4}
                      className="text-center text-lg-start">
                      Room/Office Number
                    </Form.Label>
                    <Col sm={7}>
                      <Form.Control
                        required
                        type="number"
                        value={locationNumber}
                        onChange={(e) => setLocationNumber(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      column
                      sm={4}
                      className="text-center text-lg-start">
                      Add a Comment (Optional)
                    </Form.Label>
                    <Col sm={7}>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                </Form>
                <div className="d-flex justify-content-end my-3">
                  <PaystackButton
                    className="btn btn-dark text-uppercase px-4 fw-semibold"
                    {...componentProps}
                  />
                </div>
              </Card.Body>
            </Card>
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
