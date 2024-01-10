const jwt = require('jsonwebtoken')
const { SECRET } = require('./config.js')
const { User} = require('../models')

const tokenExtractor = (req, res, next) => {
  const token = req.cookies.token
  if(token){
    try{
      const decoded = jwt.verify(token,SECRET)
      req.decodedToken = decoded
    } catch{
      res.clearCookie("token")
      return res.status(400).send("Unauthorized Access")
    }   
  } else{
    return res.status(400).send("Unauthorized Access")
  }
  next()
}

const isAdmin = async (req, res, next) => {
  try{
    const user = await User.findByPk(req.decodedToken.id)
    if (!user.admin ) {
      return res.status(401).json({ error: 'operation not permitted' })
    }
  }catch(error){
    return res.status(401).json({ error: 'operation not permitted' })
  }
  next()
}

module.exports = { tokenExtractor, isAdmin }