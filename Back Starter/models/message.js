const { Model, DataTypes, NOW } = require('sequelize')

const { sequelize } = require('../util/db')

class Message extends Model {}

Message.init({
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text:{
    type: DataTypes.STRING,
    allowNull:false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique:false,
    references: { model: 'users', key: 'id' },
  },
  messageBoardId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'message_boards', key: 'id' }
  },
  created:{
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'message'
})

module.exports = Message