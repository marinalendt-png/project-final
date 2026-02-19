import express from "express";
import bcrypt from "bcrypt";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { User } from "../models/User.js";

export const router = express.Router();

// SIGN-UP endpoint
router.post("/signup", async (req, res) => {
  try {
    // Validation - pick out email and password from req, and see if they both are there. 
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }
    //Checks if user exists.
    const existingUser = await User.findOne({ email: email.toLowerCase() })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    // Encrypts the password with salt (random string) Hash = mix salt with password = unreadable hash
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const user = new User({ name, email, password: hashedPassword });
    // The user will be saved in MongoDB, and sends back a successful message (201)
    await user.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      response: {
        email: user.email,
        id: user.id,
        accessToken: user.accessToken,
      }
    });
    //If something goes wrong, catch and send error message. 
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Could not create user",
      response: error,
    });
  }
});

//LOG-IN endpoint

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      })
    }
    res.json({
      success: true,
      message: "Login successful",
      response: {
        email: user.email,
        name: user.name,
        id: user.id,
        accessToken: user.accessToken
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});