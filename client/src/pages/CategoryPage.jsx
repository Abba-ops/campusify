import { useEffect, useState } from "react";
import {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} from "../features/productsApiSlice";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import MetaTags from "../components/MetaTags";
import SingleProductPlaceholder from "../components/SingleProductPlaceholder";
import BackToTop from "../components/BackToTop";

export default function CategoryPage() {
  const { category, categoryId } = useParams();
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsByCategoryQuery({ category, categoryId });

  const { data: categories, isLoading: loadingCategories } =
    useGetCategoriesQuery();

  let sortedProducts = [];

  if (products && products?.data) {
    sortedProducts = [...products?.data]?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  const handleLoadMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 8);
  };

  const formattedCategoryName = category
    .replace(/-/g, " ")
    .replace(/-/g, " ")
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  useEffect(() => {
    if (!loadingCategories) {
      const foundCategory = categories?.data?.find(
        (category) =>
          category?.name.toLowerCase() === formattedCategoryName.toLowerCase()
      );
      setSelectedCategory(foundCategory);
    }
  }, [
    categories,
    setSelectedCategory,
    loadingCategories,
    formattedCategoryName,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className="py-5">
      {!loadingCategories && (
        <MetaTags
          title={`${formattedCategoryName} - Campusify`}
          description={`Explore ${formattedCategoryName} products on Campusify. Find the best deals and discover a wide range of products under ${formattedCategoryName} category.`}
          keywords={`${formattedCategoryName}, products, ecommerce, online shopping, ${selectedCategory?.name}, Campusify`}
        />
      )}
      <Row className="mb-3">
        <Col>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {formattedCategoryName}
              </li>
            </ol>
          </nav>
        </Col>
      </Row>
      <Row>
        <Col lg={3} className="d-none d-lg-block">
          <ListGroup className="rounded-0">
            <ListGroup.Item as={"h5"} className="text-bg-dark text-uppercase">
              {selectedCategory?.name}
            </ListGroup.Item>
            {selectedCategory &&
              selectedCategory?.subcategories?.map((subcategory) => (
                <ListGroup.Item key={subcategory?._id} className="py-3">
                  <Link
                    to={`/${selectedCategory?.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}/${subcategory?.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}/${subcategory?._id}`}
                    className="text-decoration-none fw-semibold">
                    {subcategory?.name}
                  </Link>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
        <Col lg={9}>
          {isError ? (
            <div className="text-center mt-5">
              <h5 className="text-danger">Error Fetching Products</h5>
              <p className="mt-3">
                Sorry, we couldn't retrieve the products at the moment. Please
                try again later or contact support.
              </p>
            </div>
          ) : (
            <>
              {sortedProducts?.length === 0 && !isLoading && (
                <div className="text-center mt-5">
                  <h5>No products found in this category</h5>
                  <p>Please check back later or explore other categories.</p>
                </div>
              )}
              <Row>
                {isLoading ? (
                  Array.from({ length: visibleProducts }, (_, index) => (
                    <Col key={index} lg={4} md={6} className="mb-4">
                      <SingleProductPlaceholder />
                    </Col>
                  ))
                ) : (
                  <>
                    {sortedProducts
                      ?.slice(0, visibleProducts)
                      ?.map((product, index) => (
                        <Col key={index} md={4} lg={4} className="mb-4">
                          <ProductCard product={product} />
                        </Col>
                      ))}
                    {!isLoading &&
                      visibleProducts <
                        (sortedProducts ? sortedProducts?.length : 0) && (
                        <div className="d-flex justify-content-center">
                          <Button
                            variant="dark"
                            onClick={handleLoadMore}
                            className="mt-4 px-4">
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
      <BackToTop />
    </Container>
  );
}
