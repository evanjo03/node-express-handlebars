

//burger.js
// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
    displayAll: function (callBack) {
        orm.displayAll("burgers", function (res) {
            callBack(res);
        });
    },
    //adding a new burger
    create: function (colOne, valOne, colTwo, valTwo, colThree, valThree, callBack) {
        orm.create("burgers", colOne, valOne, colTwo, valTwo, colThree, valThree, function (res) {
            callBack(res);
        });
    },
    //changing a column based on ID
    update: function (colToChange, newVal, TargetId, callBack) {
        orm.update("burgers", colToChange, newVal, TargetId, function (res) {
            callBack(res);
        });
    },
    //deleting a row in db
    delete: function (column, valueToDelete, callBack) {
        orm.delete("burgers", column, valueToDelete, function (res) {
            callBack(res);
        });
    }
};

// Export the database functions for the controller (catsController.js).
module.exports = burger;
