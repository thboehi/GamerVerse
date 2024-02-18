const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUser, getAllUsers, getUserById } = require("../controllers/usersController")
const { protect } = require("../middleware/authMiddleware")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/me", protect, getUser)
router.get('/', protect, getAllUsers)
router.get('/:id', getUserById)

module.exports = router