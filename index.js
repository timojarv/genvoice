/* jshint node: true, esversion: 6 */
'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");

const indexRoutes = require("./routes");
const userRoutes = require("./routes/user");
const contactRoutes = require("./routes/contact");
const invoiceRoutes = require("./routes/invoice");

//Connect to DB
const DB_URL = process.env.MONGODB_ADDR || "localhost";
mongoose.connect(`${DB_URL}:27017/genvoice`);

//Set mongoose's promises
mongoose.Promise = global.Promise;

var app = express();
app.set("view engine", "pug");

app.use(express.static("public"));
app.use(bodyParser.json({type: "*/*"}));
app.use(passport.initialize());
app.use(cors());


app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/contacts', contactRoutes);
app.use('/invoices', invoiceRoutes);



app.listen(process.env.PORT, process.env.IP, () => {
	console.log("Genvoice server is running on port", process.env.PORT);
});