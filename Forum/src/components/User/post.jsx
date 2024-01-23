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
        console.log(test.username)
        return setName(test.username)
    }
    nameCheck(info)
    return(
        <>
            <span>{name}</span>
        </>
    )
}

const SubComment = ({sub,comment, update, user}) =>{
    const [hidden, setHidden] = useState(false)

    const deleteSubComment =async (info) =>{
        await commentServices.deleteComment({id:info})
        update()
    }

    return(
        <div>
            <button className={PostTheme.SubComment.buttonHidden}  onClick={()=>setHidden( hidden ? false: true)}>{!hidden ? "Comment" : "Cancel"}</button>
            {hidden ? <InputSubComment id={comment} update={()=>update()} hidden={()=>setHidden(false)}/> : null}
            <div  className={PostTheme.SubComment.main}>
            {sub.Sub.map(x=>(
                <div key={x.id} className={PostTheme.SubComment.cardMain}>
                    <ImagesViewerAlt info={x.image} change={PostTheme.SubComment.image}/>
                    <div className={PostTheme.SubComment.cardSub}>
                        <div>{x.text}</div>
                        <div className={PostTheme.SubComment.text}>
                            <div>{x.link}</div>
                            <div className={PostTheme.SubComment.textAlt}>{x.created}</div>
                            <Link to={`/user/User/${x.userId}`}>
                                <span className={PostTheme.SubComment.textAltA}>User: </span><span><IdToUserName info={x.userId}/></span>
                            </Link>
                        </div>
                    </div>
                    {user == x.userId ? <button className={PostTheme.SubComment.linkButton} onClick={()=>deleteSubComment(x.id)}>X</button> : null}
                </div>
            ))}
            </div>
        </div>
    )
}

const MainPost = ({singlePost, change, update, id, user}) => {
    const [hidden, setHidden] = useState(false)

    const inputFunction = () =>{
        change()
        update()
    }

    const commentDelete =async (info) =>{
        await commentServices.deleteComment({id:info})
        update()
    }

    const NewCommentButton = () =>(
        <div className={PostTheme.MainPost.hidden.buttonMain}>
            <button className={PostTheme.MainPost.hidden.button}
            onClick={()=>setHidden(true)}>New Comment</button>
        </div>
    )


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
                                <Link to={`/user/User/${x.userId}`}>
                                    <span className={PostTheme.MainPost.mapMain.textAlt}>User: </span><span><IdToUserName info={x.userId}/></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {hidden ? <InputComment change={()=>inputFunction()} id={id} update={()=>update()}
                     hidden={()=>setHidden(false)}/> : 
                     <NewCommentButton/>}
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
                                            <Link to={`/user/User/${x.userId}`}>
                                                <div>
                                                    <span className={PostTheme.MainPost.comment.textAltB}>User: </span><span><IdToUserName info={x.userId}/></span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div>
                                    {user == x.userId ? <button className={PostTheme.SubComment.linkButton} onClick={()=>commentDelete(x.id)}>X</button> : null}
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

const InputComment = ({id, update, hidden}) =>{
    const [text, setText] = useState('')
    const [link, setLink] = useState('')

    const sendIt = async (e) =>{
        e.preventDefault()
        let prep
        if(e.target[2].files[0]){
            const regEx = /.jpeg|.jpg|.gif|.png|.webp/
            const regMatch = e.target[2].files[0].name.match(regEx)
            const imageTest = await imageServices.getAll()
            const idAlt = Math.max(...imageTest.map(x=>x.id))
            prep = idAlt + regMatch[0]
            await imageServices.createOrder({file: e.target[2].files, id: idAlt})
        }
        const newForum = await commentServices.newComment({text:text,link:link, image:prep? prep : null ,postId: id})
        setText('')
        setLink('')
        update()
        hidden()
    }

    return(
        <div className={PostTheme.InputComment.main}>
            <form id="newCommentForm" onSubmit={sendIt} className={PostTheme.InputComment.mainAlt}>
                <div className={PostTheme.InputComment.inputAlt}>
                    <span>Comment: </span>
                    <textarea
                    type="text"
                    rows={4}
                    cols={30}
                    className={InputTheme.main}
                    value={text}
                    onChange={({target})=>setText(target.value)}
                    />
                </div>
                <div className={PostTheme.InputComment.input}>
                    <span>Link: </span>
                    <input
                    type="text"
                    value={link}
                    className={InputTheme.main}
                    onChange={({target})=>setLink(target.value)}
                    />
                </div>
                <div className={InputTheme.fileMain}>
                    <input className={InputTheme.file} type="file" />                  
                </div>
            </form>
            <div className={PostTheme.InputComment.externalButtons}>
                <button className={InputTheme.button.cancel} onClick={()=>hidden()}>Cancel</button>
                <button className={InputTheme.button.submit} type="submit" form="newCommentForm">Create</button>
            </div>
        </div>
    )
}

const InputSubComment = ({id, update, hidden}) =>{
    const [text, setText] = useState('')
    const [link, setLink] = useState('')

    const sendIt = async (e) =>{
        e.preventDefault()
        let prep
        if(e.target[2].files[0]){
            const regEx = /.jpeg|.jpg|.gif|.png|.webp/
            const regMatch = e.target[2].files[0].name.match(regEx)
            const imageTest = await imageServices.getAll()
            const idAlt = Math.max(...imageTest.map(x=>x.id))
            prep = idAlt + regMatch[0]    
            await imageServices.createOrder({file: e.target[2].files, id: idAlt})
        }
        const newForum = await commentServices.newSubComment({text:text,link:link, image:prep? prep : null,postId: id})
        setText('')
        setLink('')
        update()
        hidden()
    }

    return(
        <div className={PostTheme.InputSubComment.main}>
            <form id="newSubCommentForm" onSubmit={sendIt} className={PostTheme.InputSubComment.form}>
                <div className={PostTheme.InputSubComment.inputAlt}>
                    <span>Comment: </span>
                    <textarea
                    type="text"
                    className={InputTheme.main}
                    rows={4}
                    cols={30}
                    value={text}
                    onChange={({target})=>setText(target.value)}
                    />
                </div>
                <div className={PostTheme.InputSubComment.input}>
                    <span>Link: </span>
                    <input
                    type="text"
                    className={InputTheme.main}
                    value={link}
                    onChange={({target})=>setLink(target.value)}
                    />
                </div>
                <div className={InputTheme.fileMain}>
                    <input className={InputTheme.file} type="file" />                  
                </div>
            </form>
            <div className={PostTheme.InputSubComment.externalButtons}>
                    <button className={InputTheme.button.cancelAlt} onClick={()=>hidden()}>Cancel</button>
                    <button className={InputTheme.button.submitAlt} type="submit" form="newSubCommentForm">Create</button>
            </div>
        </div>
    )
}


export const UserPost = ({userUpdate, user}) =>{
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
    console.log(singlePost)

    return(
        <div>
            <MainPost singlePost={singlePost} update={()=>postCheck()} id={id} user={user}/>
        </div>

    )
}