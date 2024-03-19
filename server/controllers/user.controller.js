const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hashSync(password, salt);

  try {
    // check if user already exist
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this username already exists" });
    }

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });
    newUser.save();

    //  generate Token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.TOKEN_SECRET,
      { expiresIn: "3h" }
    );
    newUser.token = token;
    console.log(newUser, "user created successfully");
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);  
  try {
    if (!(username && password)) {
      console.log("username and password are required");
      return res.status(400).json({ error: "please send all files" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "user not found in database" });
    }

    // matching password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "password does not match" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.TOKEN_SECRET,
      { expiresIn: "3h" }
    );
    user.token = token;
    console.log("user", user);
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res
      .cookie({"token": token, options})
      .status(200)
      .json({ message: "User logged in successfully", user });
  } catch (error) {
    console.log(error, "user login error");
    res.status(500).json({ message: "Internal server error" });
  }
};


const checkUser = async (req, res) => {
  try {
    const { username } = req.params;
    const existingUser = await User.findOne({ username });
    console.log("user already exists", !!existingUser);
    res.json({ exists: !!existingUser });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserDashboard = (req, res) => {
  // Render the user dashboard page
  console.log("hello user");
  res.status(200).json({ page: "user dashboard page" });
};


module.exports = { registerUser, loginUser, checkUser, getUserDashboard };
