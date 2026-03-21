const Blog = require("../models/Blog");
const {
  sendSuccess,
  sendError,
  sendPaginated,
} = require("../utils/apiResponse");

/**
 * Build a blog document update payload from request fields
 */
const buildBlogPayload = (body, file) => {
  const payload = {};

  if (body.heading !== undefined) payload.heading = body.heading;
  if (body.subHeading !== undefined) payload.subHeading = body.subHeading;
  if (body.status !== undefined) payload.status = body.status;

  // EditorJS content can come as stringified JSON or as an object
  if (body.content !== undefined) {
    payload.content =
      typeof body.content === "string"
        ? JSON.parse(body.content)
        : body.content;
  }

  // Handle uploaded image buffer
  if (file) {
    payload.image = {
      data: file.buffer,
      contentType: file.mimetype,
    };
  }

  return payload;
};

/**
 * Strip the image buffer from a blog object when listing multiple blogs
 * (avoids sending large binary data in list responses)
 */
const stripImageBuffer = (blog) => {
  const obj = blog.toObject ? blog.toObject() : { ...blog };
  if (obj.image) {
    obj.image = {
      contentType: obj.image.contentType,
      hasImage: !!obj.image.data,
    };
  }
  return obj;
};

// ─── Controllers ─────────────────────────────────────────────────────────────

/**
 * @desc    Create a new blog post
 * @route   POST /api/blogs
 * @access  Private (Admin)
 */
const createBlog = async (req, res, next) => {
  try {
    const payload = buildBlogPayload(req.body, req.file);

    if (!payload.heading) {
      return sendError(res, "Heading is required", 400);
    }

    const blog = await Blog.create(payload);
    const blogObj = stripImageBuffer(blog);

    return sendSuccess(
      res,
      { blog: blogObj },
      "Blog created successfully",
      201,
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all blogs with pagination and optional filters
 * @route   GET /api/blogs
 * @access  Private (Admin)
 */
const getAllBlogs = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    // Build filter
    const filter = {};
    if (req.query.status) {
      if (!["draft", "published"].includes(req.query.status)) {
        return sendError(res, "Invalid status filter", 400);
      }
      filter.status = req.query.status;
    }
    if (req.query.search) {
      filter.$or = [
        { heading: { $regex: req.query.search, $options: "i" } },
        { subHeading: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .select("-image.data -content") // Exclude heavy fields in list view
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Blog.countDocuments(filter),
    ]);

    return sendPaginated(
      res,
      blogs,
      {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
      "Blogs fetched successfully",
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single blog by ID (includes full content and image)
 * @route   GET /api/blogs/:id
 * @access  Private (Admin)
 */
const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return sendError(res, "Blog not found", 404);
    }

    const blogObj = stripImageBuffer(blog);
    return sendSuccess(res, { blog: blogObj }, "Blog fetched successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get blog image (serve raw buffer as image response)
 * @route   GET /api/blogs/:id/image
 * @access  Public
 */
const getBlogImage = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).select("image");

    if (!blog || !blog.image || !blog.image.data) {
      return sendError(res, "Image not found", 404);
    }

    res.set("Content-Type", blog.image.contentType);
    res.set("Cache-Control", "public, max-age=86400"); // 1 day
    return res.send(blog.image.data);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a blog post
 * @route   PUT /api/blogs/:id
 * @access  Private (Admin)
 */

const updateBlog = async (req, res, next) => {
  try {
    const payload = buildBlogPayload(req.body, req.file);

    if (Object.keys(payload).length === 0) {
      return sendError(res, "No update fields provided", 400);
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: payload },
      { new: true, runValidators: true },
    );

    if (!blog) {
      return sendError(res, "Blog not found", 404);
    }

    const blogObj = stripImageBuffer(blog);
    return sendSuccess(res, { blog: blogObj }, "Blog updated successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a blog post
 * @route   DELETE /api/blogs/:id
 * @access  Private (Admin)
 */
const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return sendError(res, "Blog not found", 404);
    }

    return sendSuccess(res, {}, "Blog deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogImage,
  updateBlog,
  deleteBlog,
};
