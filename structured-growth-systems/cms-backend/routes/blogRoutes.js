const express = require("express");
const router = express.Router();

const {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  getBlogImage,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { protect, requireModuleAccess } = require("../middleware/authMiddleware");
const { handleUploadErrors } = require("../middleware/uploadMiddleware");
const {
  createBlogValidator,
  updateBlogValidator,
  mongoIdValidator,
  paginationValidator,
} = require("../middleware/validationMiddleware");

// @route  GET  /api/blogs
router.get("/", paginationValidator, getAllBlogs);

// @route  POST /api/blogs  (multipart/form-data)
router.post(
  "/",
  protect,
  requireModuleAccess("blogs", "write"),
  handleUploadErrors("image"),
  createBlogValidator,
  createBlog,
);

// @route  GET /api/blogs/:id/image  — public, serves raw image buffer
router.get("/:id/image",  getBlogImage);

// @route  GET /api/blogs/blog-by-slug
router.get("/:slug", getBlogBySlug);   // 👈 ADD THIS

// @route  PUT /api/blogs/:id  (multipart/form-data)
router.put(
  "/:id",
  protect,
  requireModuleAccess("blogs", "write"),
  handleUploadErrors("image"),
  updateBlogValidator,
  updateBlog,
);

// @route  DELETE /api/blogs/:id
router.delete("/:id", protect, requireModuleAccess("blogs", "write"), mongoIdValidator, deleteBlog);

module.exports = router;
