import { IS_ACTIVE, USER_STATUS, IS_READ } from '@commons/constant';
import { Sequelize } from 'sequelize';
module.exports = function (sequelize, DataTypes) {
    const Cart = sequelize.define(
      'Cart',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        user_id: DataTypes.INTEGER ,
        product_price_id: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        create_by: DataTypes.INTEGER,
        update_by: DataTypes.INTEGER,
        create_at: {
          type: DataTypes.DATE,
          allowNull: false,
          // defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        update_at: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        is_active: {
          allowNull: false,
          type: DataTypes.INTEGER,
          values: Object.values(IS_ACTIVE),
          defaultValue: IS_ACTIVE.ACTIVE,
          validate: {
            isIn: {
              args: [Object.values(IS_ACTIVE)],
              msg: 'Invalid status.',
            },
          },
        },
      },
      {
        // indexes: [{ unique: true, fields: ["phone_number"] }],
        paranoid: false,
        timestamps: false,
        freezeTableName: true,
        tableName: 'cart',
        version: true,
        hooks: {},
      },
    );
  
    Cart.associate = (db) => {
      db.Cart.belongsTo(db.User, {
        foreignKey: {
          name: 'user_id',
        },
      });
    };

    return Cart;
  };
  