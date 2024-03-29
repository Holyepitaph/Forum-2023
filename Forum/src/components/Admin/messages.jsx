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
            <div>
                <div>Find Someone to Message</div>
            </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-textA dark:text-text">
                <div className="bg-backA dark:bg-back flex flex-col gap-4 py-4 mt-4 px-4 w-full">
                    <div className="bg-cardAltA dark:bg-cardAlt rounded-xl dark:rounded-none md:text-2xl lg:text-lg md:py-2">Personal Messages: </div>
                    {messages.map(x=>(
                        <div key={x.id} className="flex flex-col gap-4 bg-cardA dark:bg-card rounded-2xl dark:rounded-none md:text-2xl  lg:text-lg">
                            <PersonalMessageLogic info={x} user={user}/>
                        </div>
                    ))}
                </div>
                <div className="bg-backA dark:bg-back flex flex-col gap-2 py-4 mt-4 px-4 w-full">
                    <div className="bg-cardAltA dark:bg-cardAlt rounded-xl dark:rounded-none md:text-2xl  lg:text-lg md:py-2">All Users Messages:</div>
                    {messages.map(x=>(
                        <div key={x.id} className="flex flex-col gap-4 bg-cardA dark:bg-card rounded-2xl dark:rounded-none md:text-2xl  lg:text-lg">
                            <AllMessageLogic info={x} user={user}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}