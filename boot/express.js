let express = require('express');
let passport = require('passport');
let path = require('path');
let flash = require('connect-flash');
let logger = require('morgan');
let methodOverride= require('method-override');
let cookieParser= require('cookie-parser');
let session= require('express-session');
let config = require("nconf");

module.exports= app=> {

    app.set('port', process.env.PORT|| 5000);
    app.set('views', path.join(__dirname +"/.." ,'/views'));
    app.set('view engine', 'jade');

    let sessionOptions = config.get("session");
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
