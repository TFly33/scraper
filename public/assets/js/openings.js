// Adding the Buttons. The delete button is causing me trouble. 
$(function () {
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

    });
});



// $(function () {
//     // $(".addBurger").on("click", function (event) {
//     //     event.preventDefault();

//     //     var newBurger = {
//     //         burger_name: $(".burgerName").val().trim(),
//     //         devoured: false
//     //     }
//     //     console.log("The name of the burger is: " + newBurger.name);

//     //     // And here we will post it. 
//     //     // NEED TO ADD THE ID HERE
//     //     $.ajax("/api/burgers", {
//     //         type: "POST",
//     //         data: newBurger
//     //     }).then(
//     //         function () {
//     //             console.log("new burger added");
//     //             location.reload();
//     //         }
//     //     );
//     // });
//     $(".deleteOpening").on("click", function (event) {
//         event.preventDefault();

//         var id = $(this).data("id");

//         // And here we will post it. 
//         // The idea is to change the devoured state to true. 
//         $.ajax("/api/openings" + id, {
//             type: "DELETE"
//         }).then(
//             function () {
//                 console.log("the opening is deleted!");
//                 location.reload();
//             }
//         );

//     })

// });