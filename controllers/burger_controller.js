var express = require("express");

//set up router
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes 
router.get("/", function (req, res) {
    burger.displayAll(function (data) {

        //create our object to render our html files
        var hbsObject = {
            burgers: data
        };

        //send our root html files with the burgers from our db
        res.render("index", hbsObject);
    });
});

//this call allows user to view burgers in db from our html page
router.get("/api/burgers", function (req, res) {
    burger.displayAll(function (data) {
        var hbsObject = {
            burgers: data
        };

        //send the db object in json to client
        res.send(hbsObject)
    });
});

//adding a new burger
router.post("/api/burgers", function (req, res) {

    //creating our new burger object
    burger.create('burger_name', req.body.burger_name, 'devoured', false, 'burger_image', req.body.burger_image, function (result) {

        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});

//allows client to change 'devoured' status
router.put("/api/burgers/:id", function (req, res) {
    
    //since we will only ever change the status to "devoured", we can assume for this app that the new value will always be 1
    burger.update("devoured", 1, req.params.id, function (result) {
        if (result.changedRows == 0) {

            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//allows user to delete any burger whether deleted or not (taking CRUD full circle)
router.delete("/api/burgers/:id", function (req, res) {
    burger.delete("id", req.params.id, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
// Export routes for server.js to use.
module.exports = router;


