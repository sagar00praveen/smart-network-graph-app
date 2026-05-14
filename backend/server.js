const express = require("express");
const cors = require("cors");
require("dotenv").config();

const driver = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);

  try {
    await driver.verifyConnectivity();
    console.log("✅ Neo4j Connected");
  } catch (err) {
    console.error("❌ Connection Error:", err);
  }
});