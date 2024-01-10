const router = require('express').Router()

const {User,Forum,Post,Comment, SubComment} = require('../models')
const { tokenExtractor, isAdmin } = require('../util/middleware')

// **Production for admin only with token check**
router.get('/',async (req, res) =>{

    const forumAll = await Comment.findAll({ 
        include: [Post, "Sub"
        ]
      })

    return res.json(forumAll)


})

// Creates new Forum Post if user
router.post('/',tokenExtractor, async (req, res) =>{
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const newComment = {
            text: req.body.text,
            link: req.body.link,
            image: req.body.image
        }
        const post = await Post.findByPk(req.body.postId)
        const sentForum = await Comment.create({...newComment, userId: user.id,postId:post.id})
        res.json(sentForum)
      } catch(error) {
        return res.status(400).json({ error })
      }   
})

router.post('/:commentId',tokenExtractor, async (req, res) =>{
  try {
      const user = await User.findByPk(req.decodedToken.id)
      const newComment = {
          text: req.body.text,
          link: req.body.link,
          image: req.body.image,
      }
      const sentForum = await Comment.create({...newComment, userId: user.id})
      await SubComment.create({commentId:req.params.commentId,subId:sentForum.id})
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
  const checkComment = await Comment.findByPk(req.body.id)
  if(user.admin){
    checkComment.text = req.body.text ? req.body.text : checkComment.text
    checkComment.link = req.body.link ? req.body.link : checkComment.link
    checkComment.image = req.body.image ? req.body.image : checkComment.image
    await checkComment.save()
    return res.json(checkComment)
  }else if(user.admin === false && checkComment.userId == user.id){
    checkComment.text = req.body.text ? req.body.text : checkComment.text
    checkComment.link = req.body.link ? req.body.link : checkComment.link
    checkComment.image = req.body.image ? req.body.image : checkComment.image
    await checkComment.save()
    return res.json(checkComment)
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
    const checkComment = await Comment.findByPk(req.body.id)
    if(user.admin){
      await checkComment.destroy()
      return res.status(204).end()
    }else if(user.admin === false && checkComment.userId == user.id){
      await checkComment.destroy()
      return res.status(204).end()
    } else{
      return res.status(401).json({ error: 'operation not permitted' })
    }
  }catch(error) {
    return res.status(400).json(error)
  }
})

module.exports = router