
const express = require('express');
const router = express.Router();
const mealsController = require('../controllers/meals');
const { ensureAuth } = require('../middleware/auth');

// Route to render the meals page with user's meals
router.get('/', ensureAuth, mealsController.getMeals);

// Route to create a new meal
router.post('/createMeal', ensureAuth, mealsController.createMeal);

// Route to delete a meal
router.delete('/deleteMeal/:id', ensureAuth, mealsController.deleteMeal);


module.exports = router;
