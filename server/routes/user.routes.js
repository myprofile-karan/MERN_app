const { Router } = require("express");
const { registerUser, loginUser, checkUser, getUserDashboard } = require("../controllers/user.controller.js");
const { auth } = require("../middlewere/auth.js");

const router = Router();

router.route("/signup").post(registerUser)
router.route("/login").post(loginUser)

// user dashboard route
router.route("/user").get(auth, getUserDashboard);

router.route("/check-user/:username").get(checkUser)

module.exports = router;