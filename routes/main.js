// a lot of different requests coming in
// want to pass off requests to controllers
// want to independently hear the requests on this page
// routes that request to the right controller 

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const aboutController = require("../controllers/about");
const calendarController = require("../controllers/calendar");
const blogController = require("../controllers/blog");

const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/home", homeController.getIndex);
router.get("/about", aboutController.getIndex);
router.get("/calendar", calendarController.getIndex);
router.get("/blog", blogController.getIndex);

router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

// the routes above are being exported
// exports router - stuff is being spit out
module.exports = router;
