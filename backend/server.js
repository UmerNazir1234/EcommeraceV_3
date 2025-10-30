import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectCloudinary from "./Config/cloudinary.js";
import userRouter from "./routes/userRouts.js";
import productRouter from "./routes/productRout.js";
import cartRouter from "./routes/cartRouts.js";
import orderRouter from "./routes/OrderRout.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
connectCloudinary()




// Middleware
app.use(express.json());
app.use(cors());

// apis
app.use(userRouter)
app.use(productRouter)
app.use('/cart',cartRouter)
app.use(orderRouter)

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, API is working 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
