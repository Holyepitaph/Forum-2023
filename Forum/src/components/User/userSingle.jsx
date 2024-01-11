import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import userServices from '../../services/user'
import messageServices from '../../services/message'
import friendServices from '../../services/friend'

const FriendUser = ({id,update}) =>{
    const addFriend = async () =>{
        console.log(id)
        await friendServices.newFriend({userId: id})
        update()
    }
    return(
        <>
            <button onClick={()=>addFriend()}>Friend Request</button>
        </>
    )
}

const BlockUser = ({id, update}) =>{
    const blockUser = async () =>{
        await friendServices.blockUser({userId: id})
        update()
    }
    return(
        <>
            <button onClick={()=>blockUser()}>Block User</button>
        </>
    )
}

const DeleteRelationship = ({id, update, special}) =>{
    const deleteRel = async () =>{
        await friendServices.deleteFriend({userId: id})
        update()
    }    
    if(special){
        return(
        <>
            <button onClick={()=>deleteRel()}>Unblock User</button>
        </>
        )
    }
    return(
        <>
            <button onClick={()=>deleteRel()}>Remove Friend</button>
        </>
    )
}

const RelationshipLogic = ({id,update, status, user}) =>{
    console.log(status)
    if(id == user){
        return(
            <div></div>
        )
    }
    else if(status.length == 0 ){
        console.log("No relationship")
        return(
            <div>
                <FriendUser id={id} update={()=>update()}/>
                <BlockUser id={id}  update={()=>update()}/>
            </div>
        )
    } else if( status.length < 2){
        if(status[0].status == "friend"){
            console.log('Check who sent friend request')
            if(status[0].userId == user){
                console.log("current user sent friend request to viewed user")
                return(
                    <div>
                        <DeleteRelationship id={id}  update={()=>update()}/>
                    </div>
                )
            } else {
                console.log('Viewed user sent friend request to viewed user')
                return(
                    <div>
                        <FriendUser id={id} update={()=>update()}/>
                        <BlockUser id={id}  update={()=>update()}/>
                        <DeleteRelationship id={id}  update={()=>update()}/>
                    </div>
                )
            }
        } else{
            console.log('Check who blocked who')
            if(status[0].userId == user){
                console.log("current user sent blocked viewed user")
                return(
                    <div>
                        <DeleteRelationship id={id}  update={()=>update()} special={1}/>
                    </div>
                )
            } else {
                console.log('current user blocked by viewed user')
                return(
                    <div>
                        <div>This should not be visible</div>
                    </div>
                )
            }
        }
    } else if(status.length == 2){
        console.log('Both users accepted friend requests')
        return(
            <div>
                <BlockUser id={id}  update={()=>update()}/>
                <DeleteRelationship id={id}  update={()=>update()}/>
            </div>
        )
}
        }

const InputMessage = ({id, update}) =>{
    const [text, setText] = useState('')
    const navigate = useNavigate()

    const sendIt = async (e) =>{
        e.preventDefault()
        const newMessage = await messageServices.newMessage({text:text, userId: id})
        console.log(newMessage)
        setText('')
        navigate(`/user/Messages/${newMessage.messageBoardId}`)
    }

    return(
        <div>
            <form onSubmit={sendIt}>
                <div>
                    <span>Message Details: </span>
                    <input
                    type="text"
                    value={text}
                    onChange={({target})=>setText(target.value)}
                    />
                </div>
                <button>Send Message</button>
            </form>
        </div>
    )
}

export const UserUserSingle = ({userUpdate, user}) =>{
const [users, setUser] = useState('')
const [friends, setFriends] = useState([])
const id = useParams().userId
let singleUser
const friendChecks = async () =>{
    const response = await friendServices.check({userId: id})
    return setFriends(response)
}
    useEffect(()=>{
        const userCheck = async () =>{
            const response = await userServices.getAll()
            return setUser(response)
        }
        userUpdate()
        userCheck()
        friendChecks()
    },[])

    const specialUpdate = () =>{
        friendChecks()
        userUpdate()
    }

    if(!users){
        return(
            <div>
                <div>Loading...</div>
            </div>
        )
    } else{
        singleUser = users.filter(x=>x.id == id)
    }
        console.log(singleUser.map(x=>x.friends.filter(x=>x.id == user)))

    return(
        <div>
            {singleUser.map(x=>(
                <div key={x.id}>
                    {x.id != user ? <InputMessage id={x.id}/> : null}
                    <RelationshipLogic id={x.id} update={()=>specialUpdate()} status={friends} user={user}/>
                    <div>Created Date: {x.created}</div>
                    <div>Email: {x.email}</div>
                    <div>Image: {x.image}</div>
                    <div>Name: {x.name}</div>
                    <div>Username: {x.username}</div>
                    <br/>
                    <div>Forums: </div>
                    {x.forums.map(x=>(
                        <Link to={`/user/Forum/${x.id}`} key={x.id}>
                            <div>Image: {x.image}</div>
                            <div>Created Date: {x.created}</div>
                            <div>Title: {x.text}</div>
                            <br/>
                        </Link>
                    ))}
                    {/*need to add friends */}

                </div>
            ))}
        </div>

    )
}