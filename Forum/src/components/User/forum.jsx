import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import forumServices from '../../services/forum'
import imageServices from '../../services/images'
import {ImagesViewer, ImagesViewerAlt} from '../image'

import { ForumTheme, InputTheme } from "../../theme"

const MainForum = ({forumList, update, user}) => {
    const deleteForum =async (info)=>{
        await forumServices.deleteForum({id:info})
        update()
    }
    return(
    <div className={ForumTheme.MainForum.main}>
        {forumList.map(x=>(
            <div key={x.id} className={ForumTheme.MainForum.cardMain}>
                <ImagesViewer info={x.image} change={ForumTheme.MainForum.image}/>
                <Link to={`/user/Forum/${x.id}`} className={ForumTheme.MainForum.linkMain}>
                <div>Forum Name: {x.text}</div>
                <div>Created on: {x.created}</div>
{/* This needs to be changed to lists number of posts */}
                <div> Number of Posts: {x.posts.length}</div>
                <br/>
            </Link>
            {user == x.userId ? <button onClick={()=>deleteForum(x.id)} className={ForumTheme.MainForum.linkButton}>X</button> : null}
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
        const regEx = /.jpeg|.jpg|.gif|.png|.webp/
        const regMatch = e.target[1].files[0].name.match(regEx)
        const imageTest = await imageServices.getAll()
        const id = Math.max(...imageTest.map(x=>x.id))
        const prep = id + regMatch[0]
        const newForum = await forumServices.newForum({text:text, image:prep})
        await imageServices.createOrder({file: e.target[1].files , id: id})
        setText('')
        update()
        change()
    }

    return(
        <div className={ForumTheme.InputForum.main}>
            <form id="newUserForumForm" onSubmit={sendIt} className={ForumTheme.InputForum.formMain}>
            <div className={ForumTheme.InputForum.form}>
                    <span>Title: </span>
                    <textarea
                    className={InputTheme.main}
                    rows={4}
                    cols={35}
                    value={text}
                    onChange={({target})=>setText(target.value)}
                    />
                </div>
                <div className={InputTheme.fileMain}>
                    <input className={InputTheme.file} type="file" />                  
                </div>
            </form>
            <div className={ForumTheme.InputForum.externalButtons}>
                <button className={InputTheme.button.cancel} onClick={()=>change()}>Cancel</button>
                <button className={InputTheme.button.submit} type="submit" form="newUserForumForm">Confirm</button>
            </div>
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

    const NewForumButton = () =>{
        return(
            <div className={ForumTheme.AdminForum.buttonMain}>
                <button className={ForumTheme.AdminForum.button}
                onClick={()=>setHidden(true)}>New Forum</button>
            </div>
        )
    }

    if(!forumList){
        return(
            <div>Loading...</div>
        )
    }

    return(
        <div className="pt-4">
            {hidden ? <InputForum change={()=>setHidden(false)} update={()=>forumCheck()}/> : <NewForumButton/> }
            <MainForum forumList={forumList} update={()=>forumCheck()} user={user}/>
        </div>

    )
}