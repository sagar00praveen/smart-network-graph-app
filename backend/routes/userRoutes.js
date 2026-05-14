const express = require("express");
const router = express.Router();

const {
  registerUser,
  getRecommendations,
  searchBySkill
} = require("../controllers/userController");

router.post("/register", registerUser);
router.get("/recommend/:name", getRecommendations);
router.get("/search/:skill", searchBySkill);

module.exports = router;