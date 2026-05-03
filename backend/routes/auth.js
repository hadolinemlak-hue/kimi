const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");

const User = require("../models/User");

const router = express.Router();

// 🔒 RATE LIMIT
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

router.use(limiter);

// REGISTER
router.post("/register", async (req, res) => {
  try {
    let { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({ error: "Eksik alan" });
    }

    email = email.toLowerCase();

    const existing = await User.findOne({ where: { email } });

    if (existing) {
      return res.status(400).json({ error: "Email kayıtlı" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      full_name,
      email,
      password: hashed,
    });

    res.status(201).json({ id: user.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.toLowerCase();

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "Kullanıcı yok" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Şifre yanlış" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;