const router = require('express').Router()

const {User,Forum, Post,Comment} = require('../models')
const { tokenExtractor, isAdmin } = require('../util/middleware')

// **Production for admin only with token check**
router.get('/',async (req, res) =>{

    const postAll = await Post.findAll({ 
        include: [{model: Comment,include:[{
          model:Comment, as: 'Sub'
        }]},{model:Forum}
        ]
      })

    return res.json(postAll)


})

// Creates new Forum Post if user
router.post('/',tokenExtractor, async (req, res) =>{
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const newPost = {
            text: req.body.text,
        }
        const forum = await Forum.findByPk(req.body.forumId)
        const sentPost = await Post.create({...newPost, userId: user.id,forumId: forum.id})
        res.json(sentPost)
      } catch(error) {
        return res.status(400).json({ error })
      }   
})

//Change inactive until I know what I want to do here

//If admin Changes username admin status 
//If user Changes email / Phone / Pass
router.put('/', tokenExtractor, async (req, res) => {
  try{const user = await User.findByPk(req.decodedToken.id)
    const checkPost = await Post.findByPk(req.body.postId)
    if(user.admin){
      checkPost.text = req.body.text ? req.body.text : checkPost.text
      await checkPost.save()
      return res.json(checkPost)
    }else if(user.admin === false && checkPost.userId == user.id){
      checkPost.text = req.body.text ? req.body.text : checkPost.text
      await checkPost.save()
      return res.json(checkPost)
    } else{
      return res.status(401).json({ error: 'operation not permitted' })
    }
  }catch(error) {
      return res.status(400).json(error)
    }   
})

//Deletes if user is an admin or is the same user as being deleted
router.delete('/', tokenExtractor,  async (req, res) => {
  try{const user = await User.findByPk(req.decodedToken.id)
    const checkPost = await Post.findByPk(req.body.postId)
    if(user.admin){
      await checkPost.destroy()
      return res.status(204).end()
    }else if(user.admin === false && checkPost.userId == user.id){
      await checkPost.destroy()
      return res.status(204).end()
    } else{
      return res.status(401).json({ error: 'operation not permitted' })
    }
  }catch(error) {
    return res.status(400).json(error)
  }
})

module.exports = router