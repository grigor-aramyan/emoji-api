'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Giftbox extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Giftbox.hasMany(models.Item, {
        foreignKey: 'giftbox_id',
        as: 'items',
      });
      Giftbox.hasMany(models.LineItem, {
        foreignKey: 'giftbox_id',
        as: 'line_items',
      });
    }
  };
  Giftbox.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    size: DataTypes.STRING,
    gend: DataTypes.STRING,
    price: DataTypes.STRING,
    img: DataTypes.STRING,
    item: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Giftbox',
  });
  return Giftbox;
};