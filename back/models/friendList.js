const { Model, DataTypes, NOW } = require('sequelize')

const { sequelize } = require('../util/db')

class FriendList extends Model {}

FriendList.init({
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: { model: 'users', key: 'id' },
  },
  friendId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'friendList'
})

module.exports = FriendList