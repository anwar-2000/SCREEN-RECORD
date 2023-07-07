import { Request, Response } from 'express';
import {UploadApiResponse} from "cloudinary"
import cloudinary  from '../configs/cloudinary_config';
import streamifier from 'streamifier';

interface UploadRequest extends Request {
  body: {
    videoData: string;
  };
}

export const upload = async (req: UploadRequest, res: Response): Promise<any> => {
  try {
    const { videoData } = req.body;
    const buffer = Buffer.from(videoData, 'base64');
    const result = (await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { resource_type: 'video' },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve(result);
          }
        }
      );
      streamifier.createReadStream(buffer).pipe(uploadStream);
    })) as UploadApiResponse;
    res.json({ url: result.secure_url });
  } catch (error) {
    console.log('UPLOADING VIDEO ERROR :', error);
    res.status(500).json({ error });
  }
};