import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import forumServices from '../../services/forum'

const MainForum = ({forumList, change, update, user}) => {
    const deleteForum =async (info)=>{
        await forumServices.deleteForum({id:info})
        update()
    }
    return(
    <div>
    <button onClick={()=>change()}>New Forum</button>
        {forumList.map(x=>(
            <div key={x.id}>
            {user == x.userId ? <button onClick={()=>deleteForum(x.id)}>Delete</button> : null}
                <Link to={`/user/Forum/${x.id}`}>
                <div>{x.image}</div>
                <div>Forum Name: {x.text}</div>
                <div>Created on: {x.created}</div>
{/* This needs to be changed to lists number of posts */}
                <div> Number of Posts: {x.posts.length}</div>
                <br/>
            </Link>
            </div>
        ))}
    </div>
    )
}

const InputForum = ({change,update}) =>{
    const [text, setText] = useState('')
    const [image, setImage] = useState('')

    const sendIt = async (e) =>{
        e.preventDefault()
        const newForum = await forumServices.newForum({text:text, image:image})
        setText('')
        setImage('')
        update()
        change()
    }

    return(
        <div>
            <button onClick={()=>change()}>Cancel</button>
            <form onSubmit={sendIt}>
                <div>
                    <span>Forum Title: </span>
                    <input
                    type="text"
                    value={text}
                    onChange={({target})=>setText(target.value)}
                    />
                </div>
                <div>
                    <div>Change Later for Image Input: </div>
                    <input
                    type="text"
                    value={image}
                    onChange={({target})=>setImage(target.value)}
                    />
                </div>
                <button>Create New Forum</button>
            </form>
        </div>
    )
}

export const UserForum  = ({userUpdate, user}) =>{
const [hidden, setHidden] = useState(false)
const [forumList, setForumList] = useState('')

const forumCheck = async () =>{
    const returnForum = await forumServices.getAll()
   return  setForumList(returnForum)
}

    useEffect(()=>{
        userUpdate()
        forumCheck()
    },[])

    if(!forumList){
        return(
            <div>Loading...</div>
        )
    }

    return(
        <div>
            {hidden ? <InputForum change={()=>setHidden(false)} update={()=>forumCheck()}/> : <MainForum forumList={forumList} change={()=>setHidden(true)} update={()=>forumCheck()} user={user}/> }
        </div>

    )
}