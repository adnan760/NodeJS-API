const mongoose = require('mongoose')
const { Schema } = mongoose;

const CarSalesSchema = new Schema({
  Brand:  String, // String is shorthand for {type: String}
  Model: String,
  Owner:   String,
  Reg_ID: String,
  Contact_No: Number,
  date: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: false }
});

module.exports = mongoose.model('Car_Sales', CarSalesSchema);