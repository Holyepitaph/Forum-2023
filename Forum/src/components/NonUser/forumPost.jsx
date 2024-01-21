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

const MainForumPost = ({forumList, update}) => {
    
    return(
            <div className={ForumPostTheme.MainForumPost.main}>
            {forumList.map(x=>(
                <div key={x.id} className={ForumPostTheme.MainForumPost.cardMain}>
                    <Link to={`/forum/Post/${x.id}`} className={ForumPostTheme.MainForumPost.linkMain}>
                        <div className="w-full">{x.text}</div>
                        <div className={ForumPostTheme.MainForumPost.linkText}>
                            <div>
                                <span className={ForumPostTheme.MainForumPost.hidden}>Created: </span><span><IdToUserName info={x.userId}/></span>
                            </div>
                            <div>{x.created}</div>
                            <div>
                                <span className={ForumPostTheme.MainForumPost.hidden}>Comments: </span><span>{x.comments.length}</span>
                            </div>
                        </div>
                    </Link>
                    <br/>
                </div>
            ))}
            </div>
    )
}


export const NonUserForumPosts = ({userUpdate}) =>{
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
    return(
        <div>
            <MainForumPost forumList={forumList} update={()=>postsCheck()}/>
        </div>

    )
}