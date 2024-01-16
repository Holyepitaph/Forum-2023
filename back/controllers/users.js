const bcrypt = require('bcrypt')
const router = require('express').Router()

const {User, Message, MessageBoard, Forum} = require('../models')
const { tokenExtractor, isAdmin } = require('../util/middleware')
const saltRounds = 11

// **Production for admin only with token check**
router.get('/',tokenExtractor, async (req, res) =>{
  const user = await User.findByPk(req.decodedToken.id,{include:[Message, MessageBoard,"friends",Forum],
  attributes:{ exclude:["passwordHash","created"]}})  
  res.json(user)
})

router.get('/all',tokenExtractor, async (req, res) =>{
  const user = await User.findByPk(req.decodedToken.id,{include:[Message, MessageBoard,"friends",Forum]})  
  if(user.admin){
    const userInfo = await User.findAll({include:[Message, MessageBoard,"friends",Forum]})
    return res.json(userInfo)
  } else{
    const userInfo = await User.findAll({where:{private:false},include:[Message, MessageBoard,"friends",Forum]})
    return res.json(userInfo)
  }
})

router.post('/one',tokenExtractor, async (req, res) =>{
  const userCheck = await User.findByPk(req.body.id,{attributes:{
    exclude:["admin",'created','email','id','image','name','passwordHash','phone','private']}})  
  res.json(userCheck)
})

// Creates new Users with password encrypt
router.post('/', async (req, res) =>{
    try {
        const {username, name, password} = req.body
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const newUser ={
          username,
          name,
          passwordHash
        }
        const user = await User.create(newUser)
        res.json(user)
      } catch(error) {
        return res.status(400).json({ error })
      }   
})

//If admin Changes username admin status 
//If user Changes email / Phone / Pass
router.put('/:username', tokenExtractor, async (req, res) => {
  const user = await User.findOne({ 
    where: { 
      username: req.params.username
    }
  })
  const adminCheck = await User.findByPk(req.decodedToken.id)
  if (user) {
    if (!adminCheck.admin) {
      if(req.decodedToken.id == user.id){
        user.email = req.body.email ? req.body.email : user.email
        user.phone = req.body.phone ? req.body.phone : user.phone
        user.image = req.body.phonimagee ? req.body.image : user.image
        if(req.body.private === false){
        user.private = false
        }if (req.body.private === true){
       user.private = true
        }
        if(req.body.password){
          const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
          user.passwordHash = passwordHash
        }
        await user.save()
        res.json(user)
      } else{
        return res.status(401).json({ error: 'operation not permitted' })
      }
    } else if( adminCheck.admin){
      if(req.body.admin === false){user.admin = false
        }if (req.body.admin === true){user.admin = true
        }
      user.email = req.body.email ? req.body.email : user.email
      user.phone = req.body.phone ? req.body.phone : user.phone
      user.image = req.body.image ? req.body.image : user.image
      if(req.body.private === false){
        user.private = false
        }if (req.body.private === true){
       user.private = true
        }      if(req.body.password){
        const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
        user.passwordHash = passwordHash
      }
      await user.save()
      res.json(user)
    }

  } else {
    res.status(404).end()
  }
})

//Deletes if user is an admin or is the same user as being deleted
router.delete('/:username', tokenExtractor, async (req, res) => {
const user = await User.findByPk(req.decodedToken.id)
if (req.params.username.toLowerCase() == user.username.toLowerCase() || user.admin) {
    const byebye = await User.findOne({ 
      where: { 
        username: req.params.username
      }
    })
    await byebye.destroy()
    return res.status(204).end()
  } else{
    return res.status(401).json({ error: 'operation not permitted' })
  }
})

module.exports = router