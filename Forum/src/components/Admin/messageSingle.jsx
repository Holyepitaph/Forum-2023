import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import messageServices from '../../services/message'
import userServices from '../../services/user'


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
        <div className="bg-backA dark:bg-back mt-4 text-textA dark:text-text">
            <form onSubmit={sendIt} className="flex gap-4 p-4">
                <input
                type="text"
                className="w-full bg-mainA dark:bg-text pl-4 dark:text-black"
                value={text}
                onChange={({target})=>setText(target.value)}
                />
                <button className="bg-cardA dark:bg-card dark:rounded-none py-[.05rem]">Send</button>
            </form>
        </div>
    )
}

export const AdminMessageSingle = ({userUpdate, user}) =>{
    const [messages, setMessages] = useState('')
    const id = useParams().messageId
    let messageList
    let otherUser
    let otherUserId
    const messageCheck = async () =>{
        const response = await messageServices.getAll()
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
                <div key={x.id} className="bg-backA dark:bg-back mt-4 p-4 flex flex-col gap-4 text-textA dark:text-text">
                    <div className="bg-cardA dark:bg-card mx-2 p-2"><IdToUserName info={otherUserId}/></div>
                    {x.messages.map(x=>{
                      return x.userId != otherUserId ? 
                      //Self
                        <div key={x.id} className="grid grid-cols-4 mx-2">
                            <div className="sm:col-span-2"></div>
                            <div className="col-span-3 sm:col-span-2 bg-cardA dark:bg-card  rounded-tr-[2rem] rounded-bl-[2rem]">
                            <div className="bg-mainA dark:bg-text text-black rounded-tr-[2rem] rounded-bl-[.5rem] p-1 m-2">{x.text}</div>
                                <div className="flex gap-4 justify-between pl-6 pr-2 text-[.7rem]">
                                    <div className="">{x.created}</div>
                                    <div><IdToUserName info={x.userId}/></div>
                                </div>
                            </div>
                        </div> 
                        :
                        //Other User
                        <div key={x.id} className="grid grid-cols-4 mx-2">                            
                            <div className="col-span-3 sm:col-span-2 bg-cardA dark:bg-card  rounded-tl-[2rem] rounded-br-[2rem]">
                                <div className="bg-mainA dark:bg-text text-black rounded-tl-[2rem] rounded-br-[.5rem] p-1 m-2">{x.text}</div>
                                <div className="flex gap-4 justify-between pl-2 pr-6 text-[.6rem]">
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