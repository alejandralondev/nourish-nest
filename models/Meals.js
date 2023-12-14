const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
  mealName: {
    type: String,
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Groceries', // Reference to the Groceries model
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

module.exports = mongoose.model('Meal', MealSchema);



// const mongoose = require("mongoose");

// const MealsSchema = new mongoose.Schema({
//   mealName: {
//     type: String,
//     required: true,
//   },
//   ingredients: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Groceries', // Reference to the Groceries model
//   }],
//   // You can include other meal-related fields here
//   // ...

//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
// });

// module.exports = mongoose.model("Meals", MealsSchema);

