import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/dbconfig.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import User from "./models/userModel.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


// login api
app.post("/api/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const userData = req.body;
  try {
    if (email && userData) {
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          msg: "User not found",
          success: false,
        });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.json({ msg: "Wrong Password", success: false });
      }

      // Generate JWT
      jwt.sign(userData, "GoogleTest", { expiresIn: "5d" }, (error, token) => {
        console.log(token);
        if (error) {
          return res.status(500).json({
            msg: "Token generation failed",
            success: false,
          });
        }
        return res.status(200).json({
          msg: "Login successful",
          success: true,
          token: token,
        });
      });
    } else {
      return res.status(200).json({
        msg: "Enter all the fields",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
      success: false,
    });
  }
});


// signup api
app.post("/api/signup", async (req, res) => {
  //   console.log(req.body);
  const userData = req.body;
  const { name, email, password, confirm_password } = userData;
  try {
    if (!name || !email || !password || !confirm_password) {
      return res.status(200).json({
        msg: "Enter all the fields",
        success: false,
      });
    } else {
      if (password !== confirm_password) {
        return res.status(400).json({
          msg: "Passwords do not match",
          success: false,
        });
      }

      // Check user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          msg: "User already exists",
          success: false,
        });
      }

      // Create new user
      user = await User.create({
        name,
        email,
        password,
      });

      // Generate token
      jwt.sign(req.body, "GoogleTest", { expiresIn: "5d" }, (error, token) => {
        console.log(token);

        if (error) {
          return res.status(500).json({
            msg: "Token generation failed",
            success: false,
          });
        }

        return res.status(200).json({
          msg: "Signup successful",
          success: true,
          token: token,
        });
      });
    }
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
      success: false,
    });
  }
});

// create note api
app.post("/post/notes", (req, res) => {
    res.status(200).json({
        msg: "run",
        success: true
    })
})

function verifyJWTToken(req, res, next) {
  console.log("verifyJWTToken", req.cookies["token"]);
  const token = req.cookies["token"];
  jwt.verify(token, "google", (error, decoded) => {
    if (error) {
      return res.send({ msg: "invalid token", success: false });
    }
    next();
    console.log(decoded);
  });
}

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
