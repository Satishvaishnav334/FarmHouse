import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
      index: true,
    },
    DOB: { type: Date, required: true },
    location: {
      state: { type: String, required: true, trim: true },
      district: { type: String, required: true, trim: true },
    },
    governmentSchemes: { type: [String], required: true },
    landOwnership: { type: Number, required: true, min: 0 }, // Acres or hectares
    farmingExperience: { type: Number, required: true, min: 0 }, // Years
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Invalid Indian phone number"],
      index: true,
    },
    xUserKey: {
      type: String,
      default: null,
      unique: true,
      trim: true,
      sparse: true, // Allows null values while maintaining uniqueness
    },
  },
  { timestamps: true, strict: "throw" }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
