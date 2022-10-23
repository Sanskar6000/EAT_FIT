require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//Routes
app.use('/user', require('./routes/userRouter.js'));

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
