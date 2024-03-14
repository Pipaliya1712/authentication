const express = require('express')
const {registerPost,registerGet,loginGet,loginPost, logoutGet, home,isAuthenticated} = require('./UserController')
const router = express.Router();

router.route("/register").post(registerPost).get(registerGet);
router.route("/login").post(loginPost).get(loginGet);
router.route("/logout").get(logoutGet);
router.route("/").get(isAuthenticated , home);



module.exports = router;
