/* jshint node: true, esversion: 6 */
'use strict';

const moment = require("moment");
//const pug = require("pug");
//const pdf = require("html-pdf");
const mongoose = require("mongoose");

/*function generateReference(id) {
	let sum = 0;
	for(let i = 0; i < id.length; i++) {
		sum += id[id.length - 1 - i] * "731"[i % 3];
	}
	return id + ((10 - sum % 10) % 10);
}

module.exports = function(invoice) {

	//Calculate totals
	invoice.total = 0;
	invoice.items.forEach((item) => {
		item.price = Number(item.price);
		item.tax = Number(item.tax) / 100 || 0;
		item.subtotal = (item.price * item.amount) * (1 + item.tax);
		invoice.total += item.subtotal;
		item.unit = item.unit || "-";
	});

	//Set dates
	invoice.date = {};
	invoice.date.created = moment().format("D.M.Y");
	invoice.date.due = moment().add(invoice.term, "days").format("D.M.Y");

	//Generate reference
	var id = ("" + moment().valueOf()).substr(-5);
	invoice.reference = generateReference(id);

	var html = pug.renderFile('./templates/invoice.pug', {invoice: invoice});
	var filename = "invoice_" + invoice.reference + ".pdf";
	var options = {
		format: "A4",
		border: '10mm',
		quality: "80"
	};

	this.save = () => new Promise((resolve, reject) => {
			pdf.create(html, options).toFile("./public/" + filename, (err) => {
				if(err) {
					reject(err);
				} else {
					resolve(filename);
				}
			});
	});

	this.toBuffer = () => new Promise((resolve, reject) => {
			pdf.create(html, options).toBuffer((err, buf) => {
				if(err) {
					reject(err);
				} else {
					resolve(buf);
				}
			});
	});

};
*/

const contactSchema = require("./contact");
const productSchema = require("./product");


const invoiceSchema = new mongoose.Schema({
	title: String,
	reference: Number,
	term: Number,
	dateCreated: Number,
	recipient: contactSchema,
	items: [productSchema]
});


//Virtuals
invoiceSchema.virtual('dateDue').get(function() {
	return moment(this.dateCreated).add(this.term, "days").valueOf();
});

invoiceSchema.virtual('total').get(function() {
	return items.reduce((a, item) => a + item.subtotal, 0);
});

//Hooks
invoiceSchema.pre('save', function(next) {
	this.dateCreated = new Date.now();
	this.reference = generateReference();
});

function generateReference() {
	let sum = 0;
	let id = ("" + Date.now()).substr(-5);
	for(let i = 0; i < id.length; i++) {
		sum += id[id.length - 1 - i] * "731"[i % 3];
	}
	return Number(id + ((10 - sum % 10) % 10));
}

module.exports = mongoose.model("invoice", invoiceSchema);