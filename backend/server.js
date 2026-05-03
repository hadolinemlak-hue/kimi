require("dotenv").config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET yok!");
}

const express = require("express");
const cors = require("cors");

const sequelize = require("./db");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const customerRoutes = require("./routes/customer");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/crm/customers", customerRoutes);

// HEALTH
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// START
sequelize.authenticate()
  .then(() => sequelize.sync())
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server çalışıyor");
    });
  })
  .catch(console.error);