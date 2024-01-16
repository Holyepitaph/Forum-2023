import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import forumServices from '../../services/forum'
import imageServices from '../../services/images'
import {ImagesViewer, ImagesViewerAlt} from '../image'

const MainForum = ({forumList, update}) => {
    const deleteForum =async (info)=>{
        await forumServices.deleteForum({id:info})
        update()
    }

    return(
    <div className="w-full text-textA dark:text-text bg-backA dark:bg-back mt-4 p-4">
        {forumList.map(x=>(
            <div key={x.id} className="bg-cardA dark:bg-card my-4 grid grid-cols-12 justify-center rounded-xl dark:rounded-none">
                <ImagesViewer info={x.image} change={"col-span-12 h-24 sm:col-span-2 bg-closeA dark:bg-text ml-2 my-2 border border-white"}/>
                <Link to={`/admin/Forum/${x.id}`} className="w-full h-full col-span-11 sm:col-span-9 mt-2 flex flex-col justify-between">
                    <div>{x.text}</div>
                    <div>Created: {x.created}</div>
                    <div> Total Posts: {x.posts.length}</div>
                    <br/>
                </Link>
                <button 
                    className="dark:text-black h-4 w-4 mt-2 mr-2 p-1
                    text-[.7rem] bg-closeA dark:bg-text dark:rounded-none
                    leading-[.1rem]" onClick={()=>deleteForum(x.id)}>X</button>
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
        const prep = imageTest.length +1 + regMatch[0]
        const newForum = await forumServices.newForum({text:text, image:prep})
        await imageServices.createOrder({file: e.target[1].files})
        setText('')
        setImage('')
        update()
        change()
    }

    return(
        <div className="w-full bg-backA text-textA dark:text-text dark:bg-back py-4 px-4 flex flex-col gap-4">
            <form id="newForumForm" onSubmit={sendIt} className="bg-cardAltA dark:bg-cardAlt p-4 flex flex-col gap-4 rounded-2xl dark:rounded-none">
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                    <span>Title: </span>
                    <textarea
                    className="bg-mainA dark:bg-main w-full"
                    rows={4}
                    cols={35}
                    value={text}
                    onChange={({target})=>setText(target.value)}
                    />
                </div>
                <div className="flex justify-between">
                    <input className="bg-mainA dark:bg-main w-full" type="file" />                  
                </div>
            </form>
            <div className="flex justify-between gap-4">
                <button className="bg-cardAltA dark:bg-cardAlt w-full dark:rounded-none h-8 leading-[.5rem]" onClick={()=>change()}>Cancel</button>
                <button className="bg-cardAltA dark:bg-cardAlt w-full dark:rounded-none h-8 leading-[.5rem]" type="submit" form="newForumForm">Confirm</button>
            </div>
        </div>
    )
}

export const AdminForum = ({userUpdate}) =>{
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
            <div className="w-full bg-backA dark:bg-back p-2">
                <button className="bg-cardAltA dark:bg-cardAlt px-4 py-2 dark:rounded-none text-textA dark:text-text" 
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
            <MainForum forumList={forumList} update={()=>forumCheck()}/>
        </div>

    )
}