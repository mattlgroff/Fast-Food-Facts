const db = require("../models");

module.exports = {
  create: function(req, res){
    db.Nutrition.create(req.body)
    .then(results => {
      console.log("Created new Nutrition for " + req.body.Name + ".");
      res.json(results);
    })
    .catch(err => {
      error(req, res, err);
    });
  },
  selectAll: function(req, res){
    db.Nutrition.findAll({})
    .then(results => {
      console.log("Sending JSON Obj of ALL Nutrition.");
      res.json(results);
    })
    .catch(err => {
      error(req, res, err);
    });
  },
  selectOne: function(req, res, id){
    db.Nutrition.findOne({
      where: {
        id: id
      }
    })
    .then(result => {
      console.log("Sending JSON Obj of Nutrition for " + id + ".");
      res.json(result);
    })
    .catch(err => {
      error(req, res, err);
    });
  },
  userNutrition: function(req, res){
    db.UserNutrition.findAll({
      attributes: ['nutrition_id'],
      where: {
        user_id: req.params.id
      }
    })
    .then(result => {
      var mapped = result.map(results => results.dataValues.nutrition_id);
      res.json({myList: mapped});
    })
    .catch(err => {
      error(req, res, err);
    });
  }
}

function error(req, res, err){
  console.error(err);
  res.json({
    'Error': err
  });
}