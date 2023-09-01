// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const authMiddleware = async (req, res, next) => {
//   const cookie = await req.headers["authorization"];
//   // console.log(cookie);
//   //   if (!cookie) return next(customAPIerror(404, "sign in first"));
//   const token = cookie.split(" ")[1];

//   jwt.verify(token, "thisismysecretkey", (err, user) => {
//     req.user = user;
//     // console.log(user);
//   });
//   next();
// };

// module.exports = { authMiddleware };


// module.exports.isAuthorized  = function(req, res, next) {

//   User.findById(req.session.userId).exec(function (error, user) {
//       if (error) {
//           return next(error);
//       } else {      
//           if (user === null) {     
//               var err = new Error('Not authorized! Go back!');
//               err.status = 401;
//               return next(err);
//           } else {
//               return next();
//           }
//       }
//   });
// }