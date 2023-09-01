// require("dotenv").config()


// const { Pool } = require('pg'); // Import the Pool constructor

// const pool = new Pool({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: process.env.DB_Port,
//   database: process.env.DB_DATABASE
// });
/////////////////////////////////////////////////////////
// module.exports = pool;

// require("dotenv").config();

// const { Pool } = require("pg");

// const isProduction = process.env.NODE_ENV === "production";

// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

// const pool = new Pool({
//   connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//   ssl: isProduction
// });

// module.exports = { pool };

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'project',
  password: 'abc123',
  port: 5432, // PostgreSQL default port
});

// async function insertUserData(id,name, email, password) {
//   const query = 'INSERT INTO users (id,name, email, password) VALUES ($1, $2, $3, $4)';
//   const values = [id,name, email, password];

//   try {
//     await pool.query(query, values);
//     console.log('Data inserted successfully');
//   } catch (error) {
//     console.error('Error inserting data:', error);
//   }
// }

async function insertUserData(id, name, email, password) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Start a transaction

    const query = 'INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)';
    const values = [id, name, email, password];

    await client.query(query, values);
    await client.query('COMMIT'); // Commit the transaction

    console.log('Data inserted successfully');
  } catch (error) {
    await client.query('ROLLBACK'); // Rollback the transaction if there's an error
    console.error('Error inserting data:', error);
  } finally {
    client.release(); // Release the client back to the pool
  }
}

async function AuthenticateData(email,password){
  const client=await pool.connect();
  const query='SELECT * FROM users WHERE email = $1 AND password = $2';
  //  console.log(query)

  // client.connect();
  client.query('Select * from users where email=$1 and password=$2',(err,res)=>{
    if(!err){
        console.log(res.rows);
    }
    else{
        console.log(err.message);
    }
    // client.end;
})

  const values=[email,password];
  console.log(values)
  try{
    const { rows } = await client.query(query,values);
    console.log(rows);
    if (rows.length==1)
    {
      return rows[0];
    }
    else{
      return null;
    }
  }catch(error){
    console.error('Error authenticating data:', error);
    throw error;
  }
}


//   console.log(email, password);
//     pool.query(
//       `SELECT * FROM users WHERE email = $1`,
//       [email],
//       (err, results) => {
//         if (err) {
//           throw err;
//         }
//         console.log(res.rows);

//         if (results.rows.length > 0) {
//           const user = results.rows[0];

//           bcrypt.compare(password, user.password, (err, isMatch) => {
//             if (err) {
//               console.log(err);
//             }
//             if (isMatch) {
//               res.redirect("profile_client")
//               return user
//             } else {
//               //password is incorrect
//               return null 
//             }
//           });
//         } else {
//           // No user
//           return done(null, false, {
//             message: "No user with that email address"
//           });
//         }
//       }
//     );

// }


module.exports = { pool , insertUserData, AuthenticateData};





