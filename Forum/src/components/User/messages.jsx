import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import messageServices from '../../services/message'

const PersonalMessageLogic = ({info,user}) =>{
    const test = info.users.map(x=>x.id == user).filter(x=>x == true)
    if(test.length > 0 ){
        return(
        <Link to={`/user/Messages/${info.id}`} key={info.id}>
            <div>{info.users.filter(x=>x.id).map(x=>(
                <div key={x.id}>{x.username}</div>
            ))}</div>
            <br/>
        </Link>
        )
    }else{
        return(
            <></>
        )
    }
}

export const UserMessage = ({userUpdate, user}) =>{
    const [messages, setMessages] = useState('')
    
    useEffect(()=>{
        const messageCheck = async () =>{
            const response = await messageServices.get()
            return setMessages(response)
        }
        userUpdate()
        messageCheck()
    },[])

    if(!messages){
        return(
            <div>
                <div>Loading...</div>
            </div>
        )
    } else if(!user){
        return(
            <div>
                <div>Loading</div>
            </div>
        )
    } 
    return(
        <div>
            <div className="text-textA dark:text-text">
                <div className="bg-backA dark:bg-back flex flex-col gap-4 py-4 mt-4 px-4 w-full">
                    <div className="bg-cardAltA dark:bg-cardAlt rounded-xl dark:rounded-none">Messages List: </div>
                    {messages.map(x=>(
                        <div key={x.id} className="flex flex-col gap-4 bg-cardA dark:bg-card rounded-2xl dark:rounded-none">
                            <PersonalMessageLogic info={x} user={user}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}