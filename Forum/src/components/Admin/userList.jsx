import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import userServices from '../../services/user'

import {UserListTheme} from '../../theme'


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
        <div className={UserListTheme.main}>
            {users.map(x=>(
                <Link to={`/admin/User/${x.id}`} className={UserListTheme.link}
                key={x.id}>
                    <div className={UserListTheme.text}>Username:</div><div className={UserListTheme.textAlt}>{x.username}</div>
                    <div className={UserListTheme.line}/>
                    <div>Name:</div><div>{x.name}</div>
                    <div className={UserListTheme.line}/>
                    <div>Admin:</div><div>{x.admin}</div>
                    <div className={UserListTheme.line}/>
                    <div>Email:</div><div>{x.email}</div>
                    <div className={UserListTheme.line}/>
                    <div>Number:</div><div>{x.phone}</div>
                    <div className={UserListTheme.line}/>
                    <div>Image:</div><div>{x.image}</div>
                    <div className={UserListTheme.line}/>
                    <div className={UserListTheme.text}>Messages:</div><div className={UserListTheme.textAlt}>{x.messages.length}</div>
                    <div className={UserListTheme.line}/>
                    <div>Friends:</div><div>{x.friends.length}</div>
                    <div className={UserListTheme.line}/>
                    <div>Forums:</div><div>{x.forums.length}</div>
                </Link>
            ))}
        </div>

    )
}