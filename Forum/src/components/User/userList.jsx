import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import userServices from '../../services/user'
import friendServices from '../../services/friend'

const UsersSingle = ({user, info}) =>{
    const [status, setStatus] = useState('')

    useEffect(()=>{
        const friendChecks = async () =>{
            const response = await friendServices.check({userId: info.id})
            return setStatus(response)
        }
        friendChecks()
    },[])
    
//possible weirdness with 2 length if one sends block and other sends friend
        
        if(status.length == 0){
            //no friend status
            if(info.private){
                //do not show
                return(<></>)
            } else{
                return(            
                    <>
                        <Link to={`/user/User/${info.id}`}>
                            <div>Username: {info.username}</div>
                            <div>Name: {info.name}</div>
                            <div>Email: {info.email}</div>
                            <div>Image: {info.image}</div>
                            <div>Total Messages: {info.messages.length}</div>
                            <div>Total Friends: {info.friends.length}</div>
                            <div>Total Forums: {info.forums.length}</div>
                        </Link>
                    </>)
            }
        }
        else if(status.length == 1){
        //Checks for friend or blocked status
        if(status[0].status == 'friend'){
            //for Friends check private
            if(info.private){
                return(            
                <>
                    <Link to={`/user/User/${info.id}`}>
                        <div>Username: {info.username}</div>
                        <div>Name: {info.name}</div>
                        <div>Email: {info.email}</div>
                        <div>Image: {info.image}</div>
                        <div>Total Messages: {info.messages.length}</div>
                        <div>Total Friends: {info.friends.length}</div>
                        <div>Total Forums: {info.forums.length}</div>
                    </Link>
                </>)
            }else{
                return(            
                <>
                    <Link to={`/user/User/${info.id}`}>
                        <div>Username: {info.username}</div>
                        <div>Name: {info.name}</div>
                        <div>Email: {info.email}</div>
                        <div>Image: {info.image}</div>
                        <div>Total Messages: {info.messages.length}</div>
                        <div>Total Friends: {info.friends.length}</div>
                        <div>Total Forums: {info.forums.length}</div>
                    </Link>
                </>)
            }
        } else{
            //For blocked do not display
            return(
                <></>
            )
        }
    } else{
        //For full friends show
        return(
            <>
                <Link to={`/user/User/${info.id}`}>
                    <div>Username: {info.username}</div>
                    <div>Name: {info.name}</div>
                    <div>Email: {info.email}</div>
                    <div>Image: {info.image}</div>
                    <div>Total Messages: {info.messages.length}</div>
                    <div>Total Friends: {info.friends.length}</div>
                    <div>Total Forums: {info.forums.length}</div>
                </Link>
            </>
        )
    }
}

export const UserUserList = ({userUpdate, user}) =>{
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
                <div key={x.id}>
                    <UsersSingle user={user} info={x}/>
                    <br/>
                </div>
            ))}
        </div>

    )
}