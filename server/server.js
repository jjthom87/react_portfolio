var express = require("express");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer")

var path = require("path");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.static("./client/public"));

app.use(bodyParser.json({ limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use("/", require('./controller/routes.js'));

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
