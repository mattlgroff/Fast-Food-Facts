const models = require("../models");

module.exports = function(sequelize, DataTypes) {

    const UserNutrition = sequelize.define('UserNutrition', {

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        nutrition_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        nutrition_name: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, {
      freezeTableName: true,
      tableName: 'UserNutrition'
    });

    return UserNutrition;

}