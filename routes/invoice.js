const router = require("express").Router();
const Invoice = require("../models/invoice");
const User = require("../models/user");
const { requireToken } = require("../services/auth");


//LIST
router.get("/", requireToken, (req, res) => {
    User.findById(req.user._id).select('invoices').populate('invoices')
        .then(user => res.send({ invoices: user.invoices }));
});

//CREATE
router.post("/", requireToken, (req, res) => {
    const invoice = Object.assign({}, req.body);
    invoice.sender = req.user;
    Invoice.create(invoice)
        .then(addInvoiceToUser(req.user))
        .then(invoice => res.send({ id: invoice._id }));
});

//READ (Create PDF)
router.get("/:id", (req, res) => {
    const id = req.params.id;
    //if(req.user.invoices.indexOf(id) < 0) res.status(403).send({ error: "insufficient permissions" });
    Invoice.findById(id).populate('sender')
        .then(invoice => invoice.createPDF())
        .then(buffer => res.set('Content-Type', 'application/pdf').send(buffer))
        .catch(error => res.status(500).send({ error }));
});

//UPDATE
//REMOVE

const addInvoiceToUser = user => invoice => {
    user.invoices.push(invoice);
    return user.save()
        .then(() => Promise.resolve(invoice));
};

module.exports = router;