module.exports.signin = function(req, res) {
  let user = req.flash('user');
  let password = req.flash('password');
  let message = req.flash('message');

  res.render('signin', {
    user:req.user, 
    message: {
      user: user,
      password: password,
      message: message
    }
  });

}

module.exports.signup = function(req, res) {
  let user = req.flash('user');
  let password = req.flash('password');
  let message = req.flash('message');

  res.render('signin', {
    user:req.user, 
    message: {
      user: user,
      password: password,
      message: message
    }
  });

}

module.exports.logout = function(req, res) {

    req.session.destroy(function(err) {

        res.redirect('/');

    });

}