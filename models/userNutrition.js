const models = require("../models");

module.exports = function(sequelize, Sequelize) {

    var UserNutrition = sequelize.define('UserNutrition', {

        // user_id: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false
        // },

        // nutrition_id: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false
        // }

    });


    UserNutrition.associate = function(models) {
      
      UserNutrition.hasMany(models.User);
      UserNutrition.hasMany(models.Nutrition);

    }

    return UserNutrition;

}