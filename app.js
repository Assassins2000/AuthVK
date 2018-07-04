var express = require('express');
var http= require('http');
var app = express();
var config= require('nconf');


config.argv()
    .env()
    .file({ file: 'config.json' });

require("./boot/express")(app);
require("./boot/passport")(app);
require("./routes/index")(app);

http.createServer(app).listen(app.get('port'), function (){
    if ('development' == app.get('env')) {
        console.log('Express server listening on port ' + app.get('port'));
    }
});

module.exports = app;
