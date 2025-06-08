// Controllers/UploadFile.js
import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";

dotenv.config();

// cấu hình cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Uploadrouter = express.Router();

// cấu hình multer dùng RAM
const upload = multer({ storage: multer.memoryStorage() });

Uploadrouter.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "Please upload a file" });

    // xử lý stream upload lên Cloudinary
    const streamUpload = (buffer) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "netflix_clone" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });

    const result = await streamUpload(file.buffer);
    res.status(200).json({ url: result.secure_url }); // trả về link ảnh
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default Uploadrouter;
