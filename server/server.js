require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//Middleware for uploading files
// When you upload a file, the file will be accessible from req.files.
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const app = express();
/* express.json()  parses incoming JSON requests and puts the parsed data in req.body.
 Without `express.json()`, `req.body` is undefined.*/
app.use(express.json());
app.use(cookieParser());
/* The Same Origin Policy is an important security measure that basically says
 “Only requests from the same origin (the same IP address or URL) should be allowed to access this API”.
 So we need to enable Cors */
app.use(cors());
/* Use temp files instead of memory for managing the upload process. (from express-fileupload library)
  If set to false: we will upload files to RAM . Setting this option to True turns on using temporary files instead of utilising RAM.
 This avoids memory overflow issues when uploading large files or in case of uploading lots of files at same time. */
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//Routes
app.use('/user', require('./routes/userRouter.js'));
app.use('/api', require('./routes/categoryRouter.js'));
app.use('/api', require('./routes/upload'));
app.use('/api', require('./routes/productRouter'));

app.get('/', (req, res) => {
  res.json({ msg: 'Hello Server' });
});

// Connect to MongoDB
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, (err) => {
  if (err) throw err;
  console.log('Connected to MongoDB');
});

// Listen Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
