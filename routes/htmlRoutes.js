const express = require("express");
const path = require("path");
const htmlController = require("../controllers/htmlController.js");

module.exports = app => {
  //Public Folder
  app.use(express.static(path.join(__dirname, './../public')));

  //Home Page
  app.get("/", (req, res) => {
    res.render("index", {user:req.user});
  });

  //Home Page
  app.get("/index", (req, res) => {
    res.render("index", {user:req.user});
  });

  //Home Page
  app.get("/index.html", (req, res) => {
    res.render("index", {user:req.user});
  });

  //Select One Nutrition from ID
  app.get("/nutrition/:id", (req, res) => {
    htmlController.selectOne(req, res, req.params.id);
  });

  //Search Page
  app.get("/search", (req, res) => {
    res.render("search", {user:req.user});
  });

  //Create Food Form
  app.get("/create", (req, res) => {
    res.render("createFood", {user:req.user});
  });


  //Post to create a new food
  app.post("/create", (req, res) => {
    htmlController.createFood(req, res);
  });

  //Post to create a new food
  app.post("/nutrition", (req, res) => {
    htmlController.addToList(req, res);
  });


}
