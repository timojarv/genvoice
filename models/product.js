const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    tax: Number,
    amount: Number,
    unit: String
});

productSchema.virtual('subtotal').get(function() {
    return this.price * this.amount * (1 + this.tax); 
});

module.exports = productSchema;