// const express=require('express')
// const app=express()
// const pool=require("./dbConfig")
// const bcrypt=require('bcrypt')

// const users=[]

// app.use(express.static(__dirname));

// app.set('view-engine','ejs')
// app.use(express.urlencoded({extended:false}))

// app.get ('/',(req,res)=> {
//     res.render('index.ejs',{name : 'Dhwani'})
// })

// app.get('/session',(req,res)=>{
//     res.render('session.ejs')
// })


// app.get('/login',(req,res)=>{
//     res.render('login.ejs')
// })

// app.post('/login',(req,res)=>{

// })

// app.get('/signup',(req,res)=>{
//     res.render('signup.ejs')
// })

// app.post('/signup',(req,res)=>{
//     try{
//         const hashedPassword=bcrypt.hash(req.body.password,10)
//         users.push({
//             id: Date.now().toString(),
//             name:req.body.name,
//             email:req.body.email,
//             password:hashedPassword
//         })
//         pool.query(
//             `select * from users 
//             Where email=$1`,
//             [email],
//             (err,results) => {
//                 if(err){
//                     throw err;
//                 }
//                 console.lof(results.row);

//                 if(results.rows.length>0){
//                     errors.push({message:"Email aldready registered"});
//                     res.render("register",{errors});
//                 }
//                 else{
//                     pool.query(
//                         `INSERT into users (name,email,password)
//                         values($1,$2,$3)
//                         returning id,password`,[name,email,hashedPassword],
//                         (err,results)=>{
//                             if(err){
//                                 throw err;
//                             }
//                             console.log(results.rows);
//                             res.redirect("/profile_client");
//                         }
//                     )
//                 }

//             }
           
//         )
//         res.redirect('/profile_client')
//     }catch{
//         res.redirect('/signup')
//     }
//     console.log(users)

// })


// app.get('/psychologist',(req,res)=>{
//     res.render('psychologist.ejs')
// })



// app.get('/About',(req,res)=>{
//     res.render('About.ejs')
// })

// app.get('/Blogs',(req,res)=>{
//     res.render('Blogs.ejs')
// })

// app.get('/profile_client',(req,res)=>{
//     res.render('Profile_client.ejs')
// })

// app.get('/session_set',(req,res)=>{
//     res.render('session_set.ejs')
// })

// app.get('/view_psychologist',(req,res)=>{
//     res.render('view_psychologist.ejs')
// })




const express = require("express");
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");
const client=require("./dbConfig/databasepg.js")
const {insertUserData}=require("./dbConfig.js")
const {AuthenticateData}=require("./dbConfig.js")
//const flash = require("express-flash");
//new line next
const session = require("express-session");
require("dotenv").config();
const app = express();
//new line next
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const initializePassport = require("./passportConfig");

initializePassport(passport);

// Middleware

// Parses details from a form
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// app.use(
//   session({
//     // Key we want to keep secret which will encrypt all of our information
//     secret: process.env.SESSION_SECRET,
//     // Should we resave our session variables if nothing has changes which we dont
//     resave: false,
//     // Save empty value if there is no vaue which we do not want to do
//     saveUninitialized: false
//   })
// );
// Funtion inside passport which initializes passport
app.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
//app.use(passport.session());
//app.use(flash());

app.get("/", (req, res) => {
  res.render("index");
});

app.get('/session',(req,res)=>{
    res.render('session.ejs')
})

app.get('/psychologist',(req,res)=>{
    res.render('psychologist.ejs')
})

app.get('/signup',(req,res)=>{
    res.render('signup.ejs')
})

app.get('/About',(req,res)=>{
    res.render('About.ejs')
})

app.get('/Blogs',(req,res)=>{
    res.render('Blogs.ejs')
})

app.get('/profile_client',(req,res)=>{
    res.render('Profile_client.ejs')
})

app.get('/session_set',(req,res)=>{
    res.render('session_set.ejs')
})

app.get('/view_psychologist',(req,res)=>{
    res.render('view_psychologist.ejs')
})


app.get("/signup", checkAuthenticated, (req, res) => {
  res.render("signup.ejs");
});

app.get("/login", checkAuthenticated, (req, res) => {
  // flash sets a messages variable. passport sets the error message
  //console.log(req.session.flash.error);
  res.render("login.ejs");
});

app.get("/profile_client", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("profile_client", { user: req.user.name });
});

app.get("/logout", (req, res) => {
  req.logout();
  res.render("index", { message: "You have logged out successfully" });
});

// app.post("/signup", async (req, res) => {
//   let { name, email, password } = req.body;

//   let errors = [];

  // console.log({
  //   name,
  //   email,
  //   password,
  
  // });

  // if (!name || !email || !password) {
  //   errors.push({ message: "Please enter all fields" });
  // }

  // if (password.length < 6) {
  //   errors.push({ message: "Password must be a least 6 characters long" });
  // }


  // if (errors.length > 0) {
  //   res.render("signup", { errors, name, email, password });
  // } else {
  //   hashedPassword = await bcrypt.hash(password, 10);
  //   console.log(hashedPassword);
  //   // Validation passed
  //   pool.query(
  //     `SELECT * FROM users
  //       WHERE email = $1`,
  //     [email],
  //     (err, results) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //       console.log(res.rows);

  //       if (res.rows.length > 0) {
  //         return res.render("signup", {
  //           message: "Email already registered"
  //         });
  //       } else {
  //         pool.query(
  //           `INSERT INTO users (name, email, password)
  //               VALUES ($1, $2, $3)
  //               RETURNING id, password`,
  //           [name, email, hashedPassword],
  //           (err, results) => {
  //             if (err) {
  //               console.error('Database query error:', error);
  //             }
  //             console.log(res.rows);
  //             //req.flash("success_msg", "You are now registered. Please log in");
  //             res.redirect("/login");
  //           }
  //         );
  //       }
  //     }
  //   );
  // }
//   var id=Date.now().toString();
//   console.log({
//     id,
//     name,
//     email,
//     password,
  
//   });
//   hashedPassword = await bcrypt.hash(password, 10);
//     console.log(hashedPassword);
// });

app.post('/signup', async (req, res) => {
  let { name, email, password } = req.body;

  let errors = [];

  var id=Date.now().toString();
  console.log({
    id,
    name,
    email,
    password,
  
  });
  // var hashedPassword = await bcrypt.hash(password, 10);
  //   console.log(hashedPassword);

  try {
    // Extract user data from the request body
    const { name, email, password } = req.body;

    // Call the insertUserData function to insert the data into the database
    await insertUserData(id,name, email, password);

    // Send a success response or perform any additional actions
    // res.status(201).json({ message: 'Registration successful' });
    res.redirect("profile_client")
  } catch (error) {
    console.error('Registration error:', error);
    // res.status(500).json({ message: 'Registration failed' });
  }
});

// module.exports = router;

// app.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/profile_client",
//     failureRedirect: "/login",
  
//   })
// );
/////////////
// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await pool.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);

//     if (user && bcrypt.compareSync(password, user.password)) {
//       // Authentication successful
//       req.session.user = user;
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
// const authRoutes = require('./auth'); 

// app.use('/', authRoutes);



function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/profile_client");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}



// router.post('/signup', async (req, res) => {
//   try {
//     // Extract user data from the request body
//     const { name, email, password } = req.body;

//     // Call the insertUserData function to insert the data into the database
//     await insertUserData(name, email, password);

//     // Send a success response or perform any additional actions
//     res.status(201).json({ message: 'Registration successful' });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ message: 'Registration failed' });
//   }
// });

// module.exports = router;

// app.post('/login', (req,res)=>{
//   let{email,password}=req.body;
//   try {
//     const {email,password}=req.body;

//     const user = await AuthenticateData(email, password);

//     res.redirect("profile_client")
//   }
//   catch (error) {
//     console.error('Authentication failed:', error);
//     // res.status(500).json({ message: 'Registration failed' });
//   }
// });

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AuthenticateData(email, password); // Now it's an async function
    if (user) {
      res.redirect("profile_client")
      //res.json({ message: 'Authentication successful', user });
    } else {
      res.status(401).json({ message: 'Authentication failed' });

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
