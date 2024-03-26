import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConfig.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for logging HTTP requests
app.use(morgan("dev"));

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/upload", uploadRoutes);

// Serve static uploads directory
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  // Serve React app for any unhandled routes
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  // Default route for non-production environments
  app.get("/", (req, res) => res.send("API is running"));
}

// Custom error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`.yellow.bold)
);
