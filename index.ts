import express from 'express';
import fileUpload from "express-fileupload"
const app = express();

app.use(express.json())
app.use(fileUpload());




app.get('/',(req,res)=>{
    res.send('Hello, World!');
})


// Start the server
app.listen(8000, () => {
    console.log('Server is running on port 8000');
  });
