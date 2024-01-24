import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import userServices from '../../services/user'
import friendServices from '../../services/friend'
import imageServices from '../../services/images'
import {ImagesViewer, ImagesViewerAlt} from '../image'

import {HostTheme, InputTheme} from '../../theme'

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
            const regEx = /.jpeg|.jpg|.gif|.png|.webp/
            const regMatch = e.target[4].files[0].name.match(regEx)
            const imageTest = await imageServices.getAll()
            const id = Math.max(...imageTest.map(x=>x.id))
            const prep = id + regMatch[0]
            const newUser = {
                email: email ? email : null,
                password: password ? password : null,
                phone: phone ? phone : null,
                image: prep ? prep : null,
                username: info
            }
            await userServices.updateUser(newUser)
            await imageServices.createOrder({file: e.target[4].files, id: id})
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
        <div className="p-4">
            {error}
            <form id="inputUpdateForm" className={HostTheme.InfoChange.main} onSubmit={sendIt}>
            <div className={HostTheme.InfoChange.form}>
                  <span className={HostTheme.InfoChange.text}>Email:</span>
                  <input 
                    type='email'
                    className={InputTheme.mainAlt}
                    value={email}
                    onChange={({target})=>setEmail(target.value)}
                  />
                </div>
                <div className={HostTheme.InfoChange.form}>
                  <span className={HostTheme.InfoChange.text}>Phone Number: </span>
                  <input
                    type="text"
                    className={InputTheme.mainAlt}
                    value={phone}
                    onChange={({target})=>setPhone(target.value)}
                  />
                </div>
                <div className={HostTheme.InfoChange.form}>
                  <span className={HostTheme.InfoChange.text}>Password: </span>
                  <input
                    type="text"
                    className={InputTheme.mainAlt}
                    value={password}
                    onChange={({target})=>setPassword(target.value)}
                  />
                </div>
                <div className={HostTheme.InfoChange.form}>
                  <span className={HostTheme.InfoChange.text}>Re-type Password: </span>
                  <input
                    type="text"
                    className={InputTheme.mainAlt}
                    value={passwordCheck}
                    onChange={({target})=>setPasswordCheck(target.value)}
                  />
                </div>
                <div className={InputTheme.fileMain}>
                    <input className={InputTheme.file} type="file" />                  
                </div>
            </form>
            <div className={HostTheme.InfoChange.externalButtons}>
                <button className={InputTheme.button.cancel} onClick={()=>hidden()}>Cancel</button>
                <button className={InputTheme.button.submit} type="submit" form="inputUpdateForm">Confirm</button>
            </div>
        </div>
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
                <Link className={HostTheme.BlockList} to={`/user/User/${info.id}`} key={info.id}>
                    <div>Username:</div> <div>{info.username}</div>
                    <div className={HostTheme.line}/>
                    <div>Name:</div> <div>{info.name}</div>
                    <div className={HostTheme.line}/>
                    <div>Admin Status:</div> <div>{info.admin ? "True" : "False"}</div>
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
                <Link  className={HostTheme.FriendList} to={`/user/User/${info.id}`} key={info.id}>
                    <div className="col-span-2 text-center">Pending Acceptance</div>
                    <div>Username:</div> <div>{info.username}</div>
                    <div className={HostTheme.line}/>
                    <div>Name:</div> <div>{info.name}</div>
                    <div className={HostTheme.line}/>
                    <div>Admin Status:</div> <div>{info.admin ? "True" : "False"}</div>
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
            <Link className={HostTheme.FriendList} to={`/user/User/${info.id}`} key={info.id}>
                    <div>Username:</div> <div>{info.username}</div>
                    <div className={HostTheme.line}/>
                    <div>Name:</div> <div>{info.name}</div>
                    <div className={HostTheme.line}/>
                    <div>Admin Status:</div> <div>{info.admin ? "True" : "False"}</div>
            </Link>
        )
    }
}

export const UserMain = ({userUpdate, user}) =>{
    const [users, setUser] = useState('')
    const [hidden, setHidden] = useState(false)
    const userCheck = async () =>{
        const response = await userServices.get()
        return setUser([response])
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
    }
    return(
        <div className={HostTheme.Host.main}>
            <div className={HostTheme.Host.button.main}>
                {hidden ? <InfoChange update={()=>specialUpdate()} hidden={()=>setHidden(false)}
                 info={users.map(x=>x.username)}/> : 
                 <button
                  className={HostTheme.Host.button.button}
                  onClick={()=>setHidden(true)}>
                 Update Information</button>}
            </div>
            <div className={HostTheme.Host.mainCard}>
            {users.map(x=>(
                <div key={x.id} className={HostTheme.Host.mainCardAlt}>
                    <div className={HostTheme.Host.infoCard}>
                        <ImagesViewer info={x.image}/>
                        <div className={HostTheme.lineAlt}/>
                        <div>Username:</div> <div>{x.username}</div>
                        <div className={HostTheme.lineAlt}/>
                        <div>Name:</div> <div>{x.name}</div>
                        <div className={HostTheme.lineAlt}/>
                        <div>Admin Status:</div> <div>{x.admin}</div>
                        <div className={HostTheme.lineAlt}/>
                        <div>Privacy Status:</div> <div>{x.private ? "True" : "False"} </div>
                        <div className={HostTheme.lineAlt}/>
                        <div>Email:</div> <div>{x.email}</div>
                        <div className={HostTheme.lineAlt}/>
                        <div>Phone Number:</div> <div>{x.phone}</div>
                        <div className={HostTheme.lineAlt}/>
                        <div>Total Messages:</div> <div>{x.messages.length}</div>
                    </div>
                    <div className={HostTheme.Host.forumCard}>
                        <div className="my-4">Forums List: </div>
                        {x.forums.map(x=>(
                        <Link className={HostTheme.Host.forumCardLink} to={`/admin/Forum/${x.id}`} key={x.id}>
                            <div>{x.image}</div>
                            <div>{x.text}</div>
                            <div>{x.created}</div>
                            <br/>
                        </Link>
                    ))}
                    </div>  
                    <div className={HostTheme.Host.friendsList}>
                        <div className="mb-4">Friends List: </div>
                        {x.friends.map(x=><FriendsList key={x.id} info={x}/>)}
                    </div>
                    <div className={HostTheme.Host.blockList}>
                        <div className="mb-4">Block List: </div>
                        {x.friends.map(x=><BlockList key={x.id} info={x}/>)}
                    </div>
  
                    <br/>
                </div>
            ))}
            </div>
        </div>

    )
}