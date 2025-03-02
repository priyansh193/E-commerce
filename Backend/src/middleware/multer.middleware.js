import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory (RAM)

export const upload = multer({ storage });
