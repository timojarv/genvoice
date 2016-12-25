/* jshint node: true, esversion: 6 */
'use strict';

var express = require("express"),
		bodyParser = require("body-parser"),
		Invoice = require("./models/invoice");

var app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("It works!");
});

app.post("/", (req, res) => {
	var invoice = new Invoice(req.body.invoice);
	invoice.toBuffer().then((buf) => {
		res.type('pdf').send(buf);
	}, (err) => {
		res.send(err);
	});
});

app.listen(process.env.PORT, process.env.IP, () => {
	console.log("Genvoice server is running!");
});