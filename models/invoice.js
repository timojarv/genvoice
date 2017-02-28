/* jshint node: true, esversion: 6 */
'use strict';

const moment = require("moment");
const pug = require("pug");
const pdf = require("html-pdf");
const mongoose = require("mongoose");

function generateReference(id) {
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