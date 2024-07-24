import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ApplyAsVendorAlert() {
  const { userInfo } = useSelector((state) => state.auth);

  const [show, setShow] = useState(true);

  return (
    <section>
      {show && (
        <Alert
          onClose={() => setShow(false)}
          dismissible
          variant="warning"
          className="rounded-0 border-0">
          <Alert.Heading>Become a Vendor!</Alert.Heading>
          <p>
            Interested in showcasing your products to a wide audience? Join our
            community of sellers and start your vendor journey today.{" "}
            <Link
              to={
                userInfo
                  ? "/vendor-application"
                  : `/login?redirect=/vendor-application`
              }
              className="text-decoration-none">
              Apply here
            </Link>
            .
          </p>
        </Alert>
      )}
    </section>
  );
}
