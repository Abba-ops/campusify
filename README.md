# Campus E-Commerce Platform Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
3. [Usage](#usage)
    - [User Registration](#user-registration)
    - [Product Browsing](#product-browsing)
    - [Adding to Cart](#adding-to-cart)
    - [Checkout and Payment](#checkout-and-payment)
    - [Vendor Application](#vendor-application)
4. [User Roles and Permissions](#user-roles-and-permissions)
5. [API Endpoints](#api-endpoints)
    - [Authentication](#authentication)
    - [Products](#products)
    - [Orders](#orders)
    - [Vendors](#vendors)
    - [Categories](#categories)
6. [Deployment](#deployment)
7. [Environment Variables](#environment-variables)
8. [Contributing](#contributing)

## Introduction
The Campus E-Commerce Platform is designed to facilitate buying and selling among students and staff within the university campus. It provides a secure and efficient marketplace where users can register, browse products, add items to their cart, proceed to checkout, and make payments. Vendors can apply to sell their products, and administrators manage the overall platform.

## Getting Started

### Prerequisites
To run the platform locally, ensure you have the following installed:
- Node.js (v14.x or higher)
- MongoDB
- Git

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo/campus-ecommerce-platform.git
    cd campus-ecommerce-platform
    ```

2. Install backend dependencies:
    ```sh
    cd server
    npm install
    ```

3. Install frontend dependencies:
    ```sh
    cd ../client
    npm install
    ```

4. Set up environment variables:
    - Create a `.env` file in the server directory with the following content:
    ```env
    MONGO_URI=your_mongo_database_uri
    PORTAL_ENDPOINT=your_portal_endpoint
    PORTAL_API_KEY=your_portal_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    PORT=8000
    ```

5. Start the backend server:
    ```sh
    cd server
    npm start
    ```

6. Start the frontend development server:
    ```sh
    cd ../client
    npm start
    ```

## Usage

### User Registration
1. Visit the platform's homepage.
2. Click on the "Register" button.
3. Fill in the registration form:
    - **Students**: Enter metric number and password.
    - **Staff**: Enter email and password.
4. Click "Submit" to complete the registration.

### Product Browsing
1. Users can browse products by categories, popular products, best-selling, and featured products.
2. Click on a product to view its details.

### Adding to Cart
1. On the product details page, click "Add to Cart."
2. The product will be added to your cart.

### Checkout and Payment
1. Click on the cart icon in the navbar to view your cart.
2. Review the items in your cart and click "Proceed to Checkout."
3. If not logged in, you will be prompted to log in or register.
4. After logging in, confirm your order details and click "Place Your Order."
5. Complete the payment process.

### Vendor Application
1. Registered users can apply to become vendors.
2. Navigate to the vendor application page.
3. Fill in the application form with your business details.
4. Submit the application for review.
5. Admin will review the application and notify you of the decision.
6. If approved, you will gain access to the vendor dashboard to start listing products.

## User Roles and Permissions
- **Student/Staff**: Can browse products, add to cart, and make purchases.
- **Vendor**: Can list products for sale after approval.
- **Admin**: Can manage users, vendors, and product listings.

## API Endpoints

### Authentication
- **POST /api/users/auth**: Authenticate user
- **POST /api/users**: Register a new user
- **POST /api/users/logout**: Logout user
- **GET /api/users/profile/:userId**: Get user profile
- **PUT /api/users/me/password**: Update user password
- **DELETE /api/users/me**: Delete user account
- **GET /api/users**: Get all users (Admin only)
- **DELETE /api/users/:userId**: Delete a user (Admin only)
- **GET /api/users/:userId**: Get a user by ID (Admin only)
- **GET /api/users/me**: Get current user

### Products
- **GET /api/products**: Fetch all products
- **GET /api/products/:productId**: Fetch a single product by ID
- **POST /api/products/:productId/reviews**: Create a new review for a product
- **DELETE /api/products/:productId/reviews/:reviewId**: Delete a review for a product
- **POST /api/products**: Create a new product (Vendor only)
- **PUT /api/products/:productId**: Update a product by ID (Vendor/Admin)
- **DELETE /api/products/:productId**: Delete a product and its associated image from Cloudinary (Vendor/Admin)
- **GET /api/products/categories**: Get all categories
- **POST /api/products/categories**: Add a new category (Admin only)
- **DELETE /api/products/categories/:categoryId**: Delete a category by ID (Admin only)
- **GET /api/products/categories/:category/:categoryId**: Get products by category
- **GET /api/products/subcategory/:subcategory/:subcategoryId**: Get products by subcategory
- **GET /api/products/search**: Search products
- **POST /api/products/subcategory**: Add a subcategory to a category (Admin only)
- **DELETE /api/products/subcategory/:categoryId/:subcategoryId**: Delete a subcategory from a category (Admin only)
- **GET /api/products/featured**: Fetch featured products
- **GET /api/products/popular**: Fetch popular products
- **GET /api/products/best-sellers**: Fetch best-selling products

### Orders
- **GET /api/orders**: Get all orders (Admin only)
- **POST /api/orders**: Create a new order
- **GET /api/orders/mine**: Get logged-in user orders
- **GET /api/orders/:orderId**: Get order by ID
- **GET /api/orders/vendor**: Get vendor orders (Vendor only)
- **GET /api/orders/vendor/:orderId**: Get a vendor's single order (Vendor only)
- **PUT /api/orders/vendor/:orderId**: Mark order as delivered by vendor (Vendor only)
- **PUT /api/orders/:orderId/items/:itemId**: Mark order item as received

### Vendors
- **GET /api/vendors**: Get all vendors (Admin only)
- **GET /api/vendors/:vendorId**: Get a vendor by ID (Vendor/Admin)
- **GET /api/vendors/products**: Get products of the logged-in vendor (Vendor only)
- **POST /api/vendors**: Apply as a vendor
- **PUT /api/vendors/:vendorId/status/:status**: Update vendor status (Admin only)
- **DELETE /api/vendors/:vendorId**: Delete a vendor and associated products, removing their images from Cloudinary (Admin only)
- **GET /api/vendors/:vendorId/products**: Retrieve products associated with a specific vendor (Admin only)
- **GET /api/vendors/customers**: Retrieve customers associated with a specific vendor (Vendor only)
- **GET /api/vendors/all-customers**: Retrieve customers associated with all vendors (Admin only)
- **GET /api/vendors/notifications**: Retrieve vendor notifications (Vendor only)
- **PUT /api/vendors/notifications/:notificationId/mark-as-read**: Mark a notification as read (Vendor only)
- **DELETE /api/vendors/notifications/:notificationId**: Delete a notification (Vendor only)
- **GET /api/vendors/profile/products/:vendorId**: Get products for a specific vendor (Public)
- **GET /api/vendors/profile/:vendorId**: Get vendor profile by ID (Public)

## Deployment
Currently, the platform is hosted on Render for testing purposes. For production deployment, consider using platforms like Heroku, Netlify, or any other scalable hosting service.

## Environment Variables
The following environment variables are required for the platform to function properly:

```env
MONGO_URI=your_mongo_database_uri
PORTAL_ENDPOINT=your_portal_endpoint
PORTAL_API_KEY=your_portal_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
JWT_SECRET=your_jwt_secret
NODE_ENV=development
PORT=8000

## Contributing
We welcome contributions to improve the platform. To contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Open a pull request.
