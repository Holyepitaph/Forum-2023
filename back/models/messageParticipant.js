const { Model, DataTypes, NOW } = require('sequelize')

const { sequelize } = require('../util/db')

class MessageParticipants extends Model {}

MessageParticipants.init({
  messageBoardId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'messageBoards', key: 'id' },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'messageParticipants'
})

module.exports = MessageParticipants