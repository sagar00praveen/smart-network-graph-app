const express = require("express");
const router = express.Router();

const {
  registerUser,
  getRecommendations,
  searchBySkill,
  getGraph   // 👈 add this
} = require("../controllers/userController");

// ✅ Register user
router.post("/register", registerUser);

// ✅ Get recommendations
router.get("/recommend/:name", getRecommendations);

// ✅ Search by skill
router.get("/search/:skill", searchBySkill);

// ✅ Graph data (for visualization)
router.get("/graph", getGraph);  

module.exports = router;