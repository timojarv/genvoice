/* jshint node: true, esversion: 6 */
'use strict';

const router = require("express").Router();
const	Invoice = require("../models/invoice");
const { requireLogin } = require("../services/auth");

router.get("/", (req, res) => {
	res.json({ version: 1 });
});

router.post("/", (req, res) => {
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

router.post("/login", requireLogin, (req, res) => {
	res.send({
		token: req.user.token()
	});
});

module.exports = router;