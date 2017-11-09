const express = require('express');

module.exports = app => {
  //TODO HTML ROUTES
  app.use(express.static("../public"));
}