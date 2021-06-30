import { IS_ACTIVE, USER_STATUS, IS_READ } from '@commons/constant';
import { Sequelize } from 'sequelize';
module.exports = function (sequelize, DataTypes) {
    const ReceiveAddress = sequelize.define(
      'ReceiveAddress',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        user_id: DataTypes.INTEGER ,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        df_ward_id: DataTypes.INTEGER,
        df_district_id: DataTypes.INTEGER,
        df_province_id: DataTypes.INTEGER,
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
        tableName: 'receive_address',
        version: true,
        hooks: {},
      },
    );
  
    ReceiveAddress.associate = (db) => {
      db.ReceiveAddress.belongsTo(db.User, {
        foreignKey: {
          name: 'product_id',
        },
      });
    };
  

    return ReceiveAddress;
  };
  