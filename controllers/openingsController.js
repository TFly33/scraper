var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var mongojs = require("mongojs");
// Not sure if I'll actually need this one here. 
var router = express.Router();
// Import the model for notes and articles 
// CREAT THIS LATER 
// var Note = require("..Note");
var Opening = require("../models/Opening.js");
// Believe I need this also. 
var databaseUrl = "chess";
var collections = ["e4"];
var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
    console.log("Database Error:", error);
});

// Initialize Express
// var app = express();

// Let's add some routes here. 

// The homepage should also be the page where we scrape, so that everytime you visit the homepage, more openings are being scraped. 
router.get("/", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("http://www.chess.com/openings").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $(".openings-game-block").each(function (i, element) {
            // Save an empty result object/ Maybe I'll come back to this. 
            // var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            var title = $(element).find(".openings-game-name").text().trim();
            console.log("Here's the name of the opening: " + title)
            var link = $(element).attr("href").trim();
            console.log("Here's the link to the opening: " + link)
            var image = $(element).find(".openings-image").attr("src").trim();
            console.log("Here's the image URL: " + image)

            db.e4.insert({
                "title": title,
                "link": link,
                "img": image
            })
            // Create a new opening using the `result` object built from scraping
            // db.e4.create(result)
            //     .then(function (dbopenings) {
            //         // View the added result in the console
            //         console.log(dbopenings);
            //     })
            //     .catch(function (err) {
            //         // If an error occurred, log it
            //         console.log(err);
            //     });
        });

        // Send a message to the client
        res.send("Scrape Complete");
    });
});

module.exports = router


// // Route for getting all Articles from the db
// app.get("/articles", function (req, res) {
//     // Grab every document in the Articles collection
//     db.openings.find({})
//         .then(function (dbArticle) {
//             // If we were able to successfully find Articles, send them back to the client
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             // If an error occurred, send it to the client
//             res.json(err);
//         });
// });
