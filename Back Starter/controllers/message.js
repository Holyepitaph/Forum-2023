const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()

const {User, Message, MessageBoard, MessageParticipants} = require('../models')
const {tokenExtractor} = require('../util/middleware')

//Returns a list of MessageBoards using cookie token to filter whom is shown
router.get('/',tokenExtractor, async (req, res) =>{
      const findBoards = await MessageParticipants.findAll({where:{userId: req.decodedToken.id}})
      const participantArray = findBoards.map(x=>x.messageBoardId)
      const allText = await MessageBoard.findAll({where:{id: participantArray},include:[Message,User]})
      return res.json(allText)  
  
 
  })

// //Get a list of all current texts between current user and Selected User.
router.get('/all',tokenExtractor, async (req, res) =>{
  const allText = await MessageBoard.findAll({include:[Message,User]})
  return res.json(allText)  
})


//Creates a new Message Board and adds 
//Two users as participants to the message board
//Finally Sends the message to the board
// router.post('/',tokenExtractor, async (req, res) => {
//   try{
//       const user = await User.findByPk(req.decodedToken.id)
//       const secondUser = await User.findByPk(req.body.userId)
//       const newBoard = await MessageBoard.create({})
//       await MessageParticipants.create({messageBoardId:newBoard.dataValues.id, userId:user.id})
//       await MessageParticipants.create({messageBoardId:newBoard.dataValues.id, userId:secondUser.id})
//       const sendMessage = await Message.create({text:req.body.text, userId:user.id, messageBoardId: newBoard.dataValues.id})
//       return res.json(sendMessage)
//   }catch(error) {
//         return res.status(400).json({ error })
//       }  

// })


router.post('/',tokenExtractor, async (req, res) => {
  try{
      const user = await User.findByPk(req.decodedToken.id)
      const secondUser = await User.findByPk(req.body.userId)
      const setupId = [user.id, secondUser.id]
      console.log(setupId)
      const allBoards = await MessageBoard.findAll({include:{
        model:User,
        where:{
          id:setupId
        }
      }})
      console.log(allBoards)
      const answer = allBoards.filter(x=>x.users.length > 1)
      //return answer.id
      console.log(answer)
      if(answer.length == 0){
        console.log("newBoard")
        const newBoard = await MessageBoard.create({})
        await MessageParticipants.create({messageBoardId:newBoard.dataValues.id, userId:user.id})
        await MessageParticipants.create({messageBoardId:newBoard.dataValues.id, userId:secondUser.id})
        const sendMessage = await Message.create({text:req.body.text, userId:user.id, messageBoardId: newBoard.dataValues.id})
        return res.json(sendMessage)
      } else{
        console.log("newMessage")
        const confirmation = await MessageParticipants.findOne({where:{messageBoardId:answer[0].id,userId:user.id}})
        if(confirmation){
          const sendMessage = await Message.create({text:req.body.text, userId:user.id, messageBoardId: answer[0].id})
          return res.json(sendMessage)
        }else{
          return res.status(401).json({ error: 'operation not permitted' })
        }
      }

      return res.json(answer)
  }catch(error) {
        return res.status(400).json({ error })
      }  

})



// //Remove selected message if token User matches
// router.delete('/',tokenExtractor, async (req, res) => {
//   try{
//     const byebye = await Message.findByPk(req.body.messageId)
//     await byebye.destroy()
//     return res.status(204).end()
//   }catch(error) {
//         return res.status(400).json({ error })
//       }  
// })



module.exports = router 