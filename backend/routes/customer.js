const express = require("express");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const Customer = require("../models/Customer");

const router = express.Router();

// CREATE
router.post("/", auth, async (req, res) => {
  const { full_name, phone, email, note } = req.body;

  if (!full_name) {
    return res.status(400).json({ error: "İsim gerekli" });
  }

  const customer = await Customer.create({
    full_name,
    phone,
    email,
    note,
  });

  res.status(201).json(customer);
});

// LIST
router.get("/", auth, async (req, res) => {
  const customers = await Customer.findAll({
    order: [["createdAt", "DESC"]],
  });

  res.json(customers);
});

// DELETE (SADECE ADMIN)
router.delete("/:id", auth, role("admin"), async (req, res) => {
  const deleted = await Customer.destroy({
    where: { id: req.params.id },
  });

  if (!deleted) {
    return res.status(404).json({ error: "Bulunamadı" });
  }

  res.json({ message: "Silindi" });
});

module.exports = router;
