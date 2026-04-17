const multer = require("multer");
const { sendError } = require("../utils/apiResponse");

// Allowed MIME types
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
];

// 1 MB limit
const MAX_FILE_SIZE = 1 * 1024 * 1024;

// Use memory storage to keep image as Buffer for MongoDB
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new multer.MulterError(
        "LIMIT_UNEXPECTED_FILE",
        `Unsupported file type: ${file.mimetype}. Allowed: Images, PDF, DOC, DOCX`
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});

/**
 * Middleware to handle multer errors gracefully
 */
const handleUploadErrors = (fieldName) => (req, res, next) => {
  const uploadSingle = upload.single(fieldName);

  uploadSingle(req, res, (err) => {
    if (!err) return next();

    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return sendError(res, `File too large. Maximum allowed size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`, 400);
      }
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return sendError(res, err.field || "Invalid file type.", 400);
      }
      return sendError(res, `Upload error: ${err.message}`, 400);
    }

    return sendError(res, "File upload failed.", 500);
  });
};

/**
 * Middleware to handle multiple field uploads
 */
const handleMultiUploadErrors = (fieldsArray) => (req, res, next) => {
  const uploadFields = upload.fields(fieldsArray);

  uploadFields(req, res, (err) => {
    if (!err) return next();

    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return sendError(res, `File too large. Maximum allowed size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`, 400);
      }
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return sendError(res, err.field ? `Invalid file type for field ${err.field}` : "Invalid file type.", 400);
      }
      return sendError(res, `Upload error: ${err.message}`, 400);
    }

    return sendError(res, "File upload failed.", 500);
  });
};

module.exports = { handleUploadErrors, handleMultiUploadErrors, upload };


