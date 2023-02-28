const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // JSON Web Token

// Secret key for signing and verifying JSON Web Tokens
const JWT_SECRET =
  'wsrakfjhias:dgjsan@@!£!£"!£!"@£"@%"^"$"wsfsdflkwnsbdfgwjakgsnv';

app.use(cors());

require("dotenv").config();

///// CONNECTING MONGO DATABASE /////
const mongoURL =
  "mongodb+srv://nfqn37:Faiza2206@cluster0.wj87fz7.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to the database");
  })
  .catch((e) => console.log(e));

require("./user.js");
const user = mongoose.model("UserInfo");

app.use(express.json());

// Route for handling user registration
app.post("/register", async (req, res) => {
  const { username, password: plainTextPassword, email, experiencelvl } = req.body;

  try {
    // Validate the username
    if (!username || typeof username !== 'string'){
      throw new Error('Invalid username. Please enter a valid username.')
    }
  
    // Validate the email
    if(!req.body.email || typeof req.body.email !== 'string'){
      throw new Error('Invalid email. Please enter a valid email address.')
    }
    
    // Validate the password
    if (!plainTextPassword || typeof plainTextPassword !== 'string'){
      throw new Error('Invalid password. Please enter a valid password.')
    }
    
    // Ensure the password is at least 6 characters long
    if (plainTextPassword.length < 5){
      throw new Error('Password too small. Please enter a password that is at least 6 characters long.')
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(plainTextPassword, 10);

    // Check if the username already exists
    const oldUser = await user.findOne({ username });   

    if (oldUser) {
      throw new Error('Username already exists. Please choose a different username.')
    }

    // Create a new user
    const response = await user.create({
      username,
      password: hashedPassword,
      email,
      experiencelvl,
    });

    // Send a success response
    res.send({ status: "ok" });

  } catch (error) {
    // If an error occurred, log it and send a response with an error message
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});


app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const loggedInUser = await user.findOne({ username });

    // If no user is found, send an error response with status code 404.
    if (!loggedInUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the provided password matches the hashed password in the database.
    const isPasswordValid = await bcrypt.compare(password, loggedInUser.password);

    // If the password is incorrect, send an error response with status code 401.
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // If the password is correct, sign a JSON Web Token (JWT) containing the user's username.
    const token = jwt.sign({ username: loggedInUser.username }, JWT_SECRET);

    // Send a success response with status code 200 and the JWT as the response data.
    return res.status(200).json({ status: "ok", data: token });

  } catch (error) {
    // If an error occurs, log the error and send an error response with status code 500.
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;
  const existingUser = await user.findOne({ email });

  if (!existingUser) {
    return res.status(404).json({ error: "User not found" });
  }

  // Generate a password reset token and store it in the database
  const resetToken = crypto.randomBytes(20).toString("hex");
  existingUser.resetPasswordToken = resetToken;
  existingUser.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
  await existingUser.save();

  // Send a password reset email to the user
  const resetLink = `http://localhost:3000/resetPassword?token=${resetToken}`;
  const mailOptions = {
    to: email,
    subject: "Password reset request",
    html: `Hello,<br><br>You recently requested to reset your password. Please click on the following link to reset your password:<br><br><a href="${resetLink}">${resetLink}</a><br><br>If you did not request this change, please contact us immediately.<br><br>Thank you,<br>The Acorn Team`,
  };
  try {
    await transporter.sendMail(mailOptions);
    return res.json({ status: "ok", message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send password reset email" });
  }
});

app.post("/userdata", async (req, res) => {
  const { token } = req.body;
  try {
    const foundUser = jwt.verify(token, JWT_SECRET);
    console.log(foundUser)
    const username = foundUser.username;
    user.findOne({ username: username })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        console.log(error);
        res.send({ error: "error", data: "error" });
      });
  } catch (error) {
    console.log(error);
    res.send({ error: "error", data: "error" });
  }
});
///////////////////////////////////////////////////////////////////////////////////

// 1. Allow parsing on request bodies
app.use(express.json());

// 2. Enable CORS
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

app.options("*", cors(corsOptions));

// 3. Import routes for api
const watsonRoutes = require("./routes/api/watson");

// 4. Direct requests to /api/watson to Watson Routes
app.use("/api/watson", watsonRoutes);

// 5. Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server listening on port succesfully", port);
});
