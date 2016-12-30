/* jshint node: true, esversion: 6 */
'use strict';

var express = require("express"),
		bodyParser = require("body-parser"),
		routes = require("./routes");

var app = express();

app.set("view engine", "pug");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(routes);



app.listen(process.env.PORT, process.env.IP, () => {
	console.log("Genvoice server is running!");
});