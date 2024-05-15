import React from "react";
import { Offcanvas, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CategoryOffcanvas({
  show,
  handleClose,
  categories,
  isLoading,
  isError,
}) {
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Explore Categories</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {isLoading ? (
          <Placeholder animation="glow">
            <Placeholder as="h5" size="lg" />
            {[...Array(3)].map((_, index) => (
              <Placeholder key={index} xs={6} />
            ))}
          </Placeholder>
        ) : isError ? (
          <div>Error fetching categories.</div>
        ) : (
          <ul className="list-unstyled">
            {categories?.data.map((category) => (
              <li key={category._id} className="mb-4">
                <h5 className="mb-3">
                  <Link
                    onClick={() => handleClose()}
                    to={`/category/${category.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}/${category._id}`}
                    className="text-decoration-none text-capitalize text-dark">
                    {category.name}
                  </Link>
                </h5>
                {category?.subcategories &&
                  category?.subcategories.length > 0 && (
                    <ul className="list-unstyled ms-4">
                      {category?.subcategories.map((subcat) => (
                        <li key={subcat._id} className="mb-2">
                          <Link
                            onClick={() => handleClose()}
                            to={`/${category.name
                              .toLowerCase()
                              .replace(/\s+/g, "-")}/${subcat.name
                              .toLowerCase()
                              .replace(/\s+/g, "-")}/${subcat._id}`}
                            className="text-decoration-none text-capitalize text-muted">
                            {subcat.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
          </ul>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
