import { Request, Response } from "express";
import userModel from "../db/userModel";
import axios from "axios"

const createUser = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      phone,
      DOB,
      location,
      governmentSchemes,
      landOwnership,
      farmingExperience,
    } = req.body;

    // Check for missing or empty fields
    if (
      Object.entries(req.body).some(([key, value]) => !value)
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Assign a temporary unique username if not provided
    if (!req.body.username) {
      req.body.username = `user_${Date.now()}`;
    }

    // Check if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    // Create a Botpress user
    const botpressResponse = await axios.post(
      `https://chat.botpress.cloud/${process.env.BOTPRESS_WEBHOOK_URL}/users`,
      { id: Date.now().toString() },
      { headers: { accept: "application/json", "content-type": "application/json" } }
    );

    if (botpressResponse.status !== 200) {
      return res.status(400).json({ error: "Failed to register with AI assistant" });
    }

    // Create new user in database
    const newUser = await userModel.create({
      name,
      email,
      phone,
      DOB,
      location,
      governmentSchemes,
      landOwnership,
      farmingExperience,
      xUserKey: botpressResponse.data.key,
    });

    res.status(201).json({ message: "User created successfully!", data: newUser });

  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      if ((error as any).code === 11000) { // Handle MongoDB duplicate key error
        return res.status(400).json({ error: "User with this email already exists" });
      }
      return res.status(500).json({ error: error.message || "Internal server error" });
    }
    res.status(500).json({ error: "Unexpected error occurred" });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    const newEntry = await userModel.findOne({ email });

    if (!newEntry) {
      res.status(400).json({ error: "User with this email does not exist" });
      return;
    }

    await newEntry.save();
    res
      .status(201)
      .json({ message: "Form fetched successfully!", data: newEntry || "" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the form" });
  }
};

export { createUser, getUser };
