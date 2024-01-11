const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()

const {User, FriendList} = require('../models')
const {tokenExtractor} = require('../util/middleware')

//create new post that 
//accepts status/ userId for secondUserId

router.post('/',tokenExtractor, async (req, res) => {
  try{
    const user = await User.findByPk(req.decodedToken.id)
    const secondUser = await User.findByPk(req.body.userId)
    const newFollower = await FriendList.create({status:req.body.status,userId: user.id,friendId: secondUser.id})
    res.json(newFollower)
  }catch(error) {
        return res.status(400).json({ error })
      }  

})

router.post('/check',tokenExtractor, async (req, res) => {
  try{
    const user = await User.findByPk(req.decodedToken.id)
    const secondUser = await User.findByPk(req.body.userId)
    let checkList = []
    const firstCheck = await FriendList.findAll({where:{
      userId: user.id,
      friendId: secondUser.id
    }})
    const secondCheck = await FriendList.findAll({where:{
      userId: secondUser.id,
      friendId: user.id
    }})
    if(firstCheck){
      checkList.push(...firstCheck)
    }
    if(secondCheck){
      checkList.push(...secondCheck)
    }
    res.json(checkList)
  }catch(error) {
        return res.status(400).json({ error })
      }  

})

router.delete('/',tokenExtractor, async (req, res) => {
  try{
    const user = await User.findByPk(req.decodedToken.id)
    const secondUser = await User.findByPk(req.body.userId)
    const newFollower = await FriendList.findOne({where:{userId: user.id,friendId: secondUser.id}})
    const secondFollower = await FriendList.findOne({where:{userId: secondUser.id,friendId: user.id}})
    if(secondFollower){
      await secondFollower.destroy()
    }
    await newFollower.destroy()
    return res.status(204).end()
  }catch(error) {
        return res.status(400).json({ error })
      }  
})

module.exports = router 