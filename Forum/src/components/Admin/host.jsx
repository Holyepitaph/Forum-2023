import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import userServices from '../../services/user'


export const AdminHost = ({userUpdate, user}) =>{
    const [users, setUser] = useState('')
    let singleUser
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
    }else{
        singleUser= users.filter(x=>x.id == user)
    }
    return(
        <div>
            {singleUser.map(x=>(
                <div key={x.id}>
                    <div>Username: {x.username}</div>
                    <div>Name: {x.name}</div>
                    <div>Admin Status: {x.admin}</div>
                    <div>Email: {x.email}</div>
                    <div>Phone Number: {x.phone}</div>
                    <div>Image: {x.image}</div>
                    <div>Total Messages: {x.messages.length}</div>
                    <div>
                        <br/>
                        <div>Friends List: </div>
                        {x.friends.map(x=>(
                            <Link to={`/admin/User/${x.id}`} key={x.id}>
                                <br/>
                                <div>Username: {x.username}</div>
                                <div>Name: {x.name}</div>
                                <div>Admin Status: {x.admin ? "True" : "False"}</div>
                            </Link>
                        ))}
                    <div>
                        <br/>
                        <div>Forums List: </div>
                        {x.forums.map(x=>(
                        <Link to={`/admin/Forum/${x.id}`} key={x.id}>
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
            ))}
        </div>

    )
}