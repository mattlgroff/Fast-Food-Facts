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
        res.render("nutrition",result.dataValues);
      }
    })
    .catch(err => {
      error(req, res, err);
    });
  },
  createFood: function(obj, res){
    db.Nutrition.create(obj)
    .then(results => {
      let baseUrl = "https://electricboogaloo.herokuapp.com/nutrition/"

      if(process.env.mysql_pw){
        baseUrl = "http://localhost:8080/nutrition/";
      }

      //console.log("ID: " + results.dataValues.id);
      res.json({
        "redirect":true,
        "redirect_url":baseUrl + results.dataValues.id
      });
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