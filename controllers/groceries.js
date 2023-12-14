const Groceries = require('../models/Groceries')

// Use only this code for fetching and rendering groceries:
module.exports = {
  // Show the groceries on the page
  getGroceries: async (req, res) => {
    try {
      const groceriesItems = await Groceries.find();
      const user = req.user;

      // Compute counts for macros and food types
      const categoryCounts = {};
      const foodTypeCounts = {};
      const mealTypeCounts = {};

      groceriesItems.forEach(grocery => {
        // Counting macros
        if (categoryCounts[grocery.macros]) {
          categoryCounts[grocery.macros]++;
        } else {
          categoryCounts[grocery.macros] = 1;
        }

        // Counting food types
        if (foodTypeCounts[grocery.foodType]) {
          foodTypeCounts[grocery.foodType]++;
        } else {
          foodTypeCounts[grocery.foodType] = 1;
        }

        // Counting meal types
        if (mealTypeCounts[grocery.mealType]) {
          mealTypeCounts[grocery.mealType]++;
        } else {
          mealTypeCounts[grocery.mealType] = 1;
        }
      });

       // Fetch expiring groceries (items expiring within the next 7 days)
       const expiringGroceries = await Groceries.find({
        expirationDate: { $lte: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000) }, 
      })
        .sort({ expirationDate: 1 }) // Sort by expirationDate in ascending order
        .exec();

      res.render('groceries.ejs', { 
        groceries: groceriesItems, 
        user: user,
        categoryCounts: categoryCounts,
        foodTypeCounts: foodTypeCounts,
        mealTypeCounts: mealTypeCounts,
        expiringItems: expiringGroceries,
      }); 
    } catch(err) {
      console.log(err);
    }
  },
  // Create grocery items
  createGroceries: async (req, res) => {
    try {
      const userId = req.user._id;

      await Groceries.create({
        groceries: req.body.groceriesItem, 
        dateBought: req.body.dateBought, 
        expirationDate: req.body.expirationDate, 
        // msg: req.body.msg, 
        price: req.body.price,
        macros: req.body.macros, // Store Macro Category
        foodType: req.body.foodType,
        mealType: req.body.mealType,
        user: userId,
      });
      
      console.log('Groceries has been added');
      res.redirect('/groceries');
    } catch(err) {
      console.log(err);
    }
  },
  deleteGroceries: async (req, res) => {
    try {
      // Delete groceries from db
      await Groceries.remove({ _id: req.params.id });
      console.log("Deleted Grocery");
      res.redirect("/groceries");
    } catch (err) {
      res.redirect("/groceries");
    }
  },
};
