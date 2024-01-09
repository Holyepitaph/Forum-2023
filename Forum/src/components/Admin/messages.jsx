import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import messageServices from '../../services/message'


export const AdminMessage = ({userUpdate, user}) =>{
    const [messages, setMessages] = useState('')
    
    useEffect(()=>{
        const messageCheck = async () =>{
            const response = await messageServices.getAll()
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
            <div>Maybe needs to adjust whom the conversations are between for other users conversations and for admin to user</div>
            {messages.map(x=>(
                <Link to={`/admin/Messages/${x.id}`} key={x.id}>
                    <div>{x.users.filter(x=>x.id).map(x=>(
                        <div key={x.id}>{x.username}</div>
                    ))}</div>
                    <br/>
                </Link>
            ))}
        </div>

    )
}