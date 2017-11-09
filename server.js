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
// --- Handlebars Helpers ---
// //Calories from Fat
// exphbs.registerHelper('caloriesFromFat', totalFat => totalFat * 9);
// //% Daily Value from Total Fat
// exphbs.registerHelper('percentDailyTotalFat', totalFat => parseInt((totalFat / 64) * 100));
// //% Daily Value from Saturated Fat
// exphbs.registerHelper('percentDailySatFat', satFat => parseInt((satFat / 20) * 100));
// //% Daily Value from Cholesterol
// exphbs.registerHelper('percentDailyChol', chol => parseInt((chol / 300) * 100));
// //% Daily Value from Sodium
// exphbs.registerHelper('percentDailySodium', sodium => parseInt((sodium / 2400) * 100));
// //% Daily Value from Total Carb
// exphbs.registerHelper('percentDailyTotalCarb', totalCarb => parseInt((totalCarb / 300) * 100));
// //% Daily Value from Dietary Fiber
// exphbs.registerHelper('percentDailyDietaryFiber', dietaryFiber => parseInt((dietaryFiber / 25) * 100));

// BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// DB Sync
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
});
