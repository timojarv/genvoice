const router = require("express").Router();
const Invoice = require("../models/invoice");
const User = require("../models/user");
const { requireToken } = require("../services/auth");


//LIST
router.get("/", requireToken, (req, res) => {
    res.send({ invoices: req.user.invoices });
});

//CREATE
router.post("/", requireToken, (req, res) => {
    Invoice.create(req.body)
        .then(addInvoiceToUser(req.user))
        .then(invoice => res.send({ id: invoice._id }));
});
//READ
//UPDATE
//REMOVE

const addInvoiceToUser = user => invoice => {
    user.invoices.push(invoice);
    return user.save()
        .then(() => Promise.resolve(invoice));
};

module.exports = router;