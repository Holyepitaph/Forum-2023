import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import messageServices from '../../services/message'


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
            {messages.map(x=>(
                <Link to={`/user/Messages/${x.id}`} key={x.id}>
                    <div>{x.users.filter(x=>x.id != user).map(x=>(
                        <div key={x.id}>{x.username}</div>
                    ))}</div>
                </Link>
            ))}
        </div>

    )
}