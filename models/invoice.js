/* jshint node: true, esversion: 6 */
'use strict';

const moment = require("moment");
const mongoose = require("mongoose");
const pug = require("pug");
const pdf = require("html-pdf");

const productSchema = require("./product");
const User = require("./user");



const invoiceSchema = new mongoose.Schema({
	title: String,
	reference: Number,
	term: Number,
	dateCreated: Number,
	recipient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "contact"
	},
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	items: [productSchema]
}, { id: false, toJSON: { getters: true }, toObject: { getters: true } });


//Virtuals
invoiceSchema.virtual('dateDue').get(function() {
	return moment(this.dateCreated).add(this.term, "days").valueOf();
});

invoiceSchema.virtual('total').get(function() {
	return this.items.reduce((a, item) => a + item.subtotal, 0);
});

//Hooks
invoiceSchema.pre('save', function(next) {
	this.dateCreated = Date.now();
	this.reference = generateReference();
	return next();
});

//Methods
invoiceSchema.methods.createPDF = createPDF;

module.exports = mongoose.model("invoice", invoiceSchema);





// HELPERS

function generateReference() {
	let sum = 0;
	let id = ("" + Date.now()).substr(-5);
	for(let i = 0; i < id.length; i++) {
		sum += id[id.length - 1 - i] * "731"[i % 3];
	}
	return Number(id + ((10 - sum % 10) % 10));
}

function renderHTML(invoice) {
	//Set dates
	invoice.date = {
		created: moment(invoice.dateCreated).format("D.M.Y"),
		due: moment(invoice.dateDue).format("D.M.Y")
	};

	console.log(invoice)

	return pug.renderFile('./templates/invoice.pug', {invoice});
}

function createPDF() {
	return new Promise((resolve, reject) => {

		const pdfOptions = {
			format: "A4",
			border: '10mm',
			quality: "80"
		};
	
		const invoice = this.toObject();
		invoice.recipient = invoice.sender.contacts.reduce(
			(a, c) => c._id == invoice.recipient ? c : a
		, {});

		const html = renderHTML(invoice);

		pdf.create(html, pdfOptions).toBuffer((error, buffer) => {
			if(error) {
				reject(error);
			} else {
				resolve(buffer);
			}
		});
	});
}