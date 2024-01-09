import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import postServices from '../../services/post'

const MainForumPost = ({forumList, change}) => {
    return(
        <div>
            <button onClick={()=>change()}>New Post</button>
            {forumList.map(x=>(
                <Link to={`/user/Forum/Post/${x.id}`} key={x.id}>
                    <div>Post Name: {x.text}</div>
                    <div>Created on: {x.created}</div>
                    <div>{x.comments.length}</div>
                    <br/>
                </Link>
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

export const UserForumPost = ({userUpdate}) =>{
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
            {hidden ? <InputPost change={()=>setHidden(false)} id={id} update={()=>postsCheck()}/> : <MainForumPost forumList={forumList} change={()=>setHidden(true)}/>}
        </div>

    )
}