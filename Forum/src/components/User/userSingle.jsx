import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import userServices from '../../services/user'
import messageServices from '../../services/message'

const FriendUser = () =>{
    return(
        <div>
            <div>Friend</div>
        </div>
    )
}

const BlockUser = () =>{
    return(
        <div>
            <div>Friend</div>
        </div>
    )
}

const DeleteRelationship = () =>{
    return(
        <div>
            <div>Friend</div>
        </div>
    )
}

const RelationshipLogic = () =>{
    return(
        <div>
            <div>Logic Player</div>
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
        console.log(singleUser.map(x=>x.friends.filter(x=>x.id == user)))

    return(
        <div>
            {singleUser.map(x=>(
                <div key={x.id}>
                    {x.id != user ? <InputMessage id={x.id}/> : null}
                    <RelationshipLogic />
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