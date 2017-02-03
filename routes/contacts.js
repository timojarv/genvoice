const router = require("express").Router();
const requireToken = require("../services/auth").requireToken;
const User = require("../models/user");

//LIST
router.get("/", requireToken, (req, res) => {
    res.send({ contacts: req.user.contacts });
});

//CREATE
router.post("/", requireToken, (req, res) => {
    User.findById(req.user._id)
        .then(user => {
            user.contacts.push(req.body);
            return user.save();
        })
        .then(user => {
            const contact = user.contacts[user.contacts.length - 1];
            res.send({ id: contact._id });
        });
});

module.exports = router;