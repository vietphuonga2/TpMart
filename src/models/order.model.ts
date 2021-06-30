import { IS_ACTIVE, USER_STATUS, IS_READ } from '@commons/constant';
import { Sequelize } from 'sequelize';

module.exports = function (sequelize, DataTypes) {
  const Order = sequelize.define(
    'Order',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      code: { type: DataTypes.STRING },
      user_id: { type: DataTypes.INTEGER },
      count_item: { type: DataTypes.INTEGER },
      total_money: { type: DataTypes.INTEGER },
      status: { type: DataTypes.INTEGER },
      price: { type: DataTypes.INTEGER },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      receive_address: {
        allowNull: false,
        type: DataTypes.JSON,
      },
      create_by: DataTypes.INTEGER,
      update_by: DataTypes.INTEGER,    
      is_active: {
        allowNull: false,
        type: DataTypes.INTEGER,
        values: Object.values(IS_READ),
        defaultValue: IS_READ.ACTIVE,
        validate: {
          isIn: {
            args: [Object.values(IS_READ)],
            msg: 'Invalid status.',
          },
        },
      },
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
    },
    {
      // indexes: [{ unique: true, fields: ["enterprise_id", "code"] }],
      createdAt: false,
      updatedAt: false,
      deletedAt: false,
      paranoid: false,
      timestamps: false,
      freezeTableName: true,
      tableName: 'order',
      version: true,
      hooks: {},
    },
  );

  Order.associate = (db) => {
    db.Order.belongsTo(db.User, { foreignKey: { name: 'user_id' } });
    db.Order.hasMany(db.OrderItem, { foreignKey: { name: 'order_id' } });
  };
  return Order;
};
