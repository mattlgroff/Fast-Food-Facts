const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Handlebars
app.engine("handlebars", exphbs(
  { 
    defaultLayout: "main",
    //The Helpers here add functions that you can use inside of handlebars.
    helpers:{
      caloriesFromFat: totalFat => parseInt(totalFat) * 9,
      percentDailyTotalFat: totalFat => Math.round(parseFloat(parseInt(totalFat) / 64) * 100),
      percentDailySatFat: satFat => Math.round(parseFloat(parseInt(satFat) / 20) * 100),
      percentDailyChol: chol => Math.round(parseFloat(parseInt(chol) / 300) * 100),
      percentDailySodium: sodium => Math.round(parseFloat(parseInt(sodium) / 2400) * 100),
      percentDailyTotalCarb: totalCarb => Math.round(parseFloat(parseInt(totalCarb) / 300) * 100),
      percentDailyDietaryFiber: dietaryFiber => Math.round(parseFloat(parseInt(dietaryFiber) / 25) * 100)
    }
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
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
});
