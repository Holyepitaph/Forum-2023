import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import messageServices from '../../services/message'

const InputMessage = ({id, update}) =>{
    const [text, setText] = useState('')

    const sendIt = async (e) =>{
        e.preventDefault()
        await messageServices.newMessage({text:text, userId: id})
        setText('')
        update()
    }

    return(
        <div>
            <form onSubmit={sendIt}>
                <div>
                    <span>New Message: </span>
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

export const UserMessageSingle = ({userUpdate,user}) =>{
    const [messages, setMessages] = useState('')
    const id = useParams().messageId
    let messageList
    let otherUser
    let otherUserId
    const messageCheck = async () =>{
        const response = await messageServices.get()
        return setMessages(response)
    }

    useEffect(()=>{
        userUpdate()
        messageCheck()
    },[])

    if(!messages){
        return(
            <div>
                <div>Loading...</div>
            </div>
        )
    } else{
        messageList = messages.filter(x=>x.id == id)
        otherUser = messageList.map(x=>x.users.filter(x=>x.id != user))
        otherUserId = otherUser[0][0].id 
        console.log(messageList)
    }
    return(
        <div>
            {messageList.map(x=>(
                <div key={x.id}>
                    {x.messages.map(x=>(
                        <div key={x.id}>
                            <div>Message: {x.text}</div>
                            <div>{x.created}</div>
                            <div>User Id: {x.userId}</div>
                            <br/>
                        </div>
                    ))}
                </div>
            ))}
            <InputMessage id={otherUserId} update={()=>messageCheck()}/>
        </div>

    )
}