const { Model, DataTypes, NOW } = require('sequelize')

const { sequelize } = require('../util/db')

class Image extends Model {}

Image.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'image'
})

module.exports = Image