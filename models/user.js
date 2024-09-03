'use strict';
const {
  Model
} = require('sequelize');
const { HashPass } = require('../security/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product }) {
      this.hasMany(Product, {
        foreignKey: "sellerId",
        as: "products"
      })
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        password: undefined
      }
    }
  }
  User.init({
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
              msg: "Username cannot be null"
            },
            notEmpty: {
              msg: "Username cannot be empty"
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
              msg: "Email cannot be null"
            },
            notEmpty: {
              msg: "Email cannot be empty"
            },
            isEmail: {
              msg: "Invalid Email format"
            }
        }
    },
    role: {
        type: DataTypes.ENUM("customer", "seller"),
        allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
              msg: "Password cannot be null"
            },
            notEmpty: {
              msg: "Password cannot be empty"
            }
        }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
          notNull: {
            msg: "Password cannot be null"
          },
          notEmpty: {
            msg: "Password cannot be empty"
          }
      }
    }
  }, {
    sequelize,
    timestamps: true,
    tableName: "users",
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
          user.password = await HashPass(user.password);
      }
    }
  });
  return User;
};