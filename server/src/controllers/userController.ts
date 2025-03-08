import { Request, Response } from "express";
import userModel from "../db/userModel";
import axios from "axios"

const createUser = async (req: Request, res: Response): Promise<void> => {
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

    // Validate required fields
    if (Object.entries(req.body).some(([key, value]) => !value)) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    if (!req.body.username) {
      req.body.username = `user_${Date.now()}`;
    }

    // Check if user exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      res.status(400).json({ error: "User with this email already exists" });
      return;
    }

    // Call Botpress API
    const botpressResponse = await axios.post(
      `https://chat.botpress.cloud/${process.env.BOTPRESS_WEBHOOK_URL}/users`,
      { id: Date.now().toString() },
      { headers: { accept: "application/json", "content-type": "application/json" } }
    );

    if (botpressResponse.status !== 200) {
      res.status(400).json({ error: "Failed to register with AI assistant" });
      return;
    }

    // Save user to database
    const newUser = await userModel.create({
      name,
      email,
      phone,
      DOB,
      location,
      governmentSchemes,
      landOwnership,
      farmingExperience,
      xUserKey: botpressResponse.data.key, // Store Botpress key
    });

    res.status(201).json({ message: "User created successfully!", data: newUser });

  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      if ((error as any).code === 11000) {
        res.status(400).json({ error: "User with this email already exists" });
        return;
      }
      res.status(500).json({ error: error.message || "Internal server error" });
    } else {
      res.status(500).json({ error: "Unexpected error occurred" });
    }
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
