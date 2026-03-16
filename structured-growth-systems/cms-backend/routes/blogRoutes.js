const express = require("express");
const router = express.Router();

const {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogImage,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware");
const { handleUploadErrors } = require("../middleware/uploadMiddleware");
const {
  createBlogValidator,
  updateBlogValidator,
  mongoIdValidator,
  paginationValidator,
} = require("../middleware/validationMiddleware");

// @route  GET  /api/blogs
router.get("/", protect, paginationValidator, getAllBlogs);

// @route  POST /api/blogs  (multipart/form-data)
router.post(
  "/",
  protect,
  handleUploadErrors("image"),
  createBlogValidator,
  createBlog
);

// @route  GET /api/blogs/:id/image  — public, serves raw image buffer
router.get("/:id/image", mongoIdValidator, getBlogImage);

// @route  GET /api/blogs/:id
router.get("/:id", protect, mongoIdValidator, getBlogById);

// @route  PUT /api/blogs/:id  (multipart/form-data)
router.put(
  "/:id",
  protect,
  handleUploadErrors("image"),
  updateBlogValidator,
  updateBlog
);

// @route  DELETE /api/blogs/:id
router.delete("/:id", protect, mongoIdValidator, deleteBlog);

module.exports = router;
