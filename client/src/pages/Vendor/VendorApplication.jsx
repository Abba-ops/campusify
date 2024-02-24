import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function VendorApplication() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const { userInfo } = useSelector((state) => state.auth);

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
                      Last name
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Control
                        required
                        type="text"
                        spellCheck={false}
                        value={userInfo.data.lastName}
                        readOnly
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={3}
                      column
                      className="text-center text-lg-start">
                      Other Names
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Control
                        required
                        type="text"
                        spellCheck={false}
                        value={userInfo.data.otherNames}
                        readOnly
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
                      <Form.Control required type="text" spellCheck={false} />
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
                        type="text"
                        spellCheck={false}
                        value={userInfo.data.email}
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
                        type="text"
                        spellCheck={false}
                        value={userInfo.data.phoneNumber}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={3}
                      column
                      className="text-center text-lg-start">
                      Sample images of products
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Control type="file" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={3}
                      column
                      className="text-center text-lg-start">
                      Bank account details
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Control required type="text" spellCheck={false} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={3}
                      column
                      className="text-center text-lg-start">
                      Estimated delivery time
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Control required type="text" spellCheck={false} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={3}
                      column
                      className="text-center text-lg-start">
                      Categories or types of products
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Control required type="text" spellCheck={false} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={3}
                      column
                      className="text-center text-lg-start">
                      Links to social media profiles (if any)
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Control required type="text" spellCheck={false} />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1">
                    <Form.Label
                      sm={3}
                      column
                      className="text-center text-lg-start">
                      Description of the products
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Control as="textarea" rows={3} />
                    </Col>
                  </Form.Group>
                  <Form.Group className="my-4 d-flex justify-content-center">
                    <Form.Check
                      required
                      type="checkbox"
                      label="Agree to terms and conditions"
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-end my-3">
                    <Button
                      type="submit"
                      variant="dark"
                      className="text-uppercase px-4">
                      Apply
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
