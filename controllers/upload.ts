import { Request, Response } from 'express';
import cloudinary from '../configs/cloudinary_config';

interface VideoFile {
  tempFilePath: string;
}

interface Files {
  video: VideoFile;
}

interface RequestWithFiles extends Request {
  files: Files;
}

export const upload = async (req: RequestWithFiles, res: Response) : Promise<any> => {
  try {
    const file = req.files.video;
    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      resource_type: 'video'
    });
    res.json({ url: result.secure_url });
  } catch (error) {
    console.log('UPLOADING VIDEO ', error);
    res.status(500).json({ error: error.message });
  }
};
