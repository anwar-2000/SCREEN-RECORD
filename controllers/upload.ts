import { Request, Response } from 'express';
import cloudinary from 'cloudinary';
import multer from 'multer';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer storage configuration
const storage = multer.memoryStorage();
const uploadFile = multer({ storage });

export const upload = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log("BODY REQ",req.body)
    const file = req.body;
    if (!file) {
      res.status(400).json({ error: 'No file received' });
      return;
    }

    const result = await cloudinary.v2.uploader.upload(file.buffer.toString('base64'), {
      resource_type: 'video',
    });

    console.log(result);
    res.json({ url: result.secure_url });
  } catch (error) {
    console.log('UPLOADING VIDEO ERROR:', error);
    res.status(500).json({ error });
  }
};
