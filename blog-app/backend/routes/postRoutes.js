const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  createPost,
  getUserPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const router = express.Router();

// Routes for blog posts
router.post("/", protect, createPost);
router.get("/", protect, getUserPosts);
router.get("/:id", protect, getPostById);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

module.exports = router;
