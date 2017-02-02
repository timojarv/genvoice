const router = require("express").Router();
const { requireToken } = require("../services/auth");
const User = require("../models/user");

// CREATE
router.post("/new", (req, res) => {
	const { email, password } = req.body;
	User.register(new User({ email }), password, (err, user) => {
		if(err) {
			res.send({ error: "Email already in use" });
		} else {
			res.send({ token: user.token() });
		}
	});
});

// READ
router.get("/", requireToken, (req, res) => {
	const user = req.user;
	res.send({ user });
});

// UPDATE
router.put("/", requireToken, (req, res) => {
	const id = req.user._id;
	User.findByIdAndUpdate(id, req.body).exec()
		.then(user => res.send({ id }))
		.catch(error => res.status(500).send({ error }));
});

module.exports = router;