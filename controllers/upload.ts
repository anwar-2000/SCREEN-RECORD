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
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: 'No file received' });
    }
    const result =  cloudinary.v2.uploader.upload_stream(
      { resource_type: 'video' },
      (error: any, result: cloudinary.UploadApiResponse | undefined) => {
        if (error) {
          console.log('UPLOADING VIDEO ERROR:', error);
          res.status(500).json({ error });
        } else {
          console.log(result);
          res.json({ url: result?.secure_url });
        }
      }
    ).end(file?.buffer);

    console.log(result);
    //@ts-ignore
    res.json({ url: result.secure_url });
  } catch (error) {
    console.log('UPLOADING VIDEO ERROR:', error);
    res.status(500).json({ error });
  }
};
