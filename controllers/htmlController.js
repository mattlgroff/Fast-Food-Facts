const db = require("../models");

module.exports = {
  selectOne: function(req, res, id){
    db.Nutrition.findOne({
      where: {
        id: id
      }
    })
    .then(result => {
      if(result === undefined || result === null ){
        error(req, res, result);
      }
      else {
        res.render("nutrition",{
          nutrition: result.dataValues,
          user: req.user
        });
      }
    })
    .catch(err => {
      error(req, res, err);
    });
  },
  createFood: function(req, res){
    db.Nutrition.create(req.body)
    .then(results => {
      let baseUrl = "http://electricboogaloo.herokuapp.com/nutrition/";

      if(process.env.mysql_pw){
        baseUrl = "http://localhost:8080/nutrition/";
      }

      res.json({
        "redirect":true,
        "redirect_url":baseUrl + results.dataValues.id
      });
    })
    .catch(err => {
      console.error(err);
    });
  },
  addToList: function(req, res){
    db.UserNutrition.create({
      user_id: req.body.user_id,
      nutrition_id: req.body.nutrition_id
    })
    .then(results => {
      res.json(results.dataValues);
    })
    .catch(err => {
      console.error(err);
    });

    }
}

function error(req, res, err){
  console.error(err);
  res.send("<h1>Error 404: Page Not Found</h1>");
}
