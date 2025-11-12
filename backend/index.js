import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/dbconfig.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
    res.send({
        message: "working",
        success: true
    })
})



app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`)
})