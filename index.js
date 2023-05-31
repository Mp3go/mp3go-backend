const express = require("express");
// const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const User = require("./model/user");

const app = express();
const upload = multer({ dest: "uploads/" });
const port = process.env.PORT || 3000;
// Middleware for parsing JSON
app.use(express.json());

// Middleware for parsing form data
app.use(express.urlencoded({ extended: false }));
app.use((req, res) => {
  res.send("hello Almabetter");
});

// POST endpoint for form submission
// app.post('/submit', upload.single('pic'), (req, res) => {
//   const { name, email, gender, phone, password } = req.body;
//   const pic = req.file;

//   // Handle the uploaded file
//   if (!pic) {
//     return res.status(400).json({ error: 'No profile picture uploaded' });
//   }

//   // Create a new user instance
//   const newUser = new User({
//     name,
//     email,
//     gender,
//     phone,
//     pic: pic.path,
//     password,
//   });

//   // Save the user to the database
//   newUser.save((err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Failed to save user' });
//     }

//     // Send a success response
//     res.json({ message: 'Form submitted successfully' });
//   });
// });

// Start the server
app.listen(port, () => {
  console.log("Server started on port 3000");
});
