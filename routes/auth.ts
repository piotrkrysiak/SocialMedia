import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hi it is auth route");
});

export default router;

