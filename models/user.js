module.exports = function(sequelize, DataTypes) {

  const User = sequelize.define('User', {

        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, {
        timestamps: false
    });

    return User;

}