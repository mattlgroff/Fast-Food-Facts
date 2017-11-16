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

  app.get("/search", (req, res) => {
    res.render("search", null);
  })
}
