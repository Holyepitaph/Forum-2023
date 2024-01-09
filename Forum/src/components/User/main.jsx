import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import userServices from '../../services/user'


export const UserMain = ({userUpdate, user}) =>{
    const [users, setUser] = useState('')

    useEffect(()=>{
        const userCheck = async () =>{
            const response = await userServices.get()
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

                <div>
                    <div>Username: {users.username}</div>
                    <div>Name: {users.name}</div>
                    <div>Admin Status: {users.admin}</div>
                    <div>Email: {users.email}</div>
                    <div>Phone Number: {users.phone}</div>
                    <div>Image: {users.image}</div>
                    <div>Total Messages: {users.messages.length}</div>
                    <div>
                        <br/>
                        <div>Friends List: </div>
                        {users.friends.map(x=>(
                            <Link to={`/user/User/${x.id}`} key={x.id}>
                                <br/>
                                <div>Username: {x.username}</div>
                                <div>Name: {x.name}</div>
                            </Link>
                        ))}
                    <div>
                        <br/>
                        <div>Forums List: </div>
                        {users.forums.map(x=>(
                        <Link to={`/user/Forum/${x.id}`} key={x.id}>
                            <br/>
                            <div>Image: {x.image}</div>
                            <div>Created Date: {x.created}</div>
                            <div>Title: {x.text}</div>
                            <br/>
                        </Link>
                    ))}
                    </div>    
                    </div>
                    <br/>
                </div>
        </div>

    )
}