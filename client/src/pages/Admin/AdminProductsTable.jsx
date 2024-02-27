import React from "react";
import {
  Button,
  ButtonGroup,
  Image,
  Placeholder,
  Table,
} from "react-bootstrap";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";
import { useGetProductsQuery } from "../../features/productsApiSlice";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../../utils/cartUtils";
import Loader from "../../components/Loader";
import TablePlaceholder from "../../components/TablePlaceholder";

export default function AdminProductsTable() {
  const { data: products, isLoading } = useGetProductsQuery();

  return (
    <>
      <div className="d-lg-flex justify-content-between align-items-center my-3">
        <div>
          <h2>Product Management</h2>
          <p>
            <small>
              View and manage product listings. Ensure accurate and up-to-date
              product information.
            </small>
          </p>
        </div>
        <div></div>
      </div>
      {isLoading ? (
        <>
          <TablePlaceholder />
          <TablePlaceholder />
          <TablePlaceholder />
          <TablePlaceholder />
          <TablePlaceholder />
        </>
      ) : (
        <Table size="lg" responsive striped>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Image</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Stock Count</th>
              <th>Average Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.data.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.productName}</td>
                <td>
                  <Image src={product.imageUrl} width={50} />
                </td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>&#8358;{numberWithCommas(product.price)}</td>
                <td>{product.countInStock}</td>
                <td>{product.rating}</td>
                <td>
                  <ButtonGroup>
                    <Link to={`/admin/dashboard/products/${product._id}`}>
                      <Button variant="info" size="sm">
                        <BsEye />
                      </Button>
                    </Link>
                    <Link to={`/admin/dashboard/products/${product._id}/edit`}>
                      <Button variant="success" size="sm">
                        <BsPencil />
                      </Button>
                    </Link>
                    <Button variant="danger" size="sm">
                      <BsTrash />
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
