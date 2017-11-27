const request = require('request');

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

module.exports.coinhive = function(req, res){

  let secret = process.env.coinhiveSecret.toString();
  console.log("Secret: " + secret);

  let token = req.body['coinhive-captcha-token'];
  console.log("Token: " + token);

  let auth = {
    "token": req.body['coinhive-captcha-token'],
    "secret": secret,
    "hashes": 1024
  }

  let options = {
    method: 'POST',
    headers: {
      "content-type": "application/json",
    },
    url: 'https://api.coinhive.com/token/verify',
    json: auth
  }

  console.log(options.body);

  request(options, (err,response,body) => {
    if(err){
      console.error(err);
    }
    else{
      console.log("Response: ");
      console.log(response);

      console.log("Body: ");
      console.log(body);

      if(body.error){
        console.log("Error: " + body.error);
      }
      console.log("Success: " + body.success);
    }
  });

}