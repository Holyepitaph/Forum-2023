import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import postServices from '../../services/post'
import userServices from '../../services/user'

import {ForumPostTheme, InputTheme} from '../../theme'

const IdToUserName = ({info}) =>{
    const [name,setName] = useState('')
    
    const nameCheck =async (info) =>{
        const test = await userServices.getOne({id:info})
        return setName(test.username)
    }
    nameCheck(info)
    return(
        <>
            <span>{name}</span>
        </>
    )
}

const MainForumPost = ({forumList,update, user}) => {
    const deletePost =async (info) =>{
        await postServices.deletePost({postId: info})
        update()
    }
    return(
        <div className={ForumPostTheme.MainForumPost.main}>
            {forumList.map(x=>(
                <div key={x.id} className={ForumPostTheme.MainForumPost.cardMain}>
                    <Link to={`/user/Forum/Post/${x.id}`} className={ForumPostTheme.MainForumPost.linkMain}>
                        <div className="w-full">{x.text}</div>
                        <div className={ForumPostTheme.MainForumPost.linkText}>
                            <Link to={`/user/User/${x.userId}`}>
                                <div>Created: <IdToUserName info={x.userId}/></div>
                            </Link>
                            <div>{x.created}</div>
                            <div>Comments: {x.comments.length}</div>
                        </div>
                    </Link>
                    {user == x.userId ? <button className={ForumPostTheme.MainForumPost.linkButton} onClick={()=>deletePost(x.id)}>X</button> : null}
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
        <div className={ForumPostTheme.InputPost.main}>
            <form id="newUserPostForm" className={ForumPostTheme.InputPost.formMain} onSubmit={sendIt}>
            <div className={ForumPostTheme.InputPost.form}>
                    <span>Title: </span>
                    <textarea
                    type="text"
                    rows={4}
                    cols={40}
                    className={InputTheme.main}
                    value={text}
                    onChange={({target})=>setText(target.value)}
                    />
                </div>
            </form>
            <div className={ForumPostTheme.InputPost.externalButtons}>
                <button className={InputTheme.button.cancel} onClick={()=>change()}>Cancel</button>
                <button className={InputTheme.button.submit} type="submit" form="newUserPostForm">Create</button>
            </div>
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

    const NewPostButton = () =>{
        return(
            <div className={ForumPostTheme.AdminForumPosts.buttonMain}>
                <button className={ForumPostTheme.AdminForumPosts.button} 
                onClick={()=>setHidden(true)}>New Post</button>
            </div>
        )
    }


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
            {hidden ? <InputPost change={()=>setHidden(false)} id={id} update={()=>postsCheck()}/> : <NewPostButton/>}
            <MainForumPost forumList={forumList} update={()=>postsCheck()} user={user}/>
        </div>

    )
}