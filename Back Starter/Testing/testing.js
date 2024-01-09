require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

//This Setup was used to check connection to DB

const sequelize  = new Sequelize(process.env.DB, process.env.USERNAME,
    process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: "mysql",
        operationsAliases: false,
        pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
        }
    });

    const main = async () => {
        try {
          await sequelize.authenticate()
          console.log('Connection has been established successfully.')
          sequelize.close()
        } catch (error) {
          console.error('Unable to connect to the database:', error)
        }
      }

main()