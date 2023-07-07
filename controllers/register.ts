import { Request, Response } from 'express';
import User from "../models/User"
import bcrypt from 'bcrypt';
// User registration
export const createUser =  async (req : Request, res : Response) => {
  try {
    const { username, password , email} = req.body;
   
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = {
      "username" : username ,
      "email" : email,
      "password" : hashedPassword
    }
    console.log(user)
    const createdUser = await User.create(user);
    if(createdUser){
      res.json({createdUser});
    }
  } catch (error) {
    res.status(500).json({error});
  }
};


