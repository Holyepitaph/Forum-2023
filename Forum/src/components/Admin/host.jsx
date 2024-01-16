import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import userServices from '../../services/user'
import friendServices from '../../services/friend'
import imageServices from '../../services/images'
import {ImagesViewer, ImagesViewerAlt} from '../image'


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
            const prep = imageTest.length + regMatch[0]
            const newUser = {
                email: email ? email : null,
                password: password ? password : null,
                phone: phone ? phone : null,
                image: prep ? prep : null,
                username: info
            }
            console.log(newUser)
            await userServices.updateUser(newUser)
            await imageServices.createOrder({file: e.target[4].files, id: imageTest.length})
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
            <form id="inputUpdateForm" className="bg-cardAltA dark:bg-cardAlt flex flex-col gap-4 py-4 px-4" onSubmit={sendIt}>
            <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <span className="sm:w-1/2">Email:</span>
                  <input 
                    type='email'
                    className="bg-mainA dark:bg-main w-full pl-4"
                    value={email}
                    onChange={({target})=>setEmail(target.value)}
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <span className="sm:w-1/2">Phone Number: </span>
                  <input
                    type="text"
                    className="bg-mainA dark:bg-main w-full pl-4"
                    value={phone}
                    onChange={({target})=>setPhone(target.value)}
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <span className="sm:w-1/2">Password: </span>
                  <input
                    type="text"
                    className="bg-mainA dark:bg-main w-full pl-4"
                    value={password}
                    onChange={({target})=>setPassword(target.value)}
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <span className="sm:w-1/2">Re-type Password: </span>
                  <input
                    type="text"
                    className="bg-mainA dark:bg-main w-full pl-4"
                    value={passwordCheck}
                    onChange={({target})=>setPasswordCheck(target.value)}
                  />
                </div>
                <div className="flex gap-4">
                    <input className="w-full bg-mainA dark:bg-main" type="file" />                  
                </div>
            </form>
            <div className="flex justify-between gap-4 pt-4">
                <button className="bg-cardAltA dark:bg-cardAlt w-full dark:rounded-none h-8 leading-[.5rem]" onClick={()=>hidden()}>Cancel</button>
                <button className="bg-cardAltA dark:bg-cardAlt w-full dark:rounded-none h-8 leading-[.5rem]" type="submit" form="inputUpdateForm">Confirm</button>
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
                <Link  className="bg-cardAltA dark:bg-cardAlt ml-4 py-4 px-2 grid grid-cols-2 text-left gap-1 rounded-l-2xl dark:rounded-none" to={`/admin/User/${info.id}`} key={info.id}>
                    <div>Username:</div> <div>{info.username}</div>
                    <div className="border border-cardA dark:border-card w-full col-span-2"/>
                    <div>Name:</div> <div>{info.name}</div>
                    <div className="border border-cardA dark:border-card w-full col-span-2"/>
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
                <Link  className="bg-cardAltA dark:bg-cardAlt ml-4 py-4 px-2 grid grid-cols-2 text-left gap-1 rounded-l-2xl dark:rounded-none" to={`/admin/User/${info.id}`} key={info.id}>
                    <div className="col-span-2 text-center">Pending Acceptance</div>
                    <div>Username:</div> <div>{info.username}</div>
                    <div className="border border-cardA dark:border-card w-full col-span-2"/>
                    <div>Name:</div> <div>{info.name}</div>
                    <div className="border border-cardA dark:border-card w-full col-span-2"/>
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
            <Link  className="bg-cardAltA dark:bg-cardAlt ml-4 py-4 px-2 grid grid-cols-2 text-left gap-1 rounded-l-2xl dark:rounded-none" to={`/admin/User/${info.id}`} key={info.id}>
                    <div>Username:</div> <div>{info.username}</div>
                    <div className="border border-cardA dark:border-card w-full col-span-2"/>
                    <div>Name:</div> <div>{info.name}</div>
                    <div className="border border-cardA dark:border-card w-full col-span-2"/>
                    <div>Admin Status:</div> <div>{info.admin ? "True" : "False"}</div>
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
        <div className="text-textA dark:text-text">
            <div className="bg-backA dark:bg-back mt-4">
                {hidden ? <InfoChange update={()=>specialUpdate()} hidden={()=>setHidden(false)}
                 info={singleUser.map(x=>x.username)}/> : 
                 <button
                  className="bg-cardAltA dark:bg-cardAlt m-4
                  rounded-xl dark:rounded-none p-2"
                  onClick={()=>setHidden(true)}>
                 Update Information</button>}
            </div>
            <div className="bg-backA dark:bg-back mt-4">
            {singleUser.map(x=>(
                <div key={x.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                    <div className="bg-cardA dark:bg-card py-4 grid grid-cols-2 gap-1 px-4 text-left rounded-2xl dark:rounded-none">
                        <ImagesViewer info={x.image}/>
                        <div className="border border-cardAltA dark:border-cardAlt w-full col-span-2"/>
                        <div>Username:</div> <div>{x.username}</div>
                        <div className="border border-cardAltA dark:border-cardAlt w-full col-span-2"/>
                        <div>Name:</div> <div>{x.name}</div>
                        <div className="border border-cardAltA dark:border-cardAlt w-full col-span-2"/>
                        <div>Admin Status:</div> <div>{x.admin}</div>
                        <div className="border border-cardAltA dark:border-cardAlt w-full col-span-2"/>
                        <div>Privacy Status:</div> <div>{x.private ? "True" : "False"} </div>
                        <div className="border border-cardAltA dark:border-cardAlt w-full col-span-2"/>
                        <div>Email:</div> <div>{x.email}</div>
                        <div className="border border-cardAltA dark:border-cardAlt w-full col-span-2"/>
                        <div>Phone Number:</div> <div>{x.phone}</div>
                        <div className="border border-cardAltA dark:border-cardAlt w-full col-span-2"/>
                        <div>Total Messages:</div> <div>{x.messages.length}</div>
                    </div>
                    <div className="bg-cardA dark:bg-card flex flex-col  rounded-2xl dark:rounded-none">
                        <div className="my-4">Forums List: </div>
                        {x.forums.map(x=>(
                        <Link className="bg-cardAltA dark:bg-cardAlt ml-4 my-4 pt-6 rounded-l-2xl dark:rounded-none" to={`/admin/Forum/${x.id}`} key={x.id}>
                            <div>{x.image}</div>
                            <div>{x.text}</div>
                            <div>{x.created}</div>
                            <br/>
                        </Link>
                    ))}
                    </div>  
                    <div className="bg-cardA dark:bg-card flex flex-col py-4  rounded-2xl dark:rounded-none">
                        <div className="mb-4">Friends List: </div>
                        {x.friends.map(x=><FriendsList key={x.id} info={x}/>)}
                    </div>
                    <div className="bg-cardA dark:bg-card flex flex-col py-4 rounded-2xl dark:rounded-none">
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