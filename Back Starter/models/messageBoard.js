const { Model, DataTypes, NOW } = require('sequelize')

const { sequelize } = require('../util/db')

class MessageBoard extends Model {}

MessageBoard.init({
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'messageBoard'
})

module.exports = MessageBoard