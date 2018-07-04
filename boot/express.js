var express = require('express');
var passport = require('passport');
var path = require('path');
var flash = require('connect-flash');
var logger = require('morgan');
var methodOverride= require('method-override');
var cookieParser= require('cookie-parser');
var session= require('express-session');
var config = require("nconf");

module.exports= function(app) {

    app.set('port', process.env.PORT|| 5000);
    app.set('views', path.join(__dirname +"/.." ,'/views'));
    app.set('view engine', 'jade');

    var sessionOptions = config.get("session");
    if ('production' == app.get('env')) {
        var MemcachedStore = require('connect-memcached')(express);
        sessionOptions.store = new MemcachedStore(
            config.get("memcached")
        );
    }

    app.use(logger('combined'));
    app.use(express.static(path.join(__dirname+"/..", 'public')));
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(session(sessionOptions));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
};
