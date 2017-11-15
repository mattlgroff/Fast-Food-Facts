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

// Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// DB Sync - force: false means it will NOT drop the tables if they exist
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
});
