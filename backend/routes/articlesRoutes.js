const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { getAllArticles, getUserArticles, setArticles, updateArticles, deleteArticle} = require("../controllers/articlesController");

router.get("/all", getAllArticles)
router.get("/user", protect, getUserArticles)
router.post("/add", protect, setArticles)
router.put("/:id", protect, updateArticles)
router.delete("/:id", protect, deleteArticle)


module.exports = router