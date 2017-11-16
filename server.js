const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 8080;
const db = require("./models");
const helperFunctions = require("./controllers/helper.js")

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
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// DB Sync - force: false means it will NOT drop the tables if they exist
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
});
