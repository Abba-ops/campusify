import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
  Spinner,
  Stack,
} from "react-bootstrap";
import { numberWithCommas } from "../utils/cartUtils";
import { useDispatch, useSelector } from "react-redux";
import { PaystackButton } from "react-paystack";
import { toast } from "react-toastify";
import { useCreateNewOrderMutation } from "../features/ordersApiSlice";
import { useNavigate } from "react-router-dom";
import { clearCartItems } from "../features/cartSlice";
import MetaTags from "../components/MetaTags";

export default function CartCheckout() {
  const { userInfo } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [showOrderItems, setShowOrderItems] = useState(false);
  const [email, setEmail] = useState(userInfo.data.email);
  const [phone, setPhone] = useState(userInfo.data.phoneNumber);
  const [name] = useState(
    `${userInfo.data.lastName} ${userInfo.data.otherNames}`
  );
  const [campus, setCampus] = useState("");
  const [building, setBuilding] = useState("");
  const [locationNumber, setLocationNumber] = useState("");
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const publicKey = "pk_test_930251134c7b44c106b9cb5b678b626a4bd438c5";
  const [createNewOrder, { isLoading: isLoadingPlaceOrder }] =
    useCreateNewOrderMutation();

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
      setPaymentConfirmed(true);
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
        toast.success("Your order has been placed successfully!");
        dispatch(clearCartItems());
        navigate(`/order/${result.data.orderID}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleOrderItemsHandler = () => {
    setShowOrderItems((prevState) => !prevState);
  };

  return (
    <section className="py-5">
      <MetaTags
        title="Checkout - Campusify"
        description="Review and complete your order on Campusify's secure checkout."
        keywords="checkout, order, complete, payment, Campusify"
      />
      <Container>
        <Row>
          <Col lg={8} className="mb-5 mb-lg-0">
            <ListGroup>
              <ListGroup.Item>
                <h5 className="text-uppercase my-2">Confirm Your Order</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form className="py-3">
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={4}
                      column
                      className="text-center text-lg-start">
                      Select User Type
                    </Form.Label>
                    <Col sm={7} className="d-flex justify-content-center">
                      <Stack direction="horizontal" gap={3}>
                        <Form.Check
                          readOnly
                          type="radio"
                          label="Student"
                          name="userType"
                          checked={userInfo.data.userType === "student"}
                        />
                        <Form.Check
                          readOnly
                          type="radio"
                          label="Staff"
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
                        type="email"
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
                        type="tel"
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
                        disabled={campus.length === 0}
                        required
                        onChange={(e) => setBuilding(e.target.value)}
                        value={building}>
                        <option value="">Select Building/Residence</option>
                        {userInfo.data.userType === "student" && (
                          <>
                            {campus === "east" && (
                              <>
                                <option value="Rev. James Abolarin Hall">
                                  Rev. James Abolarin Hall
                                </option>
                                <option value="Mary Bojuwoye Hall">
                                  Mary Bojuwoye Hall
                                </option>
                                <option value="Faculty">Faculty</option>
                              </>
                            )}
                            {campus === "west" && (
                              <>
                                <option value="Male Residence A">
                                  Male Residence A
                                </option>
                                <option value="Male Residence B">
                                  Male Residence B
                                </option>
                                <option value="Omowonuola Female Residence">
                                  Omowonuola Female Residence
                                </option>
                                <option value="Law Faculty">Law Faculty</option>
                                <option value="Management and Social Science Faculty">
                                  Management and Social Science Faculty
                                </option>
                              </>
                            )}
                          </>
                        )}
                        {userInfo.data.userType === "staff" && (
                          <>
                            {campus === "west" && (
                              <option value="Faculty">Faculty</option>
                            )}
                            <option value="Staff Quarters">
                              Staff Quarters
                            </option>
                          </>
                        )}
                        <option value="Cafeteria">Cafeteria</option>
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
                        type="text"
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
                        placeholder="Type your comment here..."
                      />
                    </Col>
                  </Form.Group>
                </Form>
                <div className="d-flex justify-content-end mb-4">
                  {paymentConfirmed ? (
                    <Button
                      onClick={placeOrder}
                      className="fw-semibold text-uppercase px-4"
                      variant="dark"
                      disabled={!paymentConfirmed}>
                      {isLoadingPlaceOrder ? (
                        <Spinner size="sm" animation="border" className="me-2">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      ) : (
                        "Complete Order"
                      )}
                    </Button>
                  ) : (
                    <PaystackButton
                      className="btn btn-dark text-uppercase px-4 fw-semibold"
                      {...componentProps}
                    />
                  )}
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={4}>
            <ListGroup>
              <ListGroup.Item>
                <Row className="my-3">
                  <Col xs={6}>
                    {cartItems.length === 1
                      ? "1 item in cart"
                      : `${cartItems.length} items in cart`}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span
                      className="text-primary fw-bold"
                      onClick={toggleOrderItemsHandler}>
                      {showOrderItems ? "Hide Order Items" : "Show Order Items"}
                    </span>
                    {showOrderItems && (
                      <ListGroup variant="flush">
                        {cartItems.map((cartItem) => (
                          <ListGroup.Item key={cartItem.id}>
                            <Row className="align-items-center">
                              <Col xs={2}>
                                <Image
                                  src={cartItem.imageUrl}
                                  alt={cartItem.productName}
                                  className="profile-picture-sm"
                                />
                              </Col>
                              <Col className="text-truncate">
                                {cartItem.productName}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col xs={6}>Total (Before Tax)</Col>
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
                  <Col xs={6}>Tax Total</Col>
                  <Col xs={6} className="text-end text-primary">
                    &#8358;{numberWithCommas(cart.taxPrice)}
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col xs={6}>Grand Total</Col>
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
