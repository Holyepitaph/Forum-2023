const express = require('express')
const app = express()
const cors = require('cors')
const { connectToDatabase } = require('./util/db')
const { PORT } = require('./util/config')
const cookieParser = require("cookie-parser")

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const forumRouter = require('./controllers/forums')
const postRouter = require('./controllers/posts')
const friendRouter = require('./controllers/friends')
const messageRouter = require('./controllers/message')
const commentRouter = require('./controllers/comments')

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.static('dist'))

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/forum', forumRouter)
app.use('/api/post', postRouter)
app.use('/api/friend', friendRouter)
app.use('/api/message', messageRouter)
app.use('/api/comment', commentRouter)


    const start = async () =>{
      await connectToDatabase()
      app.listen(PORT, () =>{
        console.log(`Server running on port ${PORT}`)
      })
    }
    
    start()