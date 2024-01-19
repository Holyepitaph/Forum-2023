import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import messageServices from '../../services/message'
import userServices from '../../services/user'

import {MessageSingleTheme} from '../../theme'

const IdToUserName = ({info}) =>{
    const [name,setName] = useState('')
    
    const nameCheck =async (info) =>{
        const test = await userServices.getOne({id:info})
        console.log(test.username)
        return setName(test.username)
    }
    nameCheck(info)
    return(
        <>
            <span>{name}</span>
        </>
    )
}


const InputMessage = ({id, update}) =>{
    const [text, setText] = useState('')

    const sendIt = async (e) =>{
        e.preventDefault()
        await messageServices.newMessage({text:text, userId: id})
        setText('')
        update()
    }

    return(
        <div className={MessageSingleTheme.InputMessage.main}>
            <form onSubmit={sendIt} className={MessageSingleTheme.InputMessage.form}>
                <input
                type="text"
                className={MessageSingleTheme.InputMessage.input}
                value={text}
                onChange={({target})=>setText(target.value)}
                />
                <button className={MessageSingleTheme.InputMessage.button}>Send</button>
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
    }
    return(
        <div>
            {messageList.map(x=>(
                <div key={x.id} className={MessageSingleTheme.MessageSingle.main}>
                    <div className={MessageSingleTheme.MessageSingle.title}><IdToUserName info={otherUserId}/></div>
                    {x.messages.map(x=>{
                      return x.userId != otherUserId ? 
                      //Self
                        <div key={x.id} className={MessageSingleTheme.MessageSingle.self.main}>
                            <div className={MessageSingleTheme.MessageSingle.self.space}></div>
                            <div className={MessageSingleTheme.MessageSingle.self.card}>
                            <div className={MessageSingleTheme.MessageSingle.self.text}>{x.text}</div>
                                <div className={MessageSingleTheme.MessageSingle.self.info}>
                                    <div className="">{x.created}</div>
                                    <div><IdToUserName info={x.userId}/></div>
                                </div>
                            </div>
                        </div> 
                        :
                        //Other User
                        <div key={x.id} className={MessageSingleTheme.MessageSingle.other.main}>                            
                            <div className={MessageSingleTheme.MessageSingle.other.card}>
                                <div className={MessageSingleTheme.MessageSingle.other.text}>{x.text}</div>
                                <div className={MessageSingleTheme.MessageSingle.other.info}>
                                    <div><IdToUserName info={x.userId}/></div>
                                    <div>{x.created}</div>
                                </div>
                            </div>
                            <div></div>
                        </div> 
                    }

                    )}
                </div>
            ))}
            <InputMessage id={otherUserId} update={()=>messageCheck()}/>
        </div>
    )
}