import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],    //Lekin agar koi user Postman se request bhejde: To frontend validation skip ho jayegi
// aur backend me name missing hoga → error hona chahiye
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

// Hash password before saving 
// pre("save") - Save hone se pehle password automatically hash hota hai
// bcrypt.hash() - Password ko DB me encrypted store karta hai
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare entered password with hashed one 
// matchPassword() - Login time input password ko hashed password se compare karta hai
// bcrypt.compare() - Entered password correct hai ya nahi check karta hai
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
