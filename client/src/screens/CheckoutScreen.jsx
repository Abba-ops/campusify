import {
  Button,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
  Stack,
} from "react-bootstrap";
import { numberWithCommas } from "../utils/cartUtils";
import { useSelector } from "react-redux";
import { Accordion, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CheckoutScreen() {
  const [showCartItems, setShowCartItems] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const { userInfo } = useSelector((state) => state.auth);

  const handleShowCartItems = () => setShowCartItems((prev) => !prev);

  console.log(showCartItems);

  return (
    <section className="bg-white py-5">
      <Container>
        <Row>
          <Col lg={8} className="mb-5 mb-lg-0">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h5 className="text-uppercase">Personal Information</h5>
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
                            disabled
                            type={"radio"}
                            label="Student"
                            name="userType"
                            checked={userInfo.data.userType === "student"}
                          />
                          <Form.Check
                            disabled
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
                          disabled
                          type="text"
                          value={`${userInfo?.data.lastName} ${userInfo?.data.otherNames}`}
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
                          disabled
                          type="text"
                          value={userInfo?.data.email}
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
                          value={userInfo?.data.phoneNumber}
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
                        <Form.Select>
                          <option value=""></option>
                          <option value=""></option>
                          <option value=""></option>
                          <option value=""></option>
                        </Form.Select>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label
                        column
                        sm={3}
                        className="text-center text-lg-start">
                        Room/Unit Number
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
            </Accordion>
          </Col>
          <Col lg={4}>
            <ListGroup className="text-capitalize">
              <ListGroup.Item>
                <Row className="my-3">
                  <Col xs={6}>
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                    items
                  </Col>
                </Row>
                <Row className="my-3">
                  <Link
                    className="text-decoration-none"
                    onClick={handleShowCartItems}>
                    show details
                  </Link>
                  {showCartItems && (
                    <Col
                      className={`${
                        !showCartItems ? "d-none" : "d-block"
                      } my-3`}>
                      {cartItems.map((product, index) => (
                        <Row className="mb-3" key={index}>
                          <Col xs={3}>
                            <Image src={product.imageUrl} fluid />
                          </Col>
                          <Col xs={6}>
                            <Link
                              to={`/product/${product._id}`}
                              className="text-decoration-none">
                              {product.productName}
                            </Link>
                          </Col>
                          <Col>
                            <div className="text-end text-primary">
                              &#8358;{numberWithCommas(product.price)}
                            </div>
                          </Col>
                        </Row>
                      ))}
                    </Col>
                  )}
                </Row>
                <Row className="my-3">
                  <Col xs={6}>Subtotal</Col>
                  <Col xs={6}>
                    <div className="text-end text-primary">
                      &#8358;{numberWithCommas(cart.itemsPrice)}
                    </div>
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col xs={6}>Delivery</Col>
                  <Col xs={6}>
                    <div className="text-end text-primary">
                      &#8358;{numberWithCommas(cart.shippingPrice)}
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="my-3">
                  <Col xs={6}>Taxes</Col>
                  <Col xs={6}>
                    <div className="text-end text-primary">
                      &#8358;{numberWithCommas(cart.taxPrice)}
                    </div>
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col xs={6}>Total</Col>
                  <Col xs={6}>
                    <div className="text-end text-primary">
                      &#8358;{numberWithCommas(cart.totalPrice)}
                    </div>
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
