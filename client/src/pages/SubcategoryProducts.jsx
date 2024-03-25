import React, { useEffect, useState } from "react";
import {
  useGetCategoriesQuery,
  useGetProductsBySubcategoryQuery,
} from "../features/productsApiSlice";
import MetaTags from "../components/MetaTags";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Col, Container, Row, Button, ListGroup } from "react-bootstrap";
import SingleProductPlaceholder from "../components/SingleProductPlaceholder";

export default function SubcategoryProducts() {
  const { category: categoryName, subcategory, subcategoryId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(6);

  const { data: categories, isLoading: loadingCategories } =
    useGetCategoriesQuery();

  const formattedSubcategoryName = subcategory
    .replace(/-/g, " ")
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const {
    data: productsData,
    isError: productsError,
    isLoading: productsLoading,
  } = useGetProductsBySubcategoryQuery({ subcategory, subcategoryId });

  let sortedProducts = [];

  if (productsData && productsData.data) {
    sortedProducts = [...productsData.data].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  const loadMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 6);
  };

  useEffect(() => {
    if (!loadingCategories) {
      const foundCategory = categories.data.find(
        (category) =>
          category.name.toLowerCase() === categoryName.replace(/-/g, " ")
      );
      setSelectedCategory(foundCategory);
    }
  }, [categories, setSelectedCategory, loadingCategories, categoryName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className="py-5">
      {!loadingCategories && (
        <MetaTags
          title={`${formattedSubcategoryName} - ${selectedCategory?.name} - Campusify`}
          description={`Discover ${formattedSubcategoryName} under ${selectedCategory?.name} category on Campusify. Find the best products and deals.`}
          keywords={`${formattedSubcategoryName}, ${selectedCategory?.name}, products, Campusify`}
        />
      )}
      <Row className="mb-3">
        <Col>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link
                  to={`/category/${categoryName}/${selectedCategory?._id}`}
                  className="text-capitalize">
                  {categoryName.replace(/-/g, " ")}
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {formattedSubcategoryName && (
                  <>
                    <span className="d-inline d-lg-none">
                      {formattedSubcategoryName.slice(0, 10)}
                      {formattedSubcategoryName.length > 10 && "..."}
                    </span>
                    <span className="d-none d-lg-inline">
                      {formattedSubcategoryName}
                    </span>
                  </>
                )}
              </li>
            </ol>
          </nav>
        </Col>
      </Row>
      <Row>
        <Col lg={3} className="d-none d-lg-block">
          <ListGroup className="rounded-0">
            <ListGroup.Item as={"h5"} className="text-bg-dark text-uppercase">
              {selectedCategory && selectedCategory.name}
            </ListGroup.Item>
            {selectedCategory &&
              selectedCategory.subcategories.map((subcategory) => (
                <ListGroup.Item key={subcategory._id} className="py-3">
                  <Link
                    to={`/${selectedCategory.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}/${subcategory.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}/${subcategory._id}`}
                    className="text-decoration-none text-uppercase fw-semibold">
                    {subcategory.name}
                  </Link>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
        <Col lg={9}>
          {productsError ? (
            <div className="text-center mt-5">
              <h4 className="text-danger">Error Fetching Products</h4>
              <p className="mt-3">
                Apologies, we couldn't fetch the products at the moment. Please
                try again later or contact support.
              </p>
            </div>
          ) : (
            <>
              {sortedProducts.length === 0 && !productsLoading && (
                <div className="text-center mt-5">
                  <h4>No products found in this category</h4>
                  <p>Please check back later or explore other categories.</p>
                </div>
              )}
              <Row>
                {productsLoading ? (
                  Array.from({ length: visibleProducts }, (_, index) => (
                    <Col key={index} lg={4} md={6} className="mb-4">
                      <SingleProductPlaceholder />
                    </Col>
                  ))
                ) : (
                  <>
                    {sortedProducts
                      .slice(0, visibleProducts)
                      .map((product, index) => (
                        <Col key={index} md={4} lg={4} className="mb-4">
                          <ProductCard product={product} />
                        </Col>
                      ))}
                    {!productsLoading &&
                      visibleProducts <
                        (sortedProducts ? sortedProducts.length : 0) && (
                        <div className="d-flex justify-content-center">
                          <Button
                            variant="dark"
                            onClick={loadMoreProducts}
                            className="text-uppercase mt-4 px-4 fw-semibold">
                            Load More
                          </Button>
                        </div>
                      )}
                  </>
                )}
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
