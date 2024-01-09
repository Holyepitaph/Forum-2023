import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import userServices from '../../services/user'


export const UserUserList = ({userUpdate}) =>{
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
        <div>
            {users.map(x=>(
                <Link to={`/user/User/${x.id}`} key={x.id}>
                    <div>Username: {x.username}</div>
                    <div>Name: {x.name}</div>
                    <div>Email: {x.email}</div>
                    <div>Image: {x.image}</div>
                    <div>Total Messages: {x.messages.length}</div>
                    <div>Total Friends: {x.friends.length}</div>
                    <div>Total Forums: {x.forums.length}</div>
                    <br/>
                </Link>
            ))}
        </div>

    )
}