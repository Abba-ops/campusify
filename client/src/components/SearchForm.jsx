import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

export default function SearchForm({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchQuery);
  };

  return (
    <Form onSubmit={handleSearchSubmit}>
      <InputGroup className="mb-3 mb-lg-0 me-lg-4 w-auto">
        <Form.Control
          type="text"
          className="rounded-0"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />
        <Button
          variant="primary"
          className="text-white rounded-0"
          type="submit">
          <FaSearch />
        </Button>
      </InputGroup>
    </Form>
  );
}
