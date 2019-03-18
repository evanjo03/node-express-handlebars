
//burger image array for use in assigning random images to each burger on the page
var images = [
    "/assets/images/20150702-sous-vide-hamburger-anova-primary.jpg",
    "/assets/images/download (1).jpg",
    "/assets/images/download (2).jpg",
    "/assets/images/download (3).jpg",
    "/assets/images/download (4).jpg",
    "/assets/images/download.jpg",
    "/assets/images/images.jpg",
    "/assets/images/images (1).jpg",
    "/assets/images/images (2).jpg",
    "/assets/images/images (3).jpg",
    "/assets/images/images (4).jpg",
    "/assets/images/images (5).jpg"
];

var imageCounter = Math.floor((Math.random() * images.length));

$(function() {
    $(".change-devoured").on("click", function (event) {
        var id = $(this).data("id");
        var newState = 1;

        var newDevouredState = {
            devoured: newState
        };

        // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(
            function () {
                console.log("changed devoured to", newState);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $("#new-burger").on("click", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log("sent");


        var newBurger = {
            burger_name: $("#bg").val().trim(),
            burger_image: images[imageCounter]
        };

        imageCounter++;
        console.log(newBurger)

        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("created new burger");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(".delete").on("click", function (event) {
        var id = $(this).data("id");

        // Send the DELETE request.
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            function () {
                console.log("deleted burger", id);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});







