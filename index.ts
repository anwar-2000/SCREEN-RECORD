import express from 'express';
import fileUpload from "express-fileupload"
import {connectDB} from "./utils/db"
import {upload} from "./controllers/upload"



const app = express();



app.use(express.json())
app.use(fileUpload());

connectDB()


app.get('/',(req,res)=>{
    res.send('Hello, World!');
})

app.post('/users/register')


//@ts-ignore
app.post('/upload', upload);


// Start the server
app.listen(8000, () => {
    console.log('Server is running on port 8000');
  });
