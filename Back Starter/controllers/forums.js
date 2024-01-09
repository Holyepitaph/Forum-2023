const router = require('express').Router()

const {User,Forum,Post} = require('../models')
const { tokenExtractor, isAdmin } = require('../util/middleware')

// **Production for admin only with token check**
router.get('/',async (req, res) =>{

    const forumAll = await Forum.findAll({ 
        include: [
          {
            model: Post
          }
        ]
      })

    return res.json(forumAll)


})

// Creates new Forum Post if user
router.post('/',tokenExtractor, async (req, res) =>{
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const newForum = {
            text: req.body.text,
            image: req.body.image
        }
        const sentForum = await Forum.create({...newForum, userId: user.id})
        res.json(sentForum)
      } catch(error) {
        return res.status(400).json({ error })
      }   
})

// Change inactive until I know what I want to do here

//If admin Changes username admin status 
//If user Changes email / Phone / Pass
router.put('/', tokenExtractor, async (req, res) => {
  try{const user = await User.findByPk(req.decodedToken.id)
  const checkForum = await Forum.findByPk(req.body.id)
  if(user.admin){
    checkForum.text = req.body.text ? req.body.text : checkForum.text
    checkForum.image = req.body.image ? req.body.image : checkForum.image
    await checkForum.save()
    return res.json(checkForum)
  }else if(user.admin === false && checkForum.userId == user.id){
    checkForum.text = req.body.text ? req.body.text : checkForum.text
    checkForum.image = req.body.image ? req.body.image : checkForum.image
    await checkForum.save()
    return res.json(checkForum)
  } else{
    return res.status(401).json({ error: 'operation not permitted' })
  }
}catch(error) {
    return res.status(400).json(error)
  }   
})

//Deletes if user is an admin or is the same user as being deleted
router.delete('/', tokenExtractor, async (req, res) => {
  try{const user = await User.findByPk(req.decodedToken.id)
    const checkForum = await Forum.findByPk(req.body.id)
    if(user.admin){
      await checkForum.destroy()
      return res.status(204).end()
    }else if(user.admin === false && checkForum.userId == user.id){
      await checkForum.destroy()
      return res.status(204).end()
    } else{
      return res.status(401).json({ error: 'operation not permitted' })
    }
  }catch(error) {
    return res.status(400).json(error)
  }
})

module.exports = router