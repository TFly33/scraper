// We will require many packages on this project. Start with these. 
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
// THIS MEANS PUBLIC DOESNT NEED TO BE IN THE BACKSLASH ROUTE IN MAIN HANDLEBARS
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");
// This means that handlesbars will use main as it's default layout. 
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// This means that handlebars 
app.set("view engine", "handlebars");

var routes = require("./controllers/openingsController");

app.use(routes);

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/openings", { useNewUrlParser: true, useUnifiedTopology: true });

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
