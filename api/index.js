const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
 
const router = express.Router();
const path = require("path");
const User = require("./models/User");
const Form = require("./models/Form");

dotenv.config();

mongoose.connect("mongodb://localhost:27017/reactupload");
app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use(express.static("public"))

// storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // Specify the upload directory
    },
    filename: (req, file, cb) => {
        cb(null,  Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// File upload route
app.post('/uploadForm', upload.single('file'), async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const photo = req.file ? req.file.filename : null;
  
      if (!photo) {
        return res.status(400).json({ message: "Photo is required" });
      }
  
      const newUser = new Form({ name, email, password, photo });
      await newUser.save();
      res.status(200).json({ newUser, message: 'File uploaded successfully!' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating user", error: error.message });
    }
  });
  
//get file
app.get('/getForm', (req, res) => {
    Form.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ message: "Error fetching users", error: err.message }));
});



 
app.listen(8800, () => {
  console.log("Backend server is running!");
});
