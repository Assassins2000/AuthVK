//boot/passport.js
var config = require("nconf");
var passport = require('passport');

var AuthVKStrategy = require('passport-vkontakte').Strategy;

passport.use('vk', new AuthVKStrategy({
        clientID: config.get("auth:app_id"),
        clientSecret: config.get("auth:secret"),
        callbackURL: config.get("app:url") + "/auth/vk/callback"
    },
    (accessToken, refreshToken, profile, done) => {

        return done(null, {
            accessToken: accessToken,
            id: profile.id,
            username: profile.displayName,
            photoUrl: profile.photos[0].value,
            profileUrl: profile.profileUrl

        });
    }
));

passport.serializeUser((user, done) => {
    done(null, JSON.stringify(user));
});


passport.deserializeUser( (data, done)=> {
    try {
        done(null, JSON.parse(data));
    } catch (e) {
        done(err)
    }
});


module.exports = app => {};