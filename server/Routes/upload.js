// server/Routes/upload.js
import express from "express";
import { uploadFile, uploadMiddleware } from "../Controllers/UploadFile.js";

const router = express.Router();

router.post("/", uploadMiddleware, uploadFile);

export default router;
