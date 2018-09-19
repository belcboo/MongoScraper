// DEPENDENCIES

require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var cheerio = require("cheerio");
var axios = require("axios");


//DEFINING PORT
var PORT = process.env.PORT || 3000;
var mode = process.env.NODE_ENV;
var app = express();


//MIDDLEWARE
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/nytpopulater");

//HANDLEBARS
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.get("/scrape", function(req, res){

  //We request the body using axios.
  axios.get("http://www.nytimes.com").then(function(response){

    //Loading response into cherio.
    var $ = cherio.load(response.data);
  })
})
