const db = require("../models");

module.exports = {
  create: function(req, res){
    db.Nutrition.create(req.body)
    .then(results => {
      console.log("Created new Nutrition for " + req.body.Name + ".");
      res.json(results);
    })
    .catch(err => {
      error(err);
    });
  },
  selectAll: function(req, res){
    db.Nutrition.findAll({})
    .then(results => {
      console.log("Sending JSON Obj of ALL Nutrition.");
      res.json(results);
    })
    .catch(err => {
      error(err);
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
      error(err);
    });
  }
}

function error(err){
  console.error(err);
  res.json({
    'Error': err
  });
}