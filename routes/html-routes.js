const express = require("express");
const path = require("path");

module.exports = app => {
  //TODO HTML ROUTES
  app.use(express.static(path.join(__dirname, './../public')));
}