const { Model, DataTypes, NOW } = require('sequelize')

const { sequelize } = require('../util/db')

class SubComment extends Model {}

SubComment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  commentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'comments', key: 'id' }
  },
  subId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'comments', key: 'id' }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'subComment'
})

module.exports = SubComment