import { useParams } from "react-router-dom";
import {
  useGetUserVendorProductQuery,
  useGetVendorProfileQuery,
} from "../features/vendorApiSlice";
import { Col, Container, Row } from "react-bootstrap";
import CarouselProducts from "../components/CarouselProducts";

export default function VendorProfilePage() {
  const { vendorId } = useParams();

  const {
    data: vendorData,
    isLoading: loadingVendorProfile,
    isError: errorLoadingVendorProfile,
  } = useGetVendorProfileQuery(vendorId);

  const {
    data: vendorProducts,
    isLoading: loadingVendorProducts,
    isError: errorVendorProducts,
  } = useGetUserVendorProductQuery(vendorId);

  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col lg={9}>
            {errorLoadingVendorProfile ? (
              <div className="text-center mt-5">
                <h5 className="text-danger">Error Loading Vendor Profile</h5>
                <p className="mt-3">
                  Failed to load vendor details. Please try again later.
                </p>
              </div>
            ) : loadingVendorProfile ? (
              <></>
            ) : (
              <></>
            )}
          </Col>

          <Col lg={3}>
            <CarouselProducts
              lgColumnSize={1}
              showPreviewIcon={false}
              isError={errorVendorProducts}
              isLoading={loadingVendorProducts}
              productsData={vendorProducts && vendorProducts?.data}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
