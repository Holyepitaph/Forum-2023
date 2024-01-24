import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import userServices from '../../services/user'
import friendServices from '../../services/friend'

import {UserListTheme} from '../../theme'

const DisplayUser = ({info}) =>{
    return(
        <Link to={`/user/User/${info.id}`} className={UserListTheme.link}
        key={info.id}>
            <div className={UserListTheme.text}>Username:</div><div className={UserListTheme.textAlt}>{info.username}</div>
            <div className={UserListTheme.line}/>
            <div>Name:</div><div>{info.name}</div>
            <div className={UserListTheme.line}/>
            <div>Email:</div><div>{info.email}</div>
            <div className={UserListTheme.line}/>
            <div>Number:</div><div>{info.phone}</div>
            <div className={UserListTheme.line}/>
            <div>Image:</div><div>{info.image}</div>
            <div className={UserListTheme.line}/>
            <div className={UserListTheme.text}>Messages:</div><div className={UserListTheme.textAlt}>{info.messages.length}</div>
            <div className={UserListTheme.line}/>
            <div>Friends:</div><div>{info.friends.length}</div>
            <div className={UserListTheme.line}/>
            <div>Forums:</div><div>{info.forums.length}</div>
        </Link>
    )
}

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
        if(!status){
            return(<div>Loading...</div>)
        }        

        if(status.length == 0){
            //no friend status
            if(info.private == true){
                //do not show
                return(<></>)
            } else{
                return(            
                    <>
                        <DisplayUser info={info}/>
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
                    <DisplayUser info={info}/>
                </>)
            }else{
                return(            
                <>
                    <DisplayUser info={info}/>
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
                    <DisplayUser info={info}/>
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
        <div className={UserListTheme.main}>
            {users.map(x=>(
                <div key={x.id}>
                    <UsersSingle user={user} info={x}/>
                    <br/>
                </div>
            ))}
        </div>

    )
}