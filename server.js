import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import billRoutes from "./routes/billRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());

// Debug middleware - log all requests
app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.url}`);
    console.log(`   Content-Type: ${req.headers['content-type']}`);
    next();
});

app.get("/" , (req , res) => res.send("OTP api running"));

// Bill routes BEFORE bodyParser (uses multer for multipart/form-data)
app.use("/api/bills", billRoutes);

// JSON body parser for other routes
app.use(bodyParser.json());

// API Routes
app.use("/api/auth", authRoutes);

app.listen(PORT , () =>{
    console.log(`Server running at http://localhost:${PORT}`);
    
});