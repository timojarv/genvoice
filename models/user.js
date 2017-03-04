const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passportLocalMongoose = require("passport-local-mongoose");
const config = require("../config");

const Contact = require("./contact");
const Invoice = require("./invoice");

const BankInfo = new mongoose.Schema({
	fullname: String,
	iban: String,
	bic: String
});

const userSchema = new mongoose.Schema({
	name: String,
	address: String,
	zip: String,
	city: String,
	country: String,
	email: String,
	business_id: String,
	bank: BankInfo,
	contacts: [Contact],
	invoices: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Invoice"
	}]
});

//Plug in passport local
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

//Define token generator
userSchema.methods.token = function token() {
	const timestamp = new Date().getTime();
	return jwt.sign({ sub: this.id, iat: timestamp }, config.secret);
};

module.exports = mongoose.model("user", userSchema);