module.exports = function(sequelize, DataTypes) {

  const Nutrition = sequelize.define('Nutrition', {

    'Name': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'Serving Size': {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "1"
    },
    'Calories': {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      validate: {
        min: 0
      },
      defaultValue: 0
    },
    'Total Fat': {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      validate: {
        min: 0
      },
      defaultValue: 0
    },
    'Saturated Fat': {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      validate: {
        min: 0
      },
      defaultValue: 0
    },
    'Trans Fat': {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      validate: {
        min: 0
      },
      defaultValue: 0
    },
    'Cholesterol': {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      validate: {
        min: 0
      },
      defaultValue: 0
    },
    'Sodium': {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      validate: {
        min: 0
      },
      defaultValue: 0
    },
    'Total Carbohydrate': {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      validate: {
        min: 0
      },
      defaultValue: 0
    },
    'Dietary Fiber': {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      validate: {
        min: 0
      },
      defaultValue: 0
    },
    'Sugars': {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      validate: {
        min: 0
      },
      defaultValue: 0
    },
    'Protein': {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      validate: {
        min: 0
      },
      defaultValue: 0
    },
    'Vitamin A': {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      validate: {
        min: 0
      },
      defaultValue: 0
    },
    'Vitamin C': {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      validate: {
        min: 0
      },
      defaultValue: 0
    },
    'Calcium': {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      validate: {
        min: 0
      },
      defaultValue: 0
    },
    'Iron': {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      validate: {
        min: 0
      },
      defaultValue: 0
    },
    'Category': { 
      type: DataTypes.STRING, 
      defaultValue: "None",
      validate: {
        len: [1,255]
      }
    }
  });

 return Nutrition;
};