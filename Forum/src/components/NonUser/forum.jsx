import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import forumServices from '../../services/forum'
import imageServices from '../../services/images'
import {ImagesViewer, ImagesViewerAlt} from '../image'

import { ForumTheme, InputTheme } from "../../theme"

const MainForum = ({forumList, update}) => {

    return(
    <div className={ForumTheme.MainForum.main}>
        {forumList.map(x=>(
            <div key={x.id} className={ForumTheme.MainForum.cardMain}>
                <ImagesViewer info={x.image} change={ForumTheme.MainForum.image}/>
                <Link to={`/forum/${x.id}`} className={ForumTheme.MainForum.linkMain}>
                    <div>{x.text}</div>
                    <div className={ForumTheme.MainForum.linkAlt}>
                        <div>                        
                            <span className={ForumTheme.MainForum.hidden}>Created: </span><span>{x.created}</span> 
                        </div>
                        <div> Total Posts: {x.posts.length}</div>
                    </div>
                </Link>
            </div>
        ))}
    </div>
    )
}


export const NonUserForum = ({userUpdate}) =>{
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
        <div className="pt-4">
            <MainForum forumList={forumList} update={()=>forumCheck()}/>
        </div>

    )
}