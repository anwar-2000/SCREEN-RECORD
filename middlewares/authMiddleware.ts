import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface userPayload extends  JwtPayload {
    user : string
}
interface userRequest extends Request {
    user : string
}
export const authMiddleware = (req : userRequest, res :Response, next:NextFunction) => {
  const token = req.header('Authorization');
  console.log("BODY IN AUTH MIDDLE",req.body)
  //console.log("token:",token)
  if (!token) {
    return res.status(401).json({ message: 'Missing token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as string) as userPayload;
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token, authorization denied' });
  }
};

