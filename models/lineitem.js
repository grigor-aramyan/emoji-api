'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LineItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LineItem.belongsTo(models.Order, {
        foreignKey: 'order_id',
        as: 'order',
      });
      LineItem.belongsTo(models.Giftbox, {
        foreignKey: 'giftbox_id',
        as: 'giftbox',
      });
    }
  };
  LineItem.init({
    order_id: DataTypes.INTEGER,
    giftbox_id: DataTypes.INTEGER,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LineItem',
  });
  return LineItem;
};