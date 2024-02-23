import React from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  Row,
  Stack,
  Table,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useGetVendorsQuery } from "../../features/vendorApiSlice";
import { Link } from "react-router-dom";

export default function AdminVendorsTable() {
  const { data: vendors, isLoading } = useGetVendorsQuery();

  return (
    <>
      <Table size="lg" responsive bordered striped>
        <thead>
          <tr>vendorName</tr>
        </thead>
        <tbody>
          {!isLoading &&
            vendors.data.map((vendor, index) => (
              <tr key={index}>
                <td>
                  <Link
                    to={`/admin/dashboard/users/${vendor.user._id}`}
                    className="text-decoration-none">
                    <Stack direction="horizontal" gap={3}>
                      <Image
                        fluid
                        roundedCircle
                        loading="lazy"
                        className="profile-picture-sm"
                        src={vendor.user.profilePictureURL}
                      />
                      <Stack direction="vertical">
                        <div>
                          {vendor.user.lastName} {vendor.user.otherNames}
                        </div>
                        <div>{vendor.user.email}</div>
                      </Stack>
                    </Stack>
                  </Link>
                </td>
                <td>{vendor.vendorName}</td>
                <td>{vendor.dateJoined}</td>
                <td>{vendor.dateJoined}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
