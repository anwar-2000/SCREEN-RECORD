import UserModel from '../models/User';
import { Request, Response } from 'express';

export const UpdateUser = async (req: Request, res: Response) => {
  try {
    const { username, videoUrl , title } = req.body;

    const updatedUser = await UserModel.findOneAndUpdate(
      { username: username },
      { $push: { videos: { url: videoUrl , title : title } } },
      { new: true }
    );

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
