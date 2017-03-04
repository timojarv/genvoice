const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    tax: Number,
    amount: Number,
    unit: String
}, { id: false, toJSON: { getters: true }, toObject: { getters: true } });

productSchema.virtual('subtotal').get(function() {
    return this.price * this.amount * (1 + this.tax / 100); 
});

module.exports = productSchema;