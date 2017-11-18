const models = require("../models");

module.exports = function(sequelize, Sequelize) {

    var User = sequelize.define('User', {

        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        }

    }, {
        timestamps: true
    });

    User.associate = function(models) {
        // Associating User with Nutrition
        User.belongsToMany(models.Nutrition, {
            as: 'Users', 
            through: "UserNutrition",
            foreignKey: "user_id"
        });
      };

    return User;

}