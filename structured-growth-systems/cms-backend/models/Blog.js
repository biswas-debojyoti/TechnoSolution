const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: [true, "Blog heading is required"],
      trim: true,
      maxlength: [200, "Heading cannot exceed 200 characters"],
    },
    subHeading: {
      type: String,
      trim: true,
      maxlength: [500, "Sub-heading cannot exceed 500 characters"],
      default: "",
    },
    image: {
      data: {
        type: Buffer,
      },
      contentType: {
        type: String,
        enum: [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "image/gif",
        ],
      },
    },
    content: {
      // Rich HTML string from the contenteditable editor
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: {
        values: ["draft", "published"],
        message: "Status must be either draft or published",
      },
      default: "draft",
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Auto-generate slug from heading before saving
blogSchema.pre("save", function (next) {
  if (this.isModified("heading")) {
    this.slug = this.heading
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .substring(0, 100);
  }
  next();
});

// Virtual: check if blog has image
blogSchema.virtual("hasImage").get(function () {
  return !!(this.image && this.image.data);
});

// Index for faster queries
blogSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("Blog", blogSchema);
