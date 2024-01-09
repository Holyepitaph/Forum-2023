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

const DeleteRelationship = ({id, update}) =>{

    const deleteRel = async () =>{
        await friendServices.deleteFriend({userId: id})
        update()
    }

    return(
        <>
            <button onClick={()=>deleteRel()}>Remove Friend</button>
        </>
    )
}

const RelationshipLogic = ({id,update}) =>{
    

    return(
        <div>
            <FriendUser id={id} update={()=>update()}/>
            <BlockUser id={id}  update={()=>update()}/>
            <DeleteRelationship id={id}  update={()=>update()}/>
        </div>
    )
}

const InputMessage = ({id, update}) =>{
    const [text, setText] = useState('')
    const navigate = useNavigate()

    const sendIt = async (e) =>{
        e.preventDefault()
        const newMessage = await messageServices.newMessage({text:text, userId: id})
        console.log(newMessage)
        setText('')
        navigate(`/admin/Messages/${newMessage.messageBoardId}`)
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

export const AdminUserSingle = ({userUpdate, user}) =>{
const [users, setUser] = useState('')
const id = useParams().userId
let singleUser

    useEffect(()=>{
        const userCheck = async () =>{
            const response = await userServices.getAll()
            return setUser(response)
        }
        userUpdate()
        userCheck()
    },[])

    if(!users){
        return(
            <div>
                <div>Loading...</div>
            </div>
        )
    } else{
        singleUser = users.filter(x=>x.id == id)
    }
    return(
        <div>
            {singleUser.map(x=>(
                <div key={x.id}>
                    {x.id != user ? <InputMessage id={x.id}/> : null}
                    <RelationshipLogic id={x.id} update={()=>userUpdate()}/>
                    <div>Admin Status: {x.admin}</div>
                    <div>Created Date: {x.created}</div>
                    <div>Email: {x.email}</div>
                    <div>Image: {x.image}</div>
                    <div>Name: {x.name}</div>
                    <div>Phone Number: {x.phone}</div>
                    <div>Private Status: {x.private}</div>
                    <div>Username: {x.username}</div>
                    <div>Total Messages: {x.messages.length}</div>
                    <div>Total Message Boards: {x.messageBoards.length}</div>
                    <br/>
                    <div>Forums: </div>
                    {x.forums.map(x=>(
                        <Link to={`/admin/Forum/${x.id}`} key={x.id}>
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