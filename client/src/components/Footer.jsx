import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { footerLinks } from "../constants";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-6 py-5 text-bg-dark">
      <div className="container">
        <div className="row">
          {footerLinks.map((footerLink, index) => (
            <div key={index} className="col-6 col-md-2 mb-3">
              <h5 className="text-uppercase fw-semibold">
                {footerLink.heading}
              </h5>
              <ul className="nav flex-column">
                {footerLink.links.map((link, index) => (
                  <li key={index} className="nav-item mb-2">
                    <Link className="text-decoration-none link-secondary">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-md-5 offset-md-1 mb-3">
            <form>
              <h5 className="text-uppercase fw-semibold">
                Sign Up for Newsletters
              </h5>
              <p>
                Get e-mail updates about our latest shop and special offers.
              </p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your email..."
                />
                <Button variant="primary" className="text-white" type="button">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
          <p className="text-secondary">
            Made with{" "}
            <span role="img" aria-label="heart">
              ❤️
            </span>{" "}
            by Jadesola | © {year}{" "}
            <span className="text-primary">Campusify</span>. All rights
            reserved.
          </p>
          <ul className="list-unstyled d-flex">
            <li className="ms-3">
              <FaFacebookF size={24} />
            </li>
            <li className="ms-3">
              <FaTwitter size={24} />
            </li>
            <li className="ms-3">
              <FaInstagram size={24} />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
