const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const groceriesController = require("../controllers/groceries");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/", ensureAuth, groceriesController.getGroceries);
router.post("/createGroceries", ensureAuth, groceriesController.createGroceries);
router.delete("/deleteGroceries/:id", groceriesController.deleteGroceries);


module.exports = router;
