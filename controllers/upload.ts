import { Request, Response } from 'express';
import { UploadApiResponse } from 'cloudinary';
import cloudinary from '../configs/cloudinary_config';
import streamifier from 'streamifier';

interface UploadRequest extends Request {
  file: {
    buffer: Buffer;
  };
}

export const upload = async (req: UploadRequest, res: Response): Promise<any> => {
  try {
    const buffer = req.file.buffer;
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
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
    });
    res.json({ url: result.secure_url });
  } catch (error) {
    console.log('UPLOADING VIDEO ERROR:', error);
    res.status(500).json({ error });
  }
};
