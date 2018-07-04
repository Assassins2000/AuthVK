//routes/auth.js
var passport = require('passport');

module.exports = app=> {

    app.get('/auth',  (req, res)=> {

        if (req.isAuthenticated()) {
            res.redirect('/');
            return;
        }
        res.render('auth', {
            error: req.flash('error')
        });
    });
    app.get('/sign-out',  (req, res)=> {
        req.logout();
        res.redirect('/');
    });
    app.get('/auth/vk',
        passport.authenticate('vk', {
            scope: ['friends', 'email']
        }),
         (req, res) =>{
            // The request will be redirected to vk.com
            // for authentication, so
            // this function will not be called.
        });

    app.get('/auth/vk/callback',
        passport.authenticate('vk', {
            failureRedirect: '/auth'
        }),
        (req, res) =>{
            // Successful authentication
            //, redirect home.
            res.redirect('/');
        });
}