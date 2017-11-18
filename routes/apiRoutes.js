const apiController = require("../controllers/apiController.js");

module.exports = app => {
  //Sends JSON of EVERY nutrition in our database
  app.get("/api/all", apiController.selectAll);

  //Sends JSON of ONE nutrition in our database
  app.get("/api/:id", (req, res) => {
    apiController.selectOne(req, res, req.params.id);
  });

  //Creates a new record for a Nutrition Fact in our database
  app.post("/api/new", apiController.create);
}