// const dbclient = require("../dbconfig/database");
// const jwt = require("jsonwebtoken");

// const registerUser = async (req, res) => {
//   const { user_name, email, password, role, fullname, phone, address } =
//     req.body;
//   console.log(req.body);
//   const { rows } = await dbclient.query(
//     "INSERT INTO users(user_name, email, password, role, fullname, phone, address) VALUES ($1, $2, $3, $4, $5, $6, $7)",
//     [user_name, email, password, role, fullname, phone, address]
//   );
//   // console.log(rows);
//   res.status(200).send("created");
//   // res.send("done");
// };

// const getUser = async (req, res) => {
//   const user_name = req.params.user_name;
//   var rows;
//   await dbclient.query(
//     "SELECT * FROM users WHERE user_name = $1",
//     [user_name],
//     (err, response) => {
//       console.log(response);
//       rows = response.rows;
//       res.status(200).send(rows);
//     }
//   );
//   //   console.log(rows);
//   //   res.status(200).send(rows);
// };

// const loginUser = async (req, res) => {
//   const { user_name, password } = req.body;
//   console.log(req.body);
//   dbclient.query(
//     "SELECT * FROM users WHERE user_name = $1",
//     [user_name],
//     (err, response) => {
//       if (response.rows[0].password == password) {
//         const token = jwt.sign({ user_name: user_name }, "thisismysecretkey");
//         res.status(200).json({
//           access_token: token,
//         });
//       } else {
//         res.status(400).send("not authorized");
//       }
//     }
//   );
// };

// const updateUser = async (req, res) => {
//   const user_name = req.user.user_name;
//   dbclient.query("SELECT * FROM ");
// };

// module.exports = {
//   registerUser,
//   getUser,
//   loginUser,
// };