import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { Carousel, Image, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeaderHero() {
  const { userInfo } = useSelector((state) => state.auth);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.header className="px-lg-4 border-bottom">
      <motion.div
        className="row flex-lg-row-reverse align-items-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}>
        <motion.div className="col-lg-6 order-lg-2" variants={imageVariants}>
          <Carousel indicators={false} controls={false}>
            {[1, 2, 3].map((index) => (
              <Carousel.Item key={index}>
                <motion.div
                  className="image-container"
                  variants={imageVariants}>
                  <Image
                    fluid
                    className="product-image"
                    src={`/images/hero_image_${index}.svg`}
                  />
                </motion.div>
              </Carousel.Item>
            ))}
          </Carousel>
        </motion.div>
        <motion.div
          className="col-lg-6 order-lg-1 text-center text-lg-start"
          variants={containerVariants}>
          <motion.h1
            className="display-5 fw-medium lh-sm mb-3 d-none d-lg-block"
            variants={textVariants}>
            Empowering Campus Entrepreneurs
          </motion.h1>
          <motion.p
            className="lead fw-normal d-none d-lg-block text-muted"
            variants={textVariants}>
            Join Campus Market, your university's premier e-commerce platform.
            Connect with fellow students and staff, buy and sell easily, and
            make the most of campus life. Get started now!
          </motion.p>
          <motion.div className="d-none gap-3 d-md-flex justify-content-md-start">
            <motion.div variants={buttonVariants}>
              <Button
                as={ScrollLink}
                to="products"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                size="lg"
                variant="primary"
                className="text-white">
                Shop Now
              </Button>
            </motion.div>
            <motion.div variants={buttonVariants}>
              <Button
                as={Link}
                size="lg"
                variant="dark"
                disabled={userInfo?.data?.isVendor}
                to={
                  userInfo
                    ? "/vendor-application"
                    : `/login?redirect=/vendor-application`
                }>
                Start Selling
              </Button>
            </motion.div>
          </motion.div>

          <motion.div className="d-grid gap-3 d-lg-none justify-content-md-start">
            <motion.div variants={buttonVariants}>
              <Button
                as={ScrollLink}
                to="products"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                size="lg"
                variant="primary"
                className="text-white w-100">
                Shop Now
              </Button>
            </motion.div>
            <motion.div variants={buttonVariants}>
              <Button
                as={Link}
                size="lg"
                variant="dark"
                disabled={userInfo?.data?.isVendor}
                to={
                  userInfo
                    ? "/vendor-application"
                    : `/login?redirect=/vendor-application`
                }
                className="w-100">
                Start Selling
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
