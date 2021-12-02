import { Router } from "express";
import { genSalt, hash, compare } from "bcrypt";
import User, { IUser } from "../models/User";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const salt = await genSalt(10);
    const hiddenPassword = await hash(req.body.password, salt);
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
    const validPassword = await compare(req.body.password, user!.password);
    !validPassword && res.status(400).json("Invalid credentials");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
