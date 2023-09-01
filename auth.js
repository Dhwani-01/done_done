const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('./db'); // Import the database connection module
const app=express();
// Define a route for user login
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);

//     if (user && bcrypt.compareSync(password, user.password)) {
//       // Authentication successful
//       //req.session.email= email;
//       res.send('Logged in successfully');
//     } else {
//       // Authentication failed
//       res.status(401).send('Authentication failed');
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal server error');
//   }
// });


// app.post("/login", async (req, res, next) => {
//   const { email } = req.body;
//   const data = await db.query(`SELECT * FROM users WHERE email= ${email}`).then((result) => {
//       return result
//   })
//   if (!data) { // OR if data is an array then use "data.length == 0"
//       return res.status(401).json({
//           success: false,
//           message: "Login authentication failed!"
//       })
//   }
//   else {
//     res.redirect("profile_client")
//   }
// });

module.exports = app;
