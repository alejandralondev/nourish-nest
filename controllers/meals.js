const Groceries = require('../models/Groceries');
const Meal = require('../models/Meals'); // Assuming you have a Meal model

module.exports = {
  displayMealCreationPage: async (req, res) => {
    try {
      // Fetch the list of grocery items
      const groceries = await Groceries.find();

      res.render('meals', { groceries });
    } catch (error) {
      res.status(500).send('Error fetching groceries for meal creation');
    }
  },
  createMeal: async (req, res) => {
    try {
      const { selectedGroceries, mealName } = req.body;
  
      // Retrieve the selected grocery items based on their IDs
      const selectedItems = await Groceries.find({ _id: { $in: selectedGroceries } });
  
      // Create a new meal object and save it to your Meals model
      const newMeal = new Meal({
        mealName: mealName,
        items: selectedItems,
        user: req.user._id,
      });
  
      await newMeal.save();
  
      res.redirect('/meals');
    } catch (error) {
      res.status(500).send('Error creating meal');
    }
  },
  
  getMeals: async (req, res) => {
    try {
      // Fetch meals for the currently logged-in user
      const userId = req.user._id;
      const userMeals = await Meal.find({ user: userId }).populate('items');

       // Fetch the list of grocery items
      const groceries = await Groceries.find();
  
      res.render('meals', { meals: userMeals, groceries: groceries, user: req.user });
    } catch (error) {
      res.status(500).send('Error fetching meals');
    }
  },
  



  // createMeal: async (req, res) => {
  //   try {
  //     const { selectedGroceries, mealName } = req.body;
  
  //     // Retrieve the selected grocery items based on their IDs
  //     const selectedItems = await Groceries.find({ _id: { $: selectedGroceries } });
  
  //     // Create a new meal object and save it to your Meals model
  //     const newMeal = new Meal({
  //       mealName: mealName,
  //       items: selectedItems,
  //       user: req.user._id,
  //     });
  
  //     await newMeal.save();
  
  //     // Fetch meals for the currently logged-in user (including the newly created meal)
  //     const userId = req.user._id;
  //     const userMeals = await Meal.find({ user: userId }).populate('items');
  //     const groceries = await Groceries.find(); // Fetch groceries (if needed)
  
  //     res.render('meals', { meals: userMeals, groceries: groceries, user: req.user });
  //   } catch (error) {
  //     res.status(500).send('Error creating meal');
  //   }
  // },
  

  // getMeals: async (req, res) => {
  //   try {
  //     // Fetch meals for the currently logged-in user
  //     const userId = req.user._id;
  //     const userMeals = await Meal.find({ user: userId }).populate('items'); // Assuming 'items' is the field containing selected grocery items
  //     const user = req.user;
  //     const groceries = await Groceries.find(); // Replace with your actual fetching logic


  //     console.log('Groceries:', groceries); // Add this line before res.render
  //     res.render('meals', { meals: userMeals, groceries: groceries, user: user });
  //   } catch (error) {
  //     res.status(500).send('Error fetching meals');
  //   }
  // },




  // deleteMeal: async (req, res) => {
  //   try {
  //     const mealId = req.params.id; // Fetch meal ID from request parameters

  //     // Perform deletion logic here
  //     await Meal.findByIdAndDelete(mealId);

  //     res.status(200).send('Meal deleted successfully');
  //   } catch (error) {
  //     res.status(500).send('Error deleting meal');
  //   }
  // },
  deleteMeal: async (req, res) => {
    try {
      // Delete groceries from db
      await Meal.remove({ _id: req.params.id });
      console.log("Meal deleted");
      res.redirect("/meals");
    } catch (err) {
      res.redirect("/meals");
    }
  },
};




// const Groceries = require('../models/Groceries');

// module.exports = {
//   // Route to render the meals page with user's groceries
//   createMeals: async (req, res) => {
//     try {
//       console.log('Fetching user groceries...');
//       // Fetch the grocery items for the currently logged-in user
//       const userId = req.user._id; // Assuming you have the user information in the request object
//       // Retrieve the user's groceries
//       const userGroceries = await Groceries.find({ userId });
//       // Get the user object
//       const user = req.user;


//       // Render the meals page and pass the user's groceries as data
//       res.render('meals', { groceries: userGroceries, user: user });
//     } catch (error) {
//       res.status(500).send('Error fetching groceries for meals page');
//     }
//   },

//    // Route to render the meals page with user's meals
//    getMeals: async (req, res) => {
//     try {
//       console.log('Fetching user meals...');
//       // Fetch the meals for the currently logged-in user (assuming meals model and logic)
//       // Replace this logic with how you fetch meals from your database
//       const userId = req.user._id;
//       const userMeals = await Meals.find({ userId });

//       // Render the meals page and pass the user's meals as data
//       res.render('meals', { meals: userMeals });
//     } catch (error) {
//       res.status(500).send('Error fetching meals for display');
//     }
//   },

//   deleteMeals: async (req, res) => {
//     try {
//       const mealId = req.params.id; // Fetch meal ID from request parameters

//       // Perform deletion logic here (e.g., using Groceries model)
//       await Groceries.findByIdAndDelete(mealId);

//       res.status(200).send('Meal deleted successfully');
//     } catch (error) {
//       res.status(500).send('Error deleting meal');
//     }
//   }
// };






// const Groceries = require('../models/Groceries');

// // Route to render the meals page with user's groceries
// const createMeals = async (req, res) => {
//   try {
//     // Fetch the grocery items for the currently logged-in user
//     const userId = req.user._id; // Assuming you have the user information in the request object

//     // Retrieve the user's groceries
//     const userGroceries = await Groceries.find({ userId });

//     // Render the meals page and pass the user's groceries as data
//     res.render('meals', { groceries: userGroceries });
//   } catch (error) {
//     res.status(500).send('Error fetching groceries for meals page');
//   }
// };

// const deleteMeals = async (req, res) => {
//   try {
//     const mealId = req.params.id; // Fetch meal ID from request parameters

//     // Perform deletion logic here (e.g., using Groceries model)
//     await Groceries.findByIdAndDelete(mealId);

//     res.status(200).send('Meal deleted successfully');
//   } catch (error) {
//     res.status(500).send('Error deleting meal');
//   }
// };


// module.exports = {
//   createMeals, deleteMeals
// };

