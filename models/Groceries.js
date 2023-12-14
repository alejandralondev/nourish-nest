const mongoose = require("mongoose");

const GroceriesSchema = new mongoose.Schema({
  groceries: {
    type: String,
    require: true,
  },
  dateBought: {
    type: Date,
    require: true,
  },
  expirationDate: {
    type: Date,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  macros: {
    type: String, 
    enum: ['select','proteins', 'carbs', 'fats', 'fiber'], // Define the allowed values
    required: true,
  },
  foodType: {
    type: String,
    enum: ['select','vegetables', 'fruits', 'grains', 'dairy', 'meats', 'other'], // Define the allowed values
    required: true,
  },
  mealType: {
    type: String,
    enum: ['select','breakfast', 'cooking-breakfast', 'dinner', 'cooking-dinner', 'snacks'], // Define the allowed values
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Groceries", GroceriesSchema);
