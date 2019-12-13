// Adding the Buttons. The delete button is causing me trouble. 
// Scrape button first. 
$(function () {
    // Scrape button first. 
    $(".scrapeOpenings").on("click", function (event) {
        event.preventDefault();
        alert("scrape successful!")
        console.log("scrape button is triggering")
        $.ajax("/scrape", {
            type: 'GET',
            success: function (response) {
                if (response == 'error') {
                    console.log('Err!');
                }
                else {
                    console.log("scraping all those dope openings.");
                    location.reload();
                }
            }
        });
    });

    $(".deleteOpening").on("click", function (event) {
        event.preventDefault();
        console.log("delete button is triggering")
        var _id = $(this).attr("data-id");
        if (confirm("You positive? That opening is dope.")) {
            $.ajax("api/openings/" + _id, {
                type: 'DELETE',
                success: function (response) {
                    if (response == 'error') {
                        console.log('Err!');
                    }
                    else {
                        alert('Success');
                        console.log("Just deleted that lame opening")
                        location.reload();
                    }
                }
            });
        } else {
            alert('Canceled!');
        }
    });

    $(".clearOpenings").on("click", function (event) {
        event.preventDefault();
        console.log("clear button is triggering")
        if (confirm("You positive? That clears all of the openings")) {
            $.ajax("api/clear", {
                type: 'DELETE',
                success: function (response) {
                    if (response == 'error') {
                        console.log('Err!');
                    }
                    else {
                        alert('Success');
                        console.log("Just deleted that lame opening")
                        location.reload();
                    }
                }
            });
        } else {
            alert('Canceled!');
        }
    });

    $(".saveButton").on("click", function (event) {
        event.preventDefault();
        console.log("save button is triggering")
        // this means "use this button's data-id"
        var _id = $(this).attr("data-id")
        $.ajax("api/saved/" + _id, {
            type: "PUT",
            success: function (response) {
                if (response == 'error') {
                    console.log('Err!');
                }
                else {
                    console.log("Just saved that dope opening")
                    location.reload();
                }
            }
        });
    });
});

