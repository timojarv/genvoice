/* jshint node: true, esversion: 6 */
'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");

const indexRoutes = require("./routes");

var app = express();

const compiler = webpack(require("./webpack.config"));
if(process.env.NODE_ENV !== 'production') {
	app.use(webpackMiddleware(compiler));
}

app.set("view engine", "pug");

app.use(express.static("public"));
app.use(bodyParser.json());


app.use('/', indexRoutes);



app.listen(process.env.PORT, process.env.IP, () => {
	console.log("Genvoice server is running!");
});