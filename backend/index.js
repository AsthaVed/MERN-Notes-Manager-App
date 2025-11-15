import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/dbconfig.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import User from "./models/userModel.js";
import cookieParser from "cookie-parser";
import Note from "./models/notesModel.js";

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
    if (!email || !password ) {
      return res.status(200).json({
        msg: "Enter all the fields",
        success: false,
      });
    } else {
    
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
      jwt.sign({ userId: user._id, email: user.email }, "GoogleTest", { expiresIn: "5d" }, (error, token) => {
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
      jwt.sign({ userId: user._id, email: user.email }, "GoogleTest", { expiresIn: "5d" }, (error, token) => {
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

// create note post api
app.post("/post/notes", verifyJWTToken, async (req, res) => {
    console.log(req.body);
    try {
    const {title, description} = req.body;
    if(!title || !description){
        return res.status(500).json({
            msg: "Enter all fields",
            success: false
        })
    }else{
         // ⭐ userId coming from token (verifyJWTToken middleware)
    const userId = req.user.userId;
        const newNote = await Note.create({
            title,
            description,
            userId: userId,            // IMPORTANT ✔
            pinned: false,     // default
        })
        return res.status(200).json({
        msg: "Note added successfully",
        success: true,
        note: newNote
    })
    }
}catch(err){
    return res.status(500).json({
      msg: err.message,
      success: false,
    });
} 
})

// create notes get api
app.get("/get/notes", verifyJWTToken, async (req, res) => {
    const userId = req.user.userId;  // get userId from decoded token
    // Find all notes for this user
    try{
    const notes = await Note.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      notes,  // array of notes
    });
}catch(err){
     return res.status(500).json({
      success: false,
      msg: err.message,
    });
}
})

app.delete("/delete/note/:id", verifyJWTToken, async (req, res) => {
    const noteId = req.params.id;
    try{
        // You can optionally check if note belongs to the logged-in user
        const note = await Note.findOne({ _id: noteId });
        if (!note) {
        return res.status(404).json({ success: false, msg: "Note not found" });
        }

        // If you want to restrict deletion to owner:
    if (note.userId.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, msg: "Not authorized" });
    }
    await Note.deleteOne({ _id: noteId });

    return res.status(200).json({ success: true, msg: "Note deleted successfully" });
    }catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
})

app.put("/update/notes/:id", verifyJWTToken, async (req,res) => {
    try{
    const noteId = req.params.id;
     const { title, description } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, userId: req.user.userId }, // security check
      { title, description },
      { new: true } // return updated note
    );
     if (!updatedNote) {
      return res.status(404).json({ msg: "Note not found", success: false });
    }

    res.status(200).json({ msg: "Note updated successfully", success: true, note: updatedNote });
     } catch (err) {
    res.status(500).json({ msg: err.message, success: false });
  }
})

// Toggle pin status
app.put("/notes/pin/:id", verifyJWTToken, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ success: false, msg: "Note not found" });

    note.pinned = !note.pinned; // toggle pin
    await note.save();
    res.status(200).json({ success: true, note, msg: note.pinned ? "Pinned!" : "Unpinned!" });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});


function verifyJWTToken(req, res, next) {
  console.log("verifyJWTToken", req.cookies["token"]);
  const token = req.cookies["token"];
   if (!token) {
    return res.status(401).json({
      msg: "No token provided",
      success: false
    });
  }
  jwt.verify(token, "GoogleTest", (error, decoded) => {
    if (error) {
      return res.send({ msg: "Invalid or expired token", success: false });
    }
    req.user = decoded;  // ⭐ THIS IS IMPORTANT

    console.log("Decoded token:", decoded);
    next();  // Proceed to next step
  });
}

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
