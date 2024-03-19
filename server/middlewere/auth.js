const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("token: ", token);

  if (!token) {
    console.log("ERROR: token not found");
    return res.status(403).send("Please login first");
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("decoded: ", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).send("Invalid token");
  }
};

const checkAdmin = (req, res, next) => {
  const user = req.user;

  if (user.role !== "admin") {
    console.log("not admin");
    return res.status(401).json({msg: "invalid credentials"});
  } else {
    console.log("admin");
    return next();
  }
};

module.exports = { auth, checkAdmin };
