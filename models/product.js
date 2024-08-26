'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: "sellerId",
        as: "seller"
      })
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        sellerId: undefined
      }
    }
  }
  Product.init({
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
            notEmpty: {
              msg: "Cannot be empty"
            }
        }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
        validate: {
            notEmpty: {
              msg: "Cannot be empty"
            }
        }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
        validate: {
            notEmpty: {
              msg: "Cannot be empty"
            }
        }
    },
  }, {
    sequelize,
    timestamps: true,
    tableName: "products",
    modelName: 'Product',
  });
  return Product;
};