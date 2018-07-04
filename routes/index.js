var express = require('express');


/* GET home page. */

module.exports = app=> {
    require("./home")(app);
    require("./auth")(app);

};

