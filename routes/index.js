/* jshint node: true, esversion: 6 */
'use strict';

const router = require("express").Router();
const	Invoice = require("../models/invoice");
const { requireLogin, requireToken } = require("../services/auth");

router.get("/", (req, res) => {
	res.json({ version: 1 });
});

router.post("/", requireToken, (req, res) => {
	const invoiceData = req.body; 

	const sender = req.user;
	const recipientId = invoiceData.recipient;
	const recipient = req.user.contacts.reduce((acc, contact) => (contact._id == recipientId) ? contact : acc, undefined);

	invoiceData.sender = sender;
	invoiceData.recipient = recipient;

	//console.log(invoiceData);

	var invoice = new Invoice(invoiceData);
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