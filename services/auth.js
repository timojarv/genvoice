const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");
const config = require("../config");

//Make use of LocalStrategy
const loginOptions = { usernameField: "email" };
const userLoginStrategy = new LocalStrategy(loginOptions, User.authenticate());
passport.use(userLoginStrategy);

//Make use of JWT Strategy
const jwtOptions = {
	secretOrKey: config.secret,
	jwtFromRequest: ExtractJwt.fromHeader("authorization")
};
const tokenStrategy = new JwtStrategy(jwtOptions, ({sub}, done) => {
	User.findById(sub)
		.then(done.bind(null, null))
		.catch(done);
});
passport.use(tokenStrategy);

//Generate authentication middleware
const requireLogin = passport.authenticate("local", { session: false });
const requireToken = passport.authenticate("jwt", { session: false });

//Export 'em
module.exports = { requireLogin, requireToken };