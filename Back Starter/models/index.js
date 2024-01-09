const User = require('./user')
const Forum = require('./forum')
const Post = require('./post')
const Comment = require('./comment')
const FriendList = require('./friendList')
const SubComment = require('./subComment')
const Message = require('./message')
const MessageBoard = require('./messageBoard')
const MessageParticipants = require('./messageParticipant')

const { sequelize } = require('../util/db')

User.hasMany(Forum)
Forum.belongsTo(User)

User.belongsToMany(User,{through:FriendList, as: "friends"})

MessageBoard.hasMany(Message)
Message.belongsTo(MessageBoard)

User.hasMany(Message)
Message.belongsTo(User)

User.belongsToMany(MessageBoard,{through: MessageParticipants})
MessageBoard.belongsToMany(User,{through: MessageParticipants})

User.hasMany(Post)
Post.belongsTo(User)

Forum.hasMany(Post)
Post.belongsTo(Forum)

User.hasMany(Comment)
Comment.belongsTo(User)

Post.hasMany(Comment)
Comment.belongsTo(Post)

Comment.belongsToMany(Comment,{through:SubComment, as: 'Sub'})


sequelize.sync()

module.exports = {
    User,
    Forum,
    Post,
    Comment,
    FriendList,
    SubComment,
    Message,
    MessageBoard,
    MessageParticipants
}