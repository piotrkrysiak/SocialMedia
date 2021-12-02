import { Router } from "express";
import Post from "../models/Post";

const router = Router();

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post?.userId === req.body.userId) {
      await Post.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json("The post has been updated");
    } else {
      res.status(403).json("You can only update your own post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post?.userId === req.body.userId) {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json("The post has been deleted");
    } else {
      res.status(403).json("You can only delete your own post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
