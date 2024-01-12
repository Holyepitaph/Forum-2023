const express = require('express')
const app = express()
const cors = require('cors')
const { connectToDatabase } = require('./util/db')
const { PORT } = require('./util/config')
const cookieParser = require("cookie-parser")
const fileupload = require('express-fileupload')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const forumRouter = require('./controllers/forums')
const postRouter = require('./controllers/posts')
const friendRouter = require('./controllers/friends')
const messageRouter = require('./controllers/message')
const commentRouter = require('./controllers/comments')

app.use(
  fileupload({
      createParentPath: true,
  }),
);
const imageRouter = require('./controllers/image')

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.static('dist'))

app.use('/images', express.static('controllers/uploads'))
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/forum', forumRouter)
app.use('/api/post', postRouter)
app.use('/api/friend', friendRouter)
app.use('/api/message', messageRouter)
app.use('/api/comment', commentRouter)
app.use('/api/image', imageRouter)
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});


    const start = async () =>{
      await connectToDatabase()
      app.listen(PORT, () =>{
        console.log(`Server running on port ${PORT}`)
      })
    }
    
    start()