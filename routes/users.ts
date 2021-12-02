import { Router } from "express";
import { genSaltSync, hashSync } from "bcrypt";
import User from "../models/User";

const router = Router();

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = genSaltSync(10);
        const hash = hashSync(req.body.password, salt);
        req.body.password = hash;
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    try {
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been delete successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, createdAt, __v, ...userData } = user!._doc;
    res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user!.followers!.includes(req.body.userId)) {
        await user!.updateOne({ $push: { followers: req.body.userId } });
        await currentUser!.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("User has been followed successfully");
      } else {
        res.status(403).json("You are already following this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't follow yourself");
  }
});

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user!.followers!.includes(req.body.userId)) {
        await user!.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser!.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("User has been unfollowed successfully");
      } else {
        res.status(403).json("You don't following this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't unfollow yourself");
  }
});

export default router;
