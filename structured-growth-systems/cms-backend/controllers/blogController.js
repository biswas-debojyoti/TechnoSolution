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

  if (body.tags !== undefined) {
    try {
      payload.tags = typeof body.tags === "string" ? JSON.parse(body.tags) : body.tags;
    } catch {
      payload.tags = [];
    }
  }

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
        .select("-image.data -content")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Blog.countDocuments(filter),
    ]);

    // ✅ Append imageUrl to each blog using the existing image endpoint
    const blogsWithImageUrl = blogs.map((blog) => ({
      ...blog,
      imageUrl: blog.image?.contentType
        ? `/blogs/${blog._id}/image`
        : null,
    }));

    return sendPaginated(
      res,
      blogsWithImageUrl,
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

const getBlogBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug });
    if (!blog) return sendError(res, "Blog not found", 404);
    // Increment views
    blog.views = (blog.views || 0) + 1;
    await blog.save();
    const blogObj = stripImageBuffer(blog);
    // Image URL
    blogObj.imageUrl = blog.image?.data
      ? `/blogs/${blog._id}/image`
      : null;

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

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return sendError(res, "Blog not found", 404);
    }

    // Apply updates manually to ensure proper handling of nested objects/binary data
    Object.keys(payload).forEach((key) => {
      blog[key] = payload[key];
    });

    await blog.save();

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
  getBlogBySlug,
  getBlogImage,
  updateBlog,
  deleteBlog,
};
