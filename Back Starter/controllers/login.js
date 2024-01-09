const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const { tokenExtractor, isAdmin } = require('../util/middleware')

const { SECRET } = require('../util/config')
const User = require('../models/user')

router.post('/', async (req, res) => {
try{  const body = req.body

  const user = await User.findOne({ 
    where: { 
      username: body.username
    }
  })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username, 
    id: user.id,
  }
  
  if (user.disabled) {
    return res.status(401).json({
      error: 'account disabled, please contact admin'
    })
  }

  const token = jwt.sign(userForToken, SECRET,{expiresIn:"10min"})

  res
    .status(200)
    .cookie("token", token, { httpOnly: true })
    .send({username: user.username, name: user.name, admin: user.admin })
}catch{
  res.status(400).send("Error has occured")
}
})

router.get('/check', async (req, res) => {
  const tokenCheck = req.cookies.token
  if(tokenCheck){
    try{
      const decoded = jwt.verify(tokenCheck,SECRET)
      req.decodedToken = decoded
    } catch{
      res.clearCookie("token")
      return res.status(200).send("Removed Token")
    }   
  } else{
    return res.status(200).send("Not Logged In")
  }
  
  
  const user = await User.findOne({ 
    where: { 
      username: req.decodedToken.username
    }
  })

  const userForToken = {
    username: user.username, 
    id: user.id,
  }
  
  if (user.disabled) {
    return res.status(401).json({
      error: 'account disabled, please contact admin'
    })
  }

  const token = jwt.sign(userForToken, SECRET,{expiresIn:"10min"})

  res
    .status(200)
    .cookie("token", token, { httpOnly: true, secure:true })
    .send("Authorized")

})

router.post('/logout',tokenExtractor, async (req, res) => {

  res
    .status(200)
    .clearCookie("token")
    .send("Successfully Logged Out")

})

module.exports = router 