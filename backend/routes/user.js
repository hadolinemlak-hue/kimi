const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

router.get("/profile", auth, async (req, res) => {
  const user = await User.findByPk(req.user.id);

  res.json({
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    role: user.role,
  });
});

module.exports = router;