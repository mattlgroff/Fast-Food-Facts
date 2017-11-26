const db = require("../models");
const request = require('request')

module.exports = {
  selectOne: function(req, res, id){
    db.Nutrition.findOne({
      where: {
        id: id
      }
    })
    .then(results => {
      if(results.dataValues['USDA ID']) {
        var walmartApiKey = process.env.walmartApiKey;
        request('http://api.walmartlabs.com/v1/items?apiKey='+walmartApiKey+'&upc='+results.dataValues['USDA ID']+'', function(err, respone, body){
          if(body === undefined || body.toString().includes('error')) {
            res.render("partials/nutritionPartial", {
              nutrition: results.dataValues,
              layout: false,
              user: req.user
            });
          }
          else{
            var parsedBody = JSON.parse(body);

            if(parsedBody.errors){
              res.render("nutrition", {
                nutrition: results.dataValues,
                user: req.user
              });
            }
            else {
              res.render("nutrition", {
                nutrition: results.dataValues,
                user: req.user,
                image: parsedBody.items[0].largeImage
              });
            }
          }
        });
      }
      else{
        res.render("nutrition", {
          nutrition: results.dataValues,
          user: req.user
        });
      }
    })
    .catch(err => {
      error(req, res, err);
    });
  },
  createFood: function(req, res){

    //If the food has a USDA, we check if it exists.
    if(req.body["USDA ID"]){
      db.Nutrition.findOne({
        where: {
          "USDA ID": req.body["USDA ID"]
        }
      })
      .then(results => {
        console.log("Found a USDA ID, does it have any value?");

        //A USDA Exists and is in the database. Respond with redirect URL.
        if(results){
          console.log("ID of found result: " + results.dataValues.id);
          var walmartApiKey = process.env.walmartApiKey;
          request('http://api.walmartlabs.com/v1/items?apiKey='+walmartApiKey+'&upc='+results.dataValues['USDA ID']+'', function(err, respone, body){
            if(body === undefined || body.toString().includes('error')) {
              res.render("partials/nutritionPartial", {
                nutrition: results.dataValues,
                layout: false,
                user: req.user
              });
            }
            else{

              var parsedBody = JSON.parse(body);
              if(parsedBody.errors){
                res.render("partials/nutritionPartial", {
                  nutrition: results.dataValues,
                  layout: false,
                  user: req.user
                });
              }
              else {
                res.render("partials/nutritionPartial", {
                  nutrition: results.dataValues,
                  layout: false,
                  image: parsedBody.items[0].largeImage,
                  user: req.user
                });
              }
            }
          });
        }
        //A USDA ID exists, but none is found in the Database. Create a new entry. Respond with new URL.
        else{
          db.Nutrition.create(req.body)
          .then(results => {
            if(results) {
              var walmartApiKey = process.env.walmartApiKey;
              request('http://api.walmartlabs.com/v1/items?apiKey='+walmartApiKey+'&upc='+results.dataValues['USDA ID']+'', function(err, respone, body){
                if(body === undefined || body.toString().includes('error')) {
                  res.render("partials/nutritionPartial", {
                    nutrition: results.dataValues,
                    layout: false,
                    user: req.user
                  });
                }
                else{
                  var parsedBody = JSON.parse(body);
                  if(parsedBody.errors){
                    res.render("partials/nutritionPartial", {
                      nutrition: results.dataValues,
                      layout: false,
                      user: req.user
                    });
                  }
                  else {
                    res.render("partials/nutritionPartial", {
                      nutrition: results.dataValues,
                      layout: false,
                      image: parsedBody.items[0].largeImage,
                      user: req.user
                    });
                  }
                }
              });
            }
          })
        }
      })
      .catch(err => {
        console.error(err);
      });
    }
    //The food has no USDA ID, so we create it in the database.
    else{
      db.Nutrition.create(req.body)
      .then(results => {
        let baseUrl = "http://fastfoodfacts.herokuapp.com/nutrition/";

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
    }
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
      //Check if the myList item exists already.
      db.UserNutrition.findOne({
        where: {
          user_id: req.user.id,
          nutrition_id: req.body.nutrition_id
        }
      })
      .then(results => {
        //The item in myList exists already.
        if(results){
          console.log("This is already in their list.");
          res.json({error:"Already in your list!"});
        }
        //The item in myList DOES NOT exist. Create it.
        else{
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
      })
      .catch(err => {
        console.error(err);
      });
    },
    inMyList: function(req, res){
      //Check if the myList item exists already.
      db.UserNutrition.findOne({
        where: {
          user_id: req.user.id,
          nutrition_id: req.body.nutrition_id
        }
      })
      .then(results => {
        //The item in myList exists already.
        if(results){
          res.json({inmylist:true});
        }
        //The item in myList DOES NOT exist.
        else{
          res.json({inmylist:false})
        }
      })
      .catch(err => {
        console.error(err);
      });
    },
    deleteUserNutrition: function(req, res){
      db.UserNutrition.destroy({
        where: {
          user_id: req.body.user_id,
          nutrition_id: req.body.nutrition_id
        }
      })
      .then(results => {
        res.json(results);
      })
      .catch(err => {
        console.error(err);
        res.json({"Error":err});
      });
    }
  }

  function error(req, res, err){
    console.error(err);
    res.send("<h1>Error 404: Page Not Found</h1>");
  }
