// Import MySQL connection.
var connection = require("../config/connection.js");

var orm = {
    //function should call all data from the db (all burgers)
    displayAll: function (table, callBack) {

        //our qS will allow us to modify which table we are selecting all from
        var queryString = "SELECT * FROM ??;"
        connection.query(queryString, [table], function (err, data) {
            if (err) throw err;
            callBack(data);
        });
    },
    //this method will allow us to add in new data rows into a table and enter in any col names/values
    create: function (table, colOne, valOne, colTwo, valTwo, colThree, valThree, callBack) {
        var queryString = `INSERT INTO ${table} (${colOne}, ${colTwo}, ${colThree}) VALUES ("${valOne}",${valTwo}, "${valThree}");`;
        console.log("Query String:", queryString)
        connection.query(queryString, function (error, data) {
            if (error) throw error;
            callBack(data);
        });
    },
    //this method will allow us to change data (alter eaten burger status from devoured/not devoured
    update: function (table, colToChange, newVal, TargetId, callBack) {
        var queryString = `UPDATE ${table} SET ${colToChange} = ${newVal} WHERE id = ${TargetId};`
        connection.query(queryString, function (error, data) {
            if (error) throw error;
            callBack(data);
        });
    },

    //this method will allow us to delete a burger from the table
    delete: function (table, column, valueToDelete, callBack) {
        var queryString = `DELETE FROM ${table} WHERE ${column} = ${valueToDelete};`
        connection.query(queryString, function (err, data) {
            if (err) throw err;
            callBack(data);
        });
    }
};


// Export the orm object for the model (burger.js).
module.exports = orm;

