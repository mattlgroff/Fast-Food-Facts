const bCrypt = require('bcrypt-nodejs');
const models = require("../../models/");

module.exports = function(passport, user) {

    const User = models.User;

    var LocalStrategy = require('passport-local').Strategy;
    //serialize
    passport.serializeUser(function(user, done) {

        done(null, user.id);

    });
    // deserialize user 
    passport.deserializeUser(function(id, done) {

        User.findById(id).then(function(user) {

            if (user) {

                done(null, user.get());

            } else {

                done(user.errors, null);

            }

        });

    });


    passport.use('local-signup', new LocalStrategy(

        {

            usernameField: 'email',

            passwordField: 'password',

            passReqToCallback: true // allows us to pass back the entire request to the callback

        },



        function(req, email, password, done) {

            var generateHash = function(password) {

                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

            };



            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {

                if (user)

                {

                    return done(null, false, req.flash('user', 'User is taken.'));

                } else

                {

                    var userPassword = generateHash(password);

                    var data =

                        {
                            email: email,

                            password: userPassword

                        };

                    User.create(data).then(function(newUser, created) {

                        if (!newUser) {

                            return done(null, false);

                        }

                        if (newUser) {

                            return done(null, newUser);

                        }

                    });

                }

            });

        }

    ));
    passport.use('local-signin', new LocalStrategy(

        {

            // by default, local strategy uses username and password, we will override with email

            usernameField: 'email',

            passwordField: 'password',

            passReqToCallback: true // allows us to pass back the entire request to the callback

        },


        function(req, email, password, done) {

            const User = models.User;

            var isValidPassword = function(userpass, password) {

                return bCrypt.compareSync(password, userpass);

            }

            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {

                if (!user) {
                    return done(null, false, req.flash('user', 'User does not exist.'));
                }

                if (!isValidPassword(user.password, password)) {
                    return done(null, false, req.flash('password', 'Password is incorrect.'));
                }

                var userinfo = user.get();
                return done(null, userinfo);

            }).catch(function(err) {

                console.log("Error:", err);

                return done(null, false, req.flash('message', 'Something went wrong.'));

            });


        }

    ));
}