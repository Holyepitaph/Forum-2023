import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import messageServices from '../../services/message'

const AllMessageLogic = ({info,user}) =>{
    const test = info.users.map(x=>x.id == user).filter(x=>x == false)
    if(test.length > 1 ){
        return(
        <Link to={`/admin/Messages/${info.id}`} key={info.id}>
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

const PersonalMessageLogic = ({info,user}) =>{
    const test = info.users.map(x=>x.id == user).filter(x=>x == true)
    if(test.length > 0 ){
        return(
        <Link to={`/admin/Messages/${info.id}`} key={info.id}>
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
            <div>Personal Messages: </div>
            {messages.map(x=>(
                <PersonalMessageLogic key={x.id} info={x} user={user}/>
            ))}
            <div>All Users Messages:</div>
            {messages.map(x=>(
                <AllMessageLogic key={x.id} info={x} user={user}/>
            ))}
        </div>

    )
}