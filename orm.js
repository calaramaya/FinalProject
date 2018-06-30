// variable declarations for required functions
let connection = require("./connection.js");

// function that helps convert object key/value pairs to SQL syntax
function objToSql(ob) {
    let arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (let key in ob) {
        let value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations 
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }

            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single string
    return arr.toString();
}

// ORM object
let orm = {

    // function to get all vehicles from database
    selectAll: function (tableInput, cb) {
        let queryString = "SELECT * FROM " + tableInput + ";";

        console.log(queryString);

        connection.query(queryString, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    // function to add vehicle into database
    insertOne: function (table, cols, vals, cb) {
        let queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES ('";
        queryString += vals;
        queryString += "') ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) throw err;

            cb(result);
        });
    },
    // function to update status of vehicle in database
    changeOne: function (table, objColVals, condition, cb) {
        let queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function (err, result) {
            if (err) throw err;

            cb(result);
        });
    },
    // function to delete a vehicle from database
    deleteOne: function (table, condition, cb) {
        let queryString = "DELETE FROM " + table;

        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function (err, result) {
            if (err) throw err;

            cb(result);
        });
    }
};

// export ORM for vehicle model to use
module.exports = orm;