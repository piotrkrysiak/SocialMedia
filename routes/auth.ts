import express from "express";
import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hiddenPassword = await bcrypt.hash(req.body.password, salt);
    const user: IUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hiddenPassword,
    });
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("User not found");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user!.password
    );
    !validPassword && res.status(400).json("Invalid credentials");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
