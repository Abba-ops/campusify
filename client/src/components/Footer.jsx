import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import Stack from "react-bootstrap/esm/Stack";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="text-bg-dark">
      <div className="container">
        <footer className="py-5">
          <div className="row">
            <div className="col-8 col-md-3 mb-3">
              <h5 className="text-uppercase fw-semibold">Information</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2 fw-light">
                  <span className="raleway">Address:</span>{" "}
                  <span className="text-white-50 raleway">
                    University Drive, Off Idofin Road, Oko-Irese, Kwara State
                  </span>
                </li>
                <li className="nav-item mb-2 fw-light">
                  <span className="raleway">Call Us:</span>{" "}
                  <span className="text-white-50 raleway">0905-392-9899</span>
                </li>
                <li className="nav-item mb-2 fw-light">
                  <span className="raleway">Email Us:</span>{" "}
                  <span className="text-white-50 raleway">info@tau.edu.ng</span>
                </li>
              </ul>
            </div>
            <div className="col-md-2 mb-3">
              <h5 className="text-uppercase fw-semibold">Connect With Us</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <Link className="nav-link p-0 text-white-50 raleway fw-light">
                    Social Media
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link p-0 text-white-50 raleway fw-light">
                    Newsletter
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link p-0 text-white-50 raleway fw-light">
                    Community Forum
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-2 mb-3">
              <h5 className="text-uppercase fw-semibold">Explore</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <Link className="nav-link p-0 text-white-50 raleway fw-light">
                    Featured Products
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link p-0 text-white-50 raleway fw-light">
                    Customer Reviews
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link p-0 text-white-50 raleway fw-light">
                    New Arrivals
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-5 mb-3">
              <Form>
                <h5 className="text-uppercase text-primary fw-semibold">
                  Sign Up for Newsletters
                </h5>
                <p className="raleway">
                  Get e-mail updates about our latest shop and special offers.
                </p>
                <InputGroup className="mb-3">
                  <Form.Control placeholder="Enter your email..." type="text" />
                  <Button
                    variant="primary"
                    className="text-white text-uppercase fw-semibold">
                    Subscribe
                  </Button>
                </InputGroup>
              </Form>
            </div>
          </div>
          <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
            <p className="fw-light raleway text-white-50">
              Made with ❤️ by Jadesola | © {year}{" "}
              <span className="text-primary">ShopSync</span>. All rights
              reserved.
            </p>
            <Stack direction="horizontal" gap={2}>
              <Button className="text-bg-dark" variant="dark">
                <FaFacebookF />
              </Button>
              <Button className="text-bg-dark" variant="dark">
                <FaTwitter />
              </Button>
              <Button className="text-bg-dark" variant="dark">
                <FaInstagram />
              </Button>
              <Button className="text-bg-dark" variant="dark">
                <FaLinkedin />
              </Button>
            </Stack>
          </div>
        </footer>
      </div>
    </div>
  );
}
