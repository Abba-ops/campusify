import React from "react";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../features/productsApiSlice";
import Loader from "../../components/Loader";

export default function AdminProductDetails() {
  const { id: productId } = useParams();

  const { data: product, isLoading } = useGetProductDetailsQuery(productId);

  console.log(product);

  return (
    <>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center my-3">
            <div>
              <h2>{product.data.productName}</h2>
            </div>
            <div></div>
          </div>
          <Row>
            <Col className="bg-white border-0" lg={8} as={Card}>
              <Row>
                <Col lg={6}>
                  <div>
                    <Image fluid loading="lazy" src={product.data.imageUrl} />
                  </div>
                </Col>
                <Col lg={6}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Product ID:</strong> {product.data._id}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Product Name:</strong> {product.data.productName}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Category:</strong> {product.data.category}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Brand:</strong> {product.data.brand}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Price:</strong> {product.data.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Stock Count:</strong> {product.data.countInStock}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Average Rating:</strong> {product.data.rating}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Description:</strong>{" "}
                      {product.data.productDescription}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Vendor ID:</strong> {product.data.vendor._id}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Vendor Name:</strong>{" "}
                      {product.data.vendor.vendorName}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Vendor Email:</strong>{" "}
                      {product.data.vendor.contactInformation.email}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Vendor Phone:</strong>{" "}
                      {product.data.vendor.contactInformation.phone}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Vendor Verification Status:</strong>{" "}
                      {product.data.vendor.verificationStatus}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Number of Sales:</strong>{" "}
                      {product.data.vendor.numberOfSales}
                    </ListGroup.Item>

                    <ListGroup.Item>horizontally!</ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
