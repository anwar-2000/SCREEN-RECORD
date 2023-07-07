import { Request, Response } from 'express';
import cloudinary from '../configs/cloudinary_config';

interface UploadRequest extends Request {
  body: {
    videoPath: string;
  };
}

export const upload = async (req: UploadRequest, res: Response): Promise<any> => {
  try {
    const { videoPath } = req.body;
    const result = await cloudinary.v2.uploader.upload(videoPath, {
      resource_type: 'video',
    });
    res.json({ url: result.secure_url });
  } catch (error) {
    console.log('UPLOADING VIDEO ERROR :', error);
    res.status(500).json({ error });
  }
};
