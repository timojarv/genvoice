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

//UPDATE
router.put("/:id", requireToken, (req, res) => {
    let set = {};
    Object.keys(req.body).filter(k => k != '_id').forEach(key => {
        set["contacts.$." + key] = req.body[key];
    });
    User.findOneAndUpdate(
        {_id: req.user._id, "contacts._id": req.params.id },
        { $set: set }
    ).then(user => {
        res.send({ id: req.params.id });
    });
});

module.exports = router;