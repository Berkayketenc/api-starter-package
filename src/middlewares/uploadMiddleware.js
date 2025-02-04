const upload = require("./lib/upload");

const uploadMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Upload Error:", err);
      return res.status(err instanceof multer.MulterError ? 400 : 500).json({
        success: false,
        message: `Error: ${err.message}`,
      });
    }

    if (!req.files || req.files.length === 0) {
      console.error("File not uploaded!");
      return res.status(400).json({
        success: false,
        message: "File not uploaded",
      });
    }

    console.log("Uploaded files:", req.savedImages);
    return res.json({
      success: true,
      message: "Upload successful!",
      files: req.savedImages,
    });
  });
};

module.exports = uploadMiddleware;
