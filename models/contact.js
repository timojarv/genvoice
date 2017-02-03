const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: String,
	address: String,
	zip: String,
	city: String,
	country: String,
	email: String,
	business_id: String
});

module.exports = contactSchema;