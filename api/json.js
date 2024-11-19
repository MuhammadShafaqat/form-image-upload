

// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const helmet = require("helmet");
// const morgan = require("morgan");
// const multer = require("multer");
// const cors = require("cors");
 
// const router = express.Router();
// const path = require("path");
// const User = require("./models/User");

// dotenv.config();

// mongoose.connect("mongodb://localhost:27017/reactupload");
// app.use("/images", express.static(path.join(__dirname, "public/images")));

// //middleware
// app.use(express.json());
// app.use(cors());
// app.use(helmet());
// app.use(morgan("common"));
// app.use(express.static("public"))

// // storage configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/images'); // Specify the upload directory
//     },
//     filename: (req, file, cb) => {
//         cb(null,  Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

// // File upload route
// app.post('/upload', upload.single('file'), async (req, res) => {
//     if (req.file) {
//       const userImage = new User({image:req.file.filename})
//       await userImage.save();
//         res.status(200).json({userImage,message:'File uploaded successfully!'});
//     } else {
//         res.send('No file uploaded.');
//     }
// });
// //get file
// app.get('/getImage', (req,res)=>{
//      User.find().
//      then(user => res.json(user)).
//      catch(err => res.json(err))
// })


 
// app.listen(8800, () => {
//   console.log("Backend server is running!");
// });
