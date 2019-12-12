var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
// Not sure if I'll actually need this one here. 
var router = express.Router();
// Import the model for notes and articles 

var db = require("../models")


function clearData() {
    db.Opening.deleteMany({}, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("that worked, everything got dropped first.")
        }
    })
}
// Let's add some routes here. 

// The homepage should also be the page where we scrape, so that everytime you visit the homepage, more openings are being scraped. 
router.get("/scrape", function (req, res) {
    clearData();
    // First, we grab the body of the html with axios
    axios.get("http://www.chess.com/openings").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $(".openings-game-block").each(function (i, element) {
            //    Here's the title. Need to find a lower class first. 
            var title = $(element).find(".openings-game-name").text().trim();
            console.log("Here's the name of the opening: " + title)
            // Need to grab the link as well. It's in the main class, so just an href. 
            var link = $(element).attr("href").trim();
            console.log("Here's the link to the opening: " + link)
            // Grab the image src also, which I will use later. 
            var image = $(element).find(".openings-image").attr("src").trim();
            console.log("Here's the image URL: " + image)

            db.Opening.create({
                "title": title,
                "link": link,
                "image": image
            });
        });
        // Send a message to the client
        res.send("Scrape Complete");
    });
});

module.exports = router, clearData;

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
