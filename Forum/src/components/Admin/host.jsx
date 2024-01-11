import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import userServices from '../../services/user'
import friendServices from '../../services/friend'

const InfoChange = ({hidden,update,info}) =>{
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const [phone,setPhone] = useState('')
    const [error, setError] = useState('')

    const sendIt = async (e) =>{
        const reset = () =>{
            setEmail('')
            setPhone('')
            setPassword('')
            setPasswordCheck('')
        }
        e.preventDefault()
        if(password == passwordCheck || !password){
            const newUser = {
                email: email ? email : null,
                password: password ? password : null,
                phone: phone ? phone : null,
                username: info
            }
            console.log(newUser)
            await userServices.updateUser(newUser)
            setError(`Information Successfully Updated`)
            setTimeout(() => {
                setError(null)
              }, 5000)
            reset()
            update()
        } else if(password != passwordCheck){
            setError("Passwords do not match")
            setTimeout(() => {
                setError(null)
              }, 5000)
            setPassword('')
            setPasswordCheck('')
        } else {
            setError("Unknown Error has occured")
            setTimeout(() => {
                setError(null)
              }, 5000)
              reset()
        }
    }

    return(
        <>
            {error}
            <form onSubmit={sendIt}>
                <div>
                  <span >Email:</span>
                  <input 
                    type='email'
                    value={email}
                    onChange={({target})=>setEmail(target.value)}
                  />
                </div>
                <div>
                  <span>Phone Number: </span>
                  <input
                    type="text"
                    value={phone}
                    onChange={({target})=>setPhone(target.value)}
                  />
                </div>
                <div>
                  <span>Password: </span>
                  <input
                    type="text"
                    value={password}
                    onChange={({target})=>setPassword(target.value)}
                  />
                </div>
                <div>
                  <span>Re-type Password: </span>
                  <input
                    type="text"
                    value={passwordCheck}
                    onChange={({target})=>setPasswordCheck(target.value)}
                  />
                </div>
                <button type="submit">
                  Update Information
                </button>
            </form>
            <button onClick={()=>hidden()}>Cancel</button>
        </>
    )
}

const BlockList = ({info}) =>{
    const [status, setStatus] = useState('')

    
    useEffect(()=>{
        const friendChecks = async () =>{
            const response = await friendServices.check({userId: info.id})
            return setStatus(response)
        }
        friendChecks()
    },[])

    if(status.length == 1){
        //Checks for friend or blocked status
        if(status[0].status == 'friend'){
            //for Friends block
            return(
                <></>
            )
        } else{
            //For blocked display
            return(
                <Link to={`/admin/User/${info.id}`} key={info.id}>
                    <br/>
                    <div>Username: {info.username}</div>
                    <div>Name: {info.name}</div>
                    <div>Admin Status: {info.admin ? "True" : "False"}</div>
                </Link>
            )
        }
    } else{
        //For full friends do not show
        return(
            <></>
        )
    }
}

const FriendsList = ({info}) =>{
    const [status, setStatus] = useState('')

    
    useEffect(()=>{
        const friendChecks = async () =>{
            const response = await friendServices.check({userId: info.id})
            return setStatus(response)
        }
        friendChecks()
    },[])

    if(status.length == 1){
        //Seperates blocked and friends
        if(status[0].status == 'friend'){
            //For Friends display info
            return(
                <Link to={`/admin/User/${info.id}`} key={info.id}>
                    <br/>
                    <div>Pending Acceptance</div>
                    <div>Username: {info.username}</div>
                    <div>Name: {info.name}</div>
                    <div>Admin Status: {info.admin ? "True" : "False"}</div>
                </Link>
            )
        } else{
            //For blocked do not show
            return(
                <></>
            )
        }
    } else{
        //for confirmed friends display info
        return(
            <Link to={`/admin/User/${info.id}`} key={info.id}>
                <br/>
                <div>Username: {info.username}</div>
                <div>Name: {info.name}</div>
                <div>Admin Status: {info.admin ? "True" : "False"}</div>
            </Link>
        )
    }
}

export const AdminHost = ({userUpdate, user}) =>{
    const [users, setUser] = useState('')
    const [hidden, setHidden] = useState(false)
    let singleUser
    const userCheck = async () =>{
        const response = await userServices.getAll()
        return setUser(response)
    }
    
    useEffect(()=>{
        userUpdate()
        userCheck()
    },[])

    const specialUpdate = () =>{
        userUpdate()
        userCheck()
    }

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
            {hidden ? <InfoChange update={()=>specialUpdate()} hidden={()=>setHidden(false)} info={singleUser.map(x=>x.username)}/> : <button onClick={()=>setHidden(true)}>Update Information</button>}
            {singleUser.map(x=>(
                <div key={x.id}>
                    <div>Username: {x.username}</div>
                    <div>Name: {x.name}</div>
                    <div>Admin Status: {x.admin}</div>
                    <div>Privacy Status: {x.private ? "True" : "False"} </div>
                    <div>Email: {x.email}</div>
                    <div>Phone Number: {x.phone}</div>
                    <div>Image: {x.image}</div>
                    <div>Total Messages: {x.messages.length}</div>
                    <div>
                        <br/>
                        <div>Friends List: </div>
                        {x.friends.map(x=><FriendsList key={x.id} info={x}/>)}
                        <br/>
                        <div>Block List: </div>
                        {x.friends.map(x=><BlockList key={x.id} info={x}/>)}
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