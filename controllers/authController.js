module.exports.signin = function(req, res) {
    res.render('signin', {user:req.user});

}

module.exports.signup = function(req, res) {
    res.render('signin', {user:req.user});

}

module.exports.dashboard = function(req, res) {

    res.render('dashboard', {user:req.user});

}

module.exports.logout = function(req, res) {

    req.session.destroy(function(err) {

        res.redirect('/');

    });

}