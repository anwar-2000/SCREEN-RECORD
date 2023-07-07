import bcrypt from 'bcrypt';
import { Request , Response} from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User';

// User login
export const loginUser = async (req : Request, res : Response) => {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({username})
      if (!user){
        return res.status(401).json({ message: ' There is no account with these infos , Please register !' });
      }
      // Retrieve the hashed password from the database based on the provided username
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ user: username }, process.env.JWT_KEY as string);
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Failed to login' });
    }
  };