// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************
require('dotenv').config();
// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var db = require("./models");
var handlebarsHelpers = require("handlebars-helpers")();

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing

var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: handlebarsHelpers,
    defaultLayout: 'main'
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());


app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");


// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./controllers/userController")(app);
require("./controllers/requestController")(app);

// Starts the server to begin listening
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT + " || http://localhost:" + PORT);
    });
});