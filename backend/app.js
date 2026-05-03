require("dotenv").config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET tanımlı değil!");
}

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sequelize = require("./db");
const User = require("./models/User");
const Customer = require("./models/Customer");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

// ---------------- AUTH MIDDLEWARE
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token yok" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Geçersiz token" });
  }
};

// ---------------- HEALTH
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// ---------------- REGISTER
app.post("/auth/register", async (req, res) => {
  try {
    let { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({ error: "Eksik alan var" });
    }

    email = email.toLowerCase();

    const existing = await User.findOne({ where: { email } });

    if (existing) {
      return res.status(400).json({ error: "Email zaten kayıtlı" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      full_name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- LOGIN
app.post("/auth/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.toLowerCase();

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "Kullanıcı yok" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Şifre yanlış" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- PROFILE
app.get("/user/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "Kullanıcı yok" });
    }

    res.json({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- CREATE CUSTOMER
app.post("/crm/customers", authMiddleware, async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- LIST CUSTOMERS
app.get("/crm/customers", authMiddleware, async (req, res) => {
  try {
    const customers = await Customer.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- DELETE CUSTOMER
app.delete("/crm/customers/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Customer.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({ error: "Kayıt bulunamadı" });
    }

    res.json({ message: "Silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- START SERVER
sequelize
  .authenticate()
  .then(() => {
    console.log("DB bağlı");
    return sequelize.sync();
  })
  .then(() => {
    console.log("Tablolar hazır");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log("Server çalışıyor:", PORT);
    });
  })
  .catch((err) => {
    console.log("DB hata:", err);
  });