import sharp from "sharp";
import path from "path";

const createThumbnail = async (req, res, next) => {
  try {
    if (!req.file) {
      next();
      return;
    }

    const filePath = req.file.path;
    const thumbPath = path.join("uploads", req.file.filename + "_thumb.png");

    console.log("Luodaan thumbnail:", thumbPath);

    await sharp(filePath).resize(160, 160).toFormat("png").toFile(thumbPath);

    next();
  } catch (err) {
    console.error("Virhe thumbnailin luonnissa:", err);
    next(err);
  }
};

export { createThumbnail };
