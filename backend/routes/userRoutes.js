import express from "express";
import bcrypt from "bcrypt";
import { authenticateUser } from "../middleware/authMiddleware.js";


export const router = express.Router();

// SIGN-UP endpoint
router.post("/signup", async (req, res) => {
  try {
    // Validation - pick out email and password from req, and see if they both are there. 
    const { email, password } = req.body;

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
    // Cryptates the password with salt (random string) Hash = mix salt with password = unreadable hash
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const user = new User({ email, password: hashedPassword });
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