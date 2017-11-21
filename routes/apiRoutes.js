const apiController = require("../controllers/apiController.js");

module.exports = app => {
  //Sends JSON of every NUTRITION in our database
  app.get("/api/all", apiController.selectAll);

  //Sends JSON of one NUTRITION in our database
  app.get("/api/:id", (req, res) => {
    apiController.selectOne(req, res, req.params.id);
  });

  //Sends JSON of all of a USER's saved nutrition
  app.get("/api/user/:id", (req, res) => {
    apiController.userNutrition(req, res);
  });

  //Creates a new record for a Nutrition Fact in our database
  app.post("/api/new", apiController.create);
}