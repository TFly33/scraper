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

// Here is the homepage. Let's display all of the openings here. We will create a separate scrape route after this. 
router.get("/", function (req, res) {
    db.Opening.find({})
    .then(function(dbOpening) {
      // If we were able to successfully find Openings, send them back to the client
    var hbsObject = {
        openings: dbOpening
    };
    console.log("here is the object being sent to handlebars: " + hbsObject);
      res.render("index",hbsObject);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Let's make the scrape route. I think we want the title, link, image for now.  
router.get("/scrape", function (req, res) {
    // **********************I'm going to try to clear the data each time. But I may need to come back to this and make sure this function doesn't screw up my saved paged. *********************
    // **********************
    clearData();
 // **********************
    axios.get("http://www.chess.com/openings").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Grabbing the info on chess.com/openings using this tag. Surprisingly clean html layout, not too much trouble. 
        $(".openings-game-block").each(function (i, element) {
            //    Here's the title. Need to find a lower class first. 
            var title = $(element).find(".openings-game-name").text().trim();
            console.log("Here's the name of the opening: " + title)
            // Need to grab the link as well. It's in the main class, so just an href. 
            var link = $(element).attr("href").trim();
            console.log("Here's the link to the opening: " + link)
            // Grab the image data-src also, which I will use later. 
            var image = $(element).find(".openings-image").attr("data-src").trim();
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

// Let's make a delete route here. We'll call it /api/openings/:id 

router.delete("/api/openings/:_id", function (req, res) {
    var condition = "_id = " + req.params._id;
    console.log("this delete route is workings")
    db.Opening.deleteOne(condition, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// I'm going to also export the clearData function in case I want to use it again later. 
module.exports = router, clearData;

