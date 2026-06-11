import express from "express";
import cors from "cors";
import "dotenv/config";
import connectMongoDB from "./config/mongodb.js";

//app config
const app = express();
const PORT = process.env.PORT || 5000;
connectMongoDB();

//middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.urlencoded({ extended: true }));

//routes

//app start server
app.listen(PORT, () => {
    console.log(`Server is running on port number ${PORT}`);
})