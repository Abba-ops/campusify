import React from "react";
import { useGetOrderByIdQuery } from "../features/ordersApiSlice";
import { useParams } from "react-router-dom";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/cartUtils";
import { useSelector } from "react-redux";

export default function OrderScreen() {
  const { orderId } = useParams();

  const { data: orderData, isLoading } = useGetOrderByIdQuery(orderId);

  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col lg={8} className="mb-5 mb-lg-0"></Col>
          <Col lg={4}>
            <ListGroup>
              <ListGroup.Item>
                <Row className="my-3">
                  <Col xs={6}>
                    {orderData.data.orderItems.length === 1
                      ? "1 item"
                      : `${orderData.data.orderItems.length} items`}
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col xs={6}>Subtotal Amount</Col>
                  <Col xs={6} className="text-end text-primary">
                    &#8358;{numberWithCommas(orderData.data.itemsPrice)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="my-3">
                  <Col xs={6}>Total Taxes</Col>
                  <Col xs={6} className="text-end text-primary">
                    &#8358;{numberWithCommas(orderData.data.taxPrice)}
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col xs={6}>Total Amount</Col>
                  <Col xs={6} className="text-end text-primary">
                    &#8358;{numberWithCommas(orderData.data.totalPrice)}
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
