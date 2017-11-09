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
  }
}

function error(req, res, err){
  console.error(err);
  res.send("<h1>Error 404: Page Not Found</h1>");
}