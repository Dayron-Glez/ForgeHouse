import multer from "multer";
import path from "path";
import { env } from "../config/env";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(env.UPLOAD_DIR, "avatars"));
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `avatar-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten imágenes JPEG, PNG o WebP"));
  }
};

export const uploadAvatar = multer({
  storage,
  fileFilter,
  limits: { fileSize: env.MAX_FILE_SIZE },
});
