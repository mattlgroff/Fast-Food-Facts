const express = require("express");
const path = require("path");
const htmlController = require("../controllers/htmlController.js");

module.exports = app => {
  //Public Folder
  app.use(express.static(path.join(__dirname, './../public')));

  //Select One Nutrition from ID
  app.get("/nutrition/:id", (req, res) => {
    htmlController.selectOne(req, res, req.params.id);
  });

  //Create Food Form
  app.get("/create", (req, res) => {
    //TODO: Null will be replaced with the User object containing the logged in user
    res.render("createFood",null);
  });

  app.post("/create", (req, res) => {
    htmlController.createFood(req.body, res);
  });
}