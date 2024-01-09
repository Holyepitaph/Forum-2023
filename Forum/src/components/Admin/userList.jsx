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
        <div>
            {users.map(x=>(
                <Link to={`/admin/User/${x.id}`} key={x.id}>
                    <div>Username: {x.username}</div>
                    <div>Name: {x.name}</div>
                    <div>Admin Status: {x.admin}</div>
                    <div>Email: {x.email}</div>
                    <div>Phone Number: {x.phone}</div>
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