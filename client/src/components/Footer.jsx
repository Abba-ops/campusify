import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { footerLinks } from "../constants";
import { useGetCategoriesQuery } from "../features/productsApiSlice";

export default function Footer() {
  const year = new Date().getFullYear();

  const {
    data: categories,
    isLoading: loadingCategories,
    isError,
  } = useGetCategoriesQuery();

  const categoriesLinks =
    !loadingCategories &&
    !isError &&
    categories?.data?.map((category) => {
      return {
        text: category?.name,
        url: `/category/${category?.name}/${category?._id}`,
      };
    });

  if (!loadingCategories && !isError) {
    footerLinks[1] = {
      heading: footerLinks[1]?.heading,
      links: categoriesLinks?.slice(0, 4),
    };
  }

  const location = useLocation();

  const handleSubscribeClick = () => {
    alert("Newsletter functionality coming soon!");
  };

  return (
    <footer
      className={`py-5 text-bg-dark ${
        location.pathname !== "/" ? "mt-6" : ""
      }`}>
      <div className="container">
        <div className="row">
          {footerLinks.map((footerLink, index) => (
            <div key={index} className="col-6 col-md-2 mb-3">
              <h5 className="fw-semibold">{footerLink?.heading}</h5>
              <ul className="nav flex-column">
                {footerLink?.links?.map((link, index) => (
                  <li key={index} className="nav-item mb-2">
                    <Link
                      to={link?.url}
                      target="_blank"
                      className="text-decoration-none link-light">
                      {link?.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-md-5 offset-md-1 mb-3">
            <form>
              <h5 className="fw-semibold">Sign Up for Newsletters</h5>
              <p>
                Get e-mail updates about our latest shop and special offers.
              </p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your email..."
                />
                <Button
                  variant="primary"
                  className="text-white"
                  type="button"
                  onClick={handleSubscribeClick}>
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
          <p className="fw-semibold">
            Made with{" "}
            <span role="img" aria-label="heart">
              ❤️
            </span>{" "}
            by Jadesola Kajeyale | © {year}{" "}
            <span className="text-primary">Campusify</span>. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
