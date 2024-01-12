import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import userServices from '../../services/user'


export const AdminUserList = ({userUpdate}) =>{
const [users, setUser] = useState('')

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
    }

    return(
        <div className="bg-backA dark:bg-back mt-4 grid grid-cols-1 sm:grid-cols-2 p-4 gap-4 text-textA dark:text-text">
            {users.map(x=>(
                <Link to={`/admin/User/${x.id}`} className="bg-cardA dark:bg-card 
                grid-cols-3 grid p-2 grid-1
                text-left gap-2 sm:text-sm" 
                key={x.id}>
                    <div className="text-sm leading-loose">Username:</div><div className="sm:leading-loose">{x.username}</div>
                    <div className="col-span-3 border border-cardAltA dark:border-cardAlt"/>
                    <div>Name:</div><div>{x.name}</div>
                    <div className="col-span-3 border border-cardAltA dark:border-cardAlt"/>
                    <div>Admin:</div><div>{x.admin}</div>
                    <div className="col-span-3 border border-cardAltA dark:border-cardAlt"/>
                    <div>Email:</div><div>{x.email}</div>
                    <div className="col-span-3 border border-cardAltA dark:border-cardAlt"/>
                    <div>Number:</div><div>{x.phone}</div>
                    <div className="col-span-3 border border-cardAltA dark:border-cardAlt"/>
                    <div>Image:</div><div>{x.image}</div>
                    <div className="col-span-3 border border-cardAltA dark:border-cardAlt"/>
                    <div className="text-sm leading-loose">Messages:</div><div className="sm:leading-loose">{x.messages.length}</div>
                    <div className="col-span-3 border border-cardAltA dark:border-cardAlt"/>
                    <div>Friends:</div><div>{x.friends.length}</div>
                    <div className="col-span-3 border border-cardAltA dark:border-cardAlt"/>
                    <div>Forums:</div><div>{x.forums.length}</div>
                </Link>
            ))}
        </div>

    )
}