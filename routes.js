/* jshint node: true, esversion: 6 */
'use strict';

var express = require("express"),
		Invoice = require("./models/invoice");

var router = express.Router();

router.get("/", (req, res) => {
	res.render("index");
});

router.post("/", (req, res) => {
	console.dir(req.body);
	var invoice = new Invoice(req.body.invoice);
	invoice.save().then((filename) => {
		res.json({
			status: 'ok',
			filename: filename
		});
	}, (err) => {
		res.json(err);
	});
});

module.exports = router;