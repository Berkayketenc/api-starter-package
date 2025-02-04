const multer = require("multer");
const path = require("path");
const fs = require("fs");

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpg",
    "image/gif",
    "image/jpeg",
    "image/png",
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new Error(
        "This Image Type is Not Supported. Please Select a Different Image!"
      ),
      false
    );
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      const rootDir = path.resolve(__dirname, "../../");
      const uploadPath = path.join(rootDir, "/public/uploads");

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
        console.log("Folder created:", uploadPath);
      } else {
        console.log("the folder already exists:", uploadPath);
      }

      cb(null, uploadPath);
    } catch (error) {
      console.error("Error creating folder:", error);
      cb(error, null);
    }
  },
  filename: function (req, file, cb) {
    try {
      const extension = file.mimetype.split("/")[1] || "jpg";

      if (!req.savedImages) req.savedImages = [];

      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      let url = `image_${uniqueSuffix}.${extension}`;

      req.savedImages = [...req.savedImages, url];

      cb(null, url);
    } catch (error) {
      console.error("Error creating file name:", error);
      cb(error, null);
    }
  },
});

const upload = multer({ storage, fileFilter }).array("images");

module.exports = upload;
