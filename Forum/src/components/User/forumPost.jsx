import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import postServices from '../../services/post'
import userServices from '../../services/user'

const IdToUserName = ({info}) =>{
    const [name,setName] = useState('')
    
    const nameCheck =async (info) =>{
        const test = await userServices.getOne({id:info})
        return setName(test.username)
    }
    nameCheck(info)
    return(
        <>
            <div>{name}</div>
        </>
    )
}

const MainForumPost = ({forumList, change, user}) => {
    const deletePost =async (info) =>{
        await postServices.deletePost({postId: info})
        update()
    }
    return(
        <div>
            <button onClick={()=>change()}>New Post</button>
            {forumList.map(x=>(
                <div key={x.id}>
                {user == x.userId ? <button onClick={()=>deletePost(x.id)}>Delete</button> : null}
                    <Link to={`/user/Forum/Post/${x.id}`}>
                        <div>Post Name: {x.text}</div>
                        <div>Created on: {x.created}</div>
                        <div>Number of Comments: {x.comments.length}</div>
                    </Link>
                    <Link to={`/user/User/${x.userId}`}>
                        <div>Created By: </div><IdToUserName info={x.userId}/>
                    </Link>
                    <br/>
                </div>
            ))}
        </div>
    )
}

const InputPost = ({id,change, update}) =>{
    const [text, setText] = useState('')

    const sendIt = async (e) =>{
        e.preventDefault()
        const newForum = await postServices.newPost({text:text,forumId: id})
        setText('')
        update()
        change()
    }

    return(
        <div>
            <button onClick={()=>change()}>Cancel</button>
            <form onSubmit={sendIt}>
                <div>
                    <span>Post Title: </span>
                    <input
                    type="text"
                    value={text}
                    onChange={({target})=>setText(target.value)}
                    />
                </div>
                <button>Create New Post</button>
            </form>
        </div>
    )
}

export const UserForumPost = ({userUpdate, user}) =>{
    const [posts,setPosts] = useState('')
    const [hidden, setHidden] = useState('')
    const id = useParams().forumId
    let forumList
    const postsCheck = async () =>{
        const response = await postServices.getAll()
        setPosts(response)
    }

    useEffect(()=>{
        userUpdate()
        postsCheck()
    },[])



    if(!posts){
        return(
            <div>
                <div>Loading...</div>
            </div>
        )
    }else{
        forumList = posts.filter(x=>x.forumId == id)
    }
    console.log(forumList)
    return(
        <div>
            {hidden ? <InputPost change={()=>setHidden(false)} id={id} update={()=>postsCheck()}/> : <MainForumPost forumList={forumList} change={()=>setHidden(true)} user={user}/>}
        </div>

    )
}