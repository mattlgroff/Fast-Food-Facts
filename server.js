const express = require("express");
const session = require('express-session');
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const passport = require('passport');
const PORT = process.env.PORT || 8080;
const db = require("./models");
const helperFunctions = require("./controllers/helper.js");

//Passport
require('./config/passport/passport.js')(passport, db.user);
app.use(session({ secret: 'drop table cat', resave: true, saveUninitialized: true })); //session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions

// Handlebars
app.engine("handlebars", exphbs(
  {
    defaultLayout: "main",
    //The Helpers here add functions that you can use inside of handlebars.
    helpers:helperFunctions
  }
));

app.set("view engine", "handlebars");
// BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);
require('./routes/authRoutes.js')(app, passport);

// DB Sync - force: false means it will NOT drop the tables if they exist
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
});
