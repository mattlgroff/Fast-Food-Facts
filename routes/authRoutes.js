const authController = require('../controllers/authController.js');
const htmlController = require('../controllers/htmlController.js');

module.exports = function(app, passport) {

    //Signin Route GET
    app.get('/signin', authController.signin);

    //SignIn Route POST
    app.post('/signin', passport.authenticate('local-signin', {
      successRedirect: '/',
      failureRedirect: '/signin',
      failureFlash: true 
      }
    ));

    //Signup Route POST
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }
    ));
    
    //Logout
    app.get('/logout', authController.logout);

    //View MyList
    app.get("/mylist", isLoggedIn, (req, res) => {
      htmlController.findAll(req, res);
    });

};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())

        return next();

    res.redirect('/signin');

}