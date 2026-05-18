import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// SIMPLE LOGIN (no DB for now)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@test.com" && password === "1234") {
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

export default router;