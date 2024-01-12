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
            <span>{name}</span>
        </>
    )
}

const MainForumPost = ({forumList, update}) => {
    
    const deletePost =async (info) =>{
        await postServices.deletePost({postId: info})
        update()
    }

    return(
            <div className="bg-backA dark:bg-back mt-4 p-4 flex flex-col gap-4">
            {forumList.map(x=>(
                <div key={x.id} className="flex bg-cardA dark:bg-card justify-end py-4 gap-2 rounded-xl dark:rounded-none">
                    <Link to={`/admin/Forum/Post/${x.id}`} className="w-full flex flex-col text-textA dark:text-text gap-2">
                        <div>{x.text}</div>
                        <div className="flex gap-2 text-sm justify-between px-4">
                            <Link to={`/admin/User/${x.userId}`}>
                                <div>Created By: <IdToUserName info={x.userId}/></div>
                            </Link>
                            <div>Created: {x.created}</div>
                            <div>Comments: {x.comments.length}</div>
                        </div>
                    </Link>
                    <button onClick={()=>deletePost(x.id)}
                    className="dark:text-black h-4 mt-2 mr-2 p-1
                    text-[.7rem] bg-closeA dark:bg-text dark:rounded-none
                    leading-[.1rem]"
                    >X</button>
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
        <div className="mt-4 bg-backA dark:bg-back p-2 text-textA dark:text-text">
            <form id="newPostForm" className="bg-cardAltA dark:bg-cardAlt p-4 mx-2 rounded-2xl dark:rounded-none" onSubmit={sendIt}>
                <div className="flex gap-2">
                    <span>Post Title: </span>
                    <textarea
                    type="text"
                    rows={4}
                    cols={40}
                    className="w-full bg-mainA dark:bg-main"
                    value={text}
                    onChange={({target})=>setText(target.value)}
                    />
                </div>
            </form>
            <div className="flex justify-between px-2 py-4 gap-4">
                <button className="bg-cardAltA dark:bg-cardAlt w-full dark:rounded-none h-8 leading-[.5rem]" onClick={()=>change()}>Cancel</button>
                <button className="bg-cardAltA dark:bg-cardAlt w-full dark:rounded-none h-8 leading-[.5rem]" type="submit" form="newPostForm">Create New Post</button>
            </div>
        </div>
    )
}

export const AdminForumPosts = ({userUpdate}) =>{
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
            <div className="w-full bg-backA dark:bg-back p-2 mt-4">
                <button className="bg-cardAltA dark:bg-cardAlt px-4 py-2 dark:rounded-none text-textA dark:text-text" 
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
    return(
        <div>
            {hidden ? <InputPost change={()=>setHidden(false)} id={id} update={()=>postsCheck()}/> : <NewPostButton/>}
            <MainForumPost forumList={forumList} update={()=>postsCheck()}/>
        </div>

    )
}