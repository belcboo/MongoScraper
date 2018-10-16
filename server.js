// DEPENDENCIES

require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var cheerio = require("cheerio");
var axios = require("axios");


//DEFINING PORT
var PORT = process.env.PORT || 4000;
var mode = process.env.NODE_ENV;
var app = express();


//MIDDLEWARE
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: true
}));
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

app.get("/scrape", function(req, res) {

      //We request the body using axios.
      axios.get("http://www.nytimes.com").then(function(response) {

        //Loading response into cherio.
        var $ = cherio.load(response.data);

        // Looking for h2 tags.
        $("article h2").each(function(i, element) {
          // Save an empty result object
          var result = {};

          // Add the text and href of every link, and save them as properties of the result object
          result.title = $(this)
            .children("a")
            .text();
          result.link = $(this)
            .children("a")
            .attr("href");
        })
      })
      //ROUTES


      //STARTING EXPRESS SERVER
      app.listen(PORT, function() {
        console.log("App running on port " + PORT + "!");
      });
