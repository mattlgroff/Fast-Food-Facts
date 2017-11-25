const db = require("../models");
const request = require('request')

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
      if(results === undefined || results === null ){
        error(req, res, result);
      }
      else {
        request('http://api.walmartlabs.com/v1/items?apiKey=grfg2f6ffkqhzyy92raeyfyn&upc='+results.dataValues['USDA ID']+'', function(err, respone, body){
          console.log(JSON.parse(body))
          if(err){
            res.render("partials/nutritionPartial", {
              nutrition: results.dataValues,
              layout: false,
              image: false
            });
          }
          res.render("partials/nutritionPartial", {
            nutrition: results.dataValues,
            layout: false,
            image: JSON.parse(body).items[0].mediumImage
          });
        });

      }
    })
    .catch(err => {
      console.error(err);
    });
  },
  findAll: function(req, res) {
    db.UserNutrition.findAll({
      where: {
        user_id: req.user.id
      }
    }).then(result => {
      if(result === undefined || result === null){
        error(req, res, result);
      }
      else {
        var mapped = result.map(results => results.dataValues);
        console.log(mapped);
        res.render(
          "myList",
          {myList: mapped,
          user: req.user
        });
      }
    }).catch(err => {
      error(req, res, err);
    });
  },
  addToList: function(req, res){
    db.UserNutrition.create({
      user_id: req.body.user_id,
      nutrition_id: req.body.nutrition_id,
      nutrition_name: req.body.nutrition_name
    })
    .then(results => {
      res.json(results.dataValues);
    })
    .catch(err => {
      console.error(err);
    });
  }
};

function error(req, res, err){
  console.error(err);
  res.send("<h1>Error 404: Page Not Found</h1>");
}
