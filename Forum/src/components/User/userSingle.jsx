import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import userServices from '../../services/user'
import messageServices from '../../services/message'
import friendServices from '../../services/friend'

import {InputTheme, SingleUserListTheme} from '../../theme'

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

const FriendUser = ({id,update}) =>{
    const addFriend = async () =>{
        await friendServices.newFriend({userId: id})
        update()
    }
    return(
        <>
            <button className={SingleUserListTheme.RelationshipLogic.button} onClick={()=>addFriend()}>Friend Request</button>
        </>
    )
}

const BlockUser = ({id, update}) =>{
    const blockUser = async () =>{
        await friendServices.blockUser({userId: id})
        update()
    }
    return(
        <>
            <button className={SingleUserListTheme.RelationshipLogic.button} onClick={()=>blockUser()}>Block User</button>
        </>
    )
}

const DeleteRelationship = ({id, update, special}) =>{
    const deleteRel = async () =>{
        await friendServices.deleteFriend({userId: id})
        update()
    }    
    if(special){
        return(
        <>
            <button className={SingleUserListTheme.RelationshipLogic.button} onClick={()=>deleteRel()}>Unblock User</button>
        </>
        )
    }
    return(
        <>
            <button className={SingleUserListTheme.RelationshipLogic.button} onClick={()=>deleteRel()}>Remove Friend</button>
        </>
    )
}

const RelationshipLogic = ({id,update, status, user}) =>{
    if(id == user){
        return(
            <div></div>
        )
    }
    else if(status.length == 0 ){
        //No Relationship
        return(
            <div className={SingleUserListTheme.RelationshipLogic.main}>
                <FriendUser id={id} update={()=>update()}/>
                <BlockUser id={id}  update={()=>update()}/>
            </div>
        )
    } else if( status.length < 2){
        if(status[0].status == "friend"){
            //check who sent the request
            if(status[0].userId == user){
                //current user sent request to viewed
                return(
                    <div className={SingleUserListTheme.RelationshipLogic.main}>
                        <DeleteRelationship id={id}  update={()=>update()}/>
                    </div>
                )
            } else {
                //viewed user sent to current user
                return(
                    <div className={SingleUserListTheme.RelationshipLogic.main}>
                        <FriendUser id={id} update={()=>update()}/>
                        <BlockUser id={id}  update={()=>update()}/>
                        <DeleteRelationship id={id}  update={()=>update()}/>
                    </div>
                )
            }
        } else{
            //check who initiated block
            if(status[0].userId == user){
                //current user sent block
                return(
                    <div className={SingleUserListTheme.RelationshipLogic.main}>
                        <DeleteRelationship id={id}  update={()=>update()} special={1}/>
                    </div>
                )
            } else {
                //viewed user sent block
                return(
                    <div>
                        <div>This should not be visible</div>
                    </div>
                )
            }
        }
    } else if(status.length == 2){
        //both are accepted friends
        return(
            <div className={SingleUserListTheme.RelationshipLogic.main}>
                <BlockUser id={id}  update={()=>update()}/>
                <DeleteRelationship id={id}  update={()=>update()}/>
            </div>
        )
}
        }

const InputMessage = ({id, update}) =>{
    const [text, setText] = useState('')
    const navigate = useNavigate()

    const sendIt = async (e) =>{
        e.preventDefault()
        const newMessage = await messageServices.newMessage({text:text, userId: id})
        console.log(newMessage)
        setText('')
        navigate(`/user/Messages/${newMessage.messageBoardId}`)
    }

    return(
        <div className={SingleUserListTheme.InputMessage.main}>
            <form className={SingleUserListTheme.InputMessage.formMain} onSubmit={sendIt}>
                <div className={SingleUserListTheme.InputMessage.form}>
                    <span>Message Details: </span>
                    <textarea
                    type="text"
                    rows={4}
                    cols={40}
                    className={InputTheme.main}
                    value={text}
                    onChange={({target})=>setText(target.value)}
                    />
                </div>
                <button className={SingleUserListTheme.InputMessage.button}>Send Message</button>
            </form>
        </div>
    )
}

export const UserUserSingle = ({userUpdate, user}) =>{
const [users, setUser] = useState('')
const [friends, setFriends] = useState([])
const id = useParams().userId
let singleUser
const friendChecks = async () =>{
    const response = await friendServices.check({userId: id})
    return setFriends(response)
}
    useEffect(()=>{
        const userCheck = async () =>{
            const response = await userServices.getAll()
            return setUser(response)
        }
        userUpdate()
        userCheck()
        friendChecks()
    },[])

    const specialUpdate = () =>{
        friendChecks()
        userUpdate()
    }

    if(!users){
        return(
            <div>
                <div>Loading...</div>
            </div>
        )
    } else{
        singleUser = users.filter(x=>x.id == id)
    }
        console.log(singleUser.map(x=>x.friends.filter(x=>x.id == user)))

    return(
        <div>
            {singleUser.map(x=>(
                <div key={x.id}>
                    {x.id != user ? <InputMessage id={x.id}/> : null}
                    <RelationshipLogic id={x.id} update={()=>specialUpdate()} status={friends} user={user}/>
                    <div className={SingleUserListTheme.AdminUserSingle.main}>
                        <div className={SingleUserListTheme.AdminUserSingle.card}>
                            <div>Admin Status:</div> <div>{x.admin}</div>
                            <div className={SingleUserListTheme.AdminUserSingle.line}/>
                            <div>Created Date:</div> <div>{x.created}</div>
                            <div className={SingleUserListTheme.AdminUserSingle.line}/>
                            <div>Email:</div> <div>{x.email}</div>
                            <div className={SingleUserListTheme.AdminUserSingle.line}/>
                            <div>Image:</div> <div>{x.image}</div>
                            <div className={SingleUserListTheme.AdminUserSingle.line}/>
                            <div>Name:</div> <div>{x.name}</div>
                            <div className={SingleUserListTheme.AdminUserSingle.line}/>
                            <div>Phone Number:</div> <div>{x.phone}</div>
                            <div className={SingleUserListTheme.AdminUserSingle.line}/>
                            <div>Private Status:</div> <div>{x.private}</div>
                            <div className={SingleUserListTheme.AdminUserSingle.line}/>
                            <div>Username:</div> <div>{x.username}</div>
                            <div className={SingleUserListTheme.AdminUserSingle.line}/>
                            <div>Total Messages:</div> <div>{x.messages.length}</div>
                            <div className={SingleUserListTheme.AdminUserSingle.line}/>
                            <div>Total Message Boards:</div> <div>{x.messageBoards.length}</div>
                        </div>
                        <div className={SingleUserListTheme.AdminUserSingle.card}>
                            <div>Forums: </div>
                            {x.forums.map(x=>(
                                <Link to={`/admin/Forum/${x.id}`} key={x.id}>
                                    <div>Image: {x.image}</div>
                                    <div>Created Date: {x.created}</div>
                                    <div>Title: {x.text}</div>
                                    <br/>
                                </Link>
                            ))}
                        </div>
                        {/*need to add friends */}
                        <div className={SingleUserListTheme.AdminUserSingle.card}>
                        <div className="mb-4">Friends List: </div>
                        {x.friends.map(x=><FriendsList key={x.id} info={x}/>)}
                        </div>
                        <div className={SingleUserListTheme.AdminUserSingle.card}>
                        <div className="mb-4">Block List: </div>
                        {x.friends.map(x=><BlockList key={x.id} info={x}/>)}
                        </div>
                    </div>
                </div>
            ))}
        </div>


    )
}