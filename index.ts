import express from 'express';
import fileUpload from "express-fileupload"
import {connectDB} from "./utils/db"
import {upload} from "./controllers/upload"
import { createUser } from './controllers/register';
import {authMiddleware} from "./middlewares/authMiddleware";
import { loginUser } from './controllers/login';
import dotenv from 'dotenv';
import cors, { CorsOptions } from "cors"
dotenv.config();

const app = express();
// Define a whitelist array with allowed origins
const whitelist: string[] = ['http://localhost:3000'];

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (whitelist.indexOf(origin!) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(fileUpload());

connectDB()


app.get('/',(req,res)=>{
    res.send('Hello, World!');
})

app.post('/users/register',createUser)

app.use('/users/login',loginUser)

//@ts-ignore
app.post('/upload', authMiddleware , upload);


// Start the server
app.listen(8000, () => {
    console.log('Server is running on port 8000');
  });
