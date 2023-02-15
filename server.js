const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')     // JSON Web Token

// Secret key for signing and verifying JSON Web Tokens
const JWT_SECRET = 'wsrakfjhias:dgjsan@@!£!£"!£!"@£"@%"^"$"wsfsdflkwnsbdfgwjakgsnv'

// Connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/AI-BERT',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const app = express()

// Serve static files from the 'static' directory
app.use('/', express.static(path.join(__dirname, 'static')))

// Parse JSON in incoming requests
app.use(bodyParser.json())


// Route for serving the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'login.html'))
})

// Route for handling user login
app.post('/login', (req, res) => {
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
                    // Set the user in the session
                    req.session.user = user
                    // Redirect the user to the homepage
                    res.redirect('/')
                }
            })
        }
    })
})

//route for handling validation of a username
//route for handling validation of a username
app.post('/api/auth/checkUsername', async (req, res) => {
    const {username} = req.query
    try {
        const user = await User.findOne({username});
        if (user){
            res.json({exists: true});
        } else {
            res.json({exists: false});
        }
    } catch (error) {
        res.status(500).json({error: 'Error checking username'});
    }
});


app.post('/api/auth/signup', async (req, res) => {
    const { username, password: plainTextPassword, email } = req.body;
  
    //validating the username
    if (!username || typeof username !== 'string'){
        return res.json({status: 'error', error: 'invalid username'})
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
          password: hashedPassword
        })
        console.log('User created successfully: ', response)
    
        // Respond with a success message if the user was created successfully
        res.json({ status: 'ok'})
      } catch (error) {
        if (error.code === 11000) {
          // Respond with an error if the username is already in use
          return res.json({ status: 'error', error: 'Username already in use' })
        }
        // Respond with a 500 error if there was any other error creating the user
        return res.status(500).send({ error: 'Error creating user. Please try again later.' })
      }
    })


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

//if the code gets to printing this message to the console, that means the database has been connected!