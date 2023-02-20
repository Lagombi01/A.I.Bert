//importing relevant libraries 
const express = require('express') 
const path = require('path')                //path module for working with file and directory paths
const bodyParser = require('body-parser')   //for parsing request bodies
const mongoose = require('mongoose')        //import the Mongoose library for working with MongoDB
const User = require('./model/user')
const bcrypt = require('bcryptjs')          //importing library for password hashing
const jwt = require('jsonwebtoken')         // JSON Web Token

// Secret key for signing and verifying JSON Web Tokens
const JWT_SECRET = 'wsrakfjhias:dgjsan@@!£!£"!£!"@£"@%"^"$"wsfsdflkwnsbdfgwjakgsnv'

// Connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/AI-BERT',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const app = express()                       //create an Express app instance

// Serve static files from the 'static' directory
app.use('/', express.static(path.join(__dirname, 'static')))

// Parse JSON in incoming requests
app.use(bodyParser.json())

// Route for serving the login page
app.get('/api/auth/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'login.html'))
})

// Route for handling user login
app.post('/api/auth/login', (req, res) => {
    // Extract the username and password from the request body
    const username = req.body.username
    const password = req.body.password

    // Find a user with the given username
    User.findOne({ username }, (err, user) => {
        if (err) {
            // Log the error to the console
            console.error(err)
            // Respond with a 500 error and an error message
            res.status(500).send({ error: 'Error logging in. Please try again later.' })
        } else if (!user) {
            // Respond with a 401 error and an error message if no user was found
            res.status(401).send({ error: 'Incorrect username or password.' })
        } else {
            // Compare the provided password with the user's password
            user.comparePassword(password, (err, isMatch) => {
                if (err) {
                    // Log the error to the console
                    console.error(err)
                    // Respond with a 500 error and an error message
                    res.status(500).send({ error: 'Error logging in. Please try again later.' })
                } else if (!isMatch) {
                    // Respond with a 401 error and an error message if the passwords don't match
                    res.status(401).send({ error: 'Incorrect username or password.' })
                } else {
                    //create a JSON web token
                    const token = jwt.sign({user_id: user._id}, JWT_SECRET)
                    //Send the JSON web token in response
                    res.send({token})
                }
            })
        }
    })
})


//route for handling user signup
app.post('/api/auth/signup', async (req, res) => {
    const { username, password: plainTextPassword, email } = req.body;
  
    //validating the username
    if (!username || typeof username !== 'string'){
        return res.json({status: 'error', error: 'invalid username'})
    }

    if(!req.body.email || typeof req.body.email !== 'string'){
        return res.json({status: 'error', error: 'invalid email'})
    }

    //validate the password
    if (!plainTextPassword || typeof plainTextPassword !== 'string'){
        return res.json({status: 'error', error: 'invalid password'})
    }

    //gatekeeping password length
    if (plainTextPassword.length < 5){
        return res.json({satus: 'error', error: 'Password too small, should be at least 6 characters'})
    }
  
    // Hash the password
    const hashedPassword = bcrypt.hashSync(plainTextPassword, 10);
  
    // Save the new user to the database
    try {
        // Create a new user
        const response = await User.create({
          username, 
          password: hashedPassword,
          email
        })
        console.log('User created successfully: ', response)
    
        // Respond with a success message if the user was created successfully
        res.json({ status: 'User registration succesful!'})
    } catch (error) {

        console.error(error);       //log the error to the console
        if (error.name === 'MongoError' && error.code === 11000) {
          if (error.message.includes('username')) {
            return res.json({ status: 'error', error: 'Username already in use' })
          } else if (error.message.includes('_id')) {
            return res.json({ status: 'error', error: 'An error occurred while creating the user. Please try again later.' })
          }
        }
        return res.status(500).send({ error: 'An error occurred while creating the user. Please try again later.' })
      }
    })

app.get("/api/user", authenticateJWT, (req, res) => {
    // Get the user's ID from the request object (assuming it was added during authentication)
    const userId = req.user.id;
      
    // Get the user data from your database or some other storage
    const userData = getUserDataById(userId);
      
    // Return the user data as a JSON response
    res.json({username: userData.username});
    console.log(result);
});

// Route for changing a user's password
app.post('/api/change-password', async(req, res) => {
    const { token, newpassword: plainTextPassword} = req.body

    // Validate the new password
    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password' })
    }

    if (plainTextPassword.length < 5) {
        return res.json({
            status: 'error',
            error: 'Password too small, should be at least 6 characters'
        })
    }
    
    try {
        // Verify the JSON Web Token to get the user's ID
        const user = jwt.verify(token, JWT_SECRET)
        const _id = user._id

        // Hash the new password
        const password = await bcrypt.hash(plainTextPassword, 10)

        // Update the user's password in the database
        await User.updateOne(
            {_id},
            {
                $set: { password }
            }
        )
        res.json({status: 'ok'})
    } catch (error) {
        // Handle different error cases
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                status: 'error',
                error: 'Invalid token'
            });
        }

        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                status: 'error',
                error: 'Token expired'
            });
        }

        console.error(error)
        return res.status(500).json({
            status: 'error',
            error: 'An internal server error occurred'
        });
    }
})


app.listen(9999, () => {
    console.log('Server up at 9999, connected succesfully')
})

function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  }


// Close the MongoDB connection when the server is stopped
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

