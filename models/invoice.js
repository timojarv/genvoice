/* jshint node: true, esversion: 6 */
'use strict';

var moment = require("moment"),
		pug = require("pug"),
		pdf = require("html-pdf"),
		moment = require("moment"),
		helpers = require("../helpers");

const mongoose = require("mongoose");

module.exports = function(invoice) {

	//Calculate totals
	invoice.total = 0;
	invoice.items.forEach((item) => {
		item.price = Number(item.price);
		item.tax = Number(item.tax) || 0;
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
	invoice.reference = helpers.generateReference(id);

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