const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define id
    id: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    //define product_id
    product_id:{
      type: DataTypes.INTEGER,
      references: {
        model:'Product',
        key:'id',
      }
    },
    //define tag_id
    tag_id:{
      type: DataTypes.INTEGER,
      references: {
        model:'Tag',
        key:'id',
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
