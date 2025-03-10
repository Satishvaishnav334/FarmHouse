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
    DOB: {
      type: Date,
      validate: {
        validator: function (this: any, val: Date) {
          return this.isFarmer ? !!val : true;
        },
        message: "Date of Birth is required for farmers.",
      },
    },
    location: {
      state: {
        type: String,
        validate: {
          validator: function (this: any, val: string) {
            return this.isFarmer ? val.length > 0 : true;
          },
          message: "state is required for farmers.",
        },
        trim: true,
      },
      district: {
        type: String,
        validate: {
          validator: function (this: any, val: string) {
            return this.isFarmer ? val.length > 0 : true;
          },
          message: "district is required for farmers.",
        },
        trim: true,
      },
    },
    pinCode: {
      type: Number,
      default: null,
      min: 100000,
      max: 999999,
    },
    isFarmer: { type: Boolean, default: false },
    address: {
      type: String,
      validate: {
        validator: function (this: any, val: string) {
          return this.isFarmer ? val.length > 0 : true;
        },
        message: "Address is required for farmers.",
      },
      default: null,
      trim: true,
    },
    governmentSchemes: {
      type: [String],
      validate: {
        validator: function (this: any, val: string[]) {
          return this.isFarmer ? val.length > 0 : true;
        },
        message: "Government schemes are required for farmers.",
      },
    },
    landOwnership: {
      type: Number,
      min: 0,
      validate: {
        validator: function (this: any, val: number) {
          return this.isFarmer ? val > 0 : true;
        },
        message: "Land ownership is required for farmers.",
      },
    },
    farmingExperience: {
      type: Number,
      default: 0,
      min: 0,
      validate: {
        validator: function (this: any, val: number) {
          return this.isFarmer ? val > 0 : true;
        },
        message: "Farming experience is required for farmers.",
      },
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Invalid Indian phone number"],
    },
    xUserKey: {
      type: String,
      default: null,
      unique: true,
      index: true,
      trim: true,
      sparse: true, // Allows null values while maintaining uniqueness
    },
  },
  { timestamps: true, strict: "throw" }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
