require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 3003,
  DB: process.env.DB,
  LOGINA: process.env.LOGINA,
  PASSWORD: process.env.PASSWORD,
  HOST: process.env.HOST,
  SECRET:process.env.SECRETB
}
