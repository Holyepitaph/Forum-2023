import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import postServices from '../../services/post'
import commentServices from '../../services/comment'
import userServices from '../../services/user'
import imageServices from '../../services/images'
import {ImagesViewer, ImagesViewerAlt} from '../image'

import {PostTheme, InputTheme} from '../../theme'

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

const SubComment = ({sub,comment, update}) =>{
    const [hidden, setHidden] = useState(false)


    return(
        <div>
            <div className={PostTheme.SubComment.main}>
            {sub.Sub.map(x=>(
                <div key={x.id} className={PostTheme.SubComment.cardMain}>
                    <ImagesViewerAlt info={x.image} change={PostTheme.SubComment.image}/>
                    <div className={PostTheme.SubComment.cardSub}>
                        <div>{x.text}</div>
                        <div className={PostTheme.SubComment.text}>
                            <div>{x.link}</div>
                            <div className={PostTheme.SubComment.textAlt}>{x.created}</div>
                            <div>
                                <span className={PostTheme.SubComment.textAltA}>User: </span><span><IdToUserName info={x.userId}/></span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

const MainPost = ({singlePost, change, update, id}) => {
    const [hidden, setHidden] = useState(false)
    const [subHidden, setSubHidden] = useState(false)

    return(
        <div className={PostTheme.MainPost.main}>
            {singlePost.map(x=>(
                <div key={x.id} className={PostTheme.MainPost.mapMain.main}>
                    <div className={PostTheme.MainPost.mapMain.mainAlt}>
                        <div className={PostTheme.MainPost.mapMain.card}>
                            <div>{x.text}</div>
                            <div className={PostTheme.MainPost.mapMain.text}>
                                <div>
                                    <span className={PostTheme.MainPost.mapMain.textAlt}>Created on: </span><span>{x.created}</span>
                                </div>
                                <div>
                                    <span className={PostTheme.MainPost.mapMain.textAlt}>User: </span><span><IdToUserName info={x.userId}/></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={PostTheme.MainPost.comment.main}>
                        {x.comments.map(x=>(
                            <div key={x.id} className={PostTheme.MainPost.comment.mainAlt}>
                                <br/>
                                <div className={PostTheme.MainPost.comment.card}>
                                    <ImagesViewerAlt info={x.image} change={PostTheme.MainPost.comment.image}/>
                                    <div className={PostTheme.MainPost.comment.textMain}>
                                        <div>{x.text}</div>
                                        <div className={PostTheme.MainPost.comment.textAlt}>
                                            <div>{x.link}</div>
                                            <div className={PostTheme.MainPost.comment.textAltA}>{x.created}</div>
                                            <div>
                                                <div>
                                                    <span className={PostTheme.MainPost.comment.textAltB}>User: </span><span><IdToUserName info={x.userId}/></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <SubComment sub={x} comment={x.id} update={()=>update()}/>
                            </div>
                        ))}
                    </div>
                    <br/>
                </div>
            ))}
        </div>
    )
}



export const NonUserPost = ({userUpdate}) =>{
    const [posts, setPosts] = useState('')
    const id = useParams().postId
    let singlePost
    const postCheck = async () =>{
        const response = await postServices.getAll()
        setPosts(response)
    }

    useEffect(()=>{
        userUpdate()
        postCheck()
    },[])



    if(!posts){
        return(
            <div>
                <div>Loading...</div>
            </div>
        )
    } else{
        singlePost = posts.filter(x=>x.id == id)
    }
    return(
        <div>
            <MainPost singlePost={singlePost} update={()=>postCheck()} id={id}/>
        </div>

    )
}