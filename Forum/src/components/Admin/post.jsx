import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import postServices from '../../services/post'
import commentServices from '../../services/comment'
import userServices from '../../services/user'


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

const SubComment = ({sub,comment, update}) =>{
    const [hidden, setHidden] = useState(false)

    const deleteSubComment =async (info) =>{
        await commentServices.deleteComment({id:info})
        update()
    }

    return(
        <div>
            <button className="dark:text-black h-4 my-2 mr-2 p-1
            text-[.7rem] bg-closeA dark:bg-text dark:rounded-none
            leading-[.1rem]"  onClick={()=>setHidden( hidden ? false: true)}
            >{!hidden ? "Comment" : "Cancel"}</button>
            {hidden ? <InputSubComment id={comment} update={()=>update()} hidden={()=>setHidden(false)}/> : null}
            <div  className="ml-4 mb-4 flex flex-col gap-4">
            {sub.Sub.map(x=>(
                <div key={x.id} className="bg-cardAltA dark:bg-cardAlt grid grid-cols-12 justify-between px-4 py-2 rounded-l-2xl">
                    <img src={x.image} alt={x.image} className="col-span-12 sm:col-span-2 h-24 bg-closeA dark:bg-card"/>
                    <div className="col-span-11 sm:col-span-9 w-full flex flex-col justify-between py-2">
                        <div>{x.text}</div>
                        <div className="flex gap-4 text-sm">
                            <div>{x.link}</div>
                            <div>{x.created}</div>
                            <Link to={`/admin/User/${x.userId}`}>
                                <div>User: <IdToUserName info={x.userId}/></div>
                            </Link>
                        </div>
                    </div>
                    <button className="dark:text-black h-4 mt-2 mr-2 p-1
                    text-[.7rem] bg-closeA dark:bg-text dark:rounded-none
                    leading-[.1rem]"  onClick={()=>deleteSubComment(x.id)}>X</button>

                </div>
            ))}
            </div>
        </div>
    )
}

const MainPost = ({singlePost, change, update, id}) => {
    const [hidden, setHidden] = useState(false)
    const [subHidden, setSubHidden] = useState(false)

    const inputFunction = () =>{
        change()
        update()
    }

    const commentDelete =async (info) =>{
        await commentServices.deleteComment({id:info})
        update()
    }

    const NewCommentButton = () =>(
        <div className="bg-backA dark:bg-back">
            <button className="bg-cardAltA dark:bg-cardAlt dark:rounded-none my-4 py-1" 
            onClick={()=>setHidden(true)}>New Comment</button>
        </div>
    )


    return(
        <div className="mt-4 text-textA dark:text-text">
            {singlePost.map(x=>(
                <div key={x.id} className="flex flex-col gap-4 ">
                    <div className="bg-backA dark:bg-back p-6 ">
                        <div className="bg-cardAltA dark:bg-cardAlt p-4 flex flex-col gap-4 rounded-2xl dark:rounded-none  min-w-0 px-2">
                            <div>{x.text}</div>
                            <div className="flex justify-between px-6">
                                <div>Created on: {x.created}</div>
                                <Link to={`/admin/User/${x.userId}`}>User: <IdToUserName info={x.userId}/></Link>
                            </div>
                        </div>
                    </div>
                    {hidden ? <InputComment change={()=>inputFunction()} id={id} update={()=>update()}
                     hidden={()=>setHidden(false)}/> : 
                     <NewCommentButton/>}
                    <div className="bg-backA dark:bg-back p-6 flex flex-col gap-4 ">
                        {x.comments.map(x=>(
                            <div key={x.id} className="bg-cardA dark:bg-card rounded-2xl dark:rounded-none ">
                                <br/>
                                <div className="grid grid-cols-12 pb-4 px-4  min-w-0 px-2">
                                    <img src={x.image} alt={x.image} className="col-span-12 sm:col-span-2 h-24 bg-closeA dark:bg-cardAlt"/>
                                    <div className="col-span-11 sm:col-span-9 flex flex-col justify-between w-full py-2">
                                        <div>{x.text}</div>
                                        <div className="flex justify-between w-full px-4 gap-2">
                                            <div>{x.link}</div>
                                            <Link to={`/admin/User/${x.userId}`}>
                                                <div>User:<IdToUserName info={x.userId}/></div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="dark:text-black h-4 mt-2 mr-2 p-1
                                        text-[.7rem] bg-closeA dark:bg-text dark:rounded-none
                                        leading-[.1rem]" 
                                         onClick={()=>commentDelete(x.id)}>X</button>
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
    const [image, setImage] = useState('')

    const sendIt = async (e) =>{
        e.preventDefault()
        const newForum = await commentServices.newComment({text:text,link:link, image:image,postId: id})
        setText('')
        setLink('')
        setImage('')
        update()
        hidden()
    }

    return(
        <div className="bg-backA dark:bg-back p-4 flex flex-col gap-4">
            <form id="newCommentForm" onSubmit={sendIt} className="bg-cardAltA dark:bg-cardAlt p-4 flex flex-col gap-4 rounded-xl dark:rounded-none">
                <div className="flex flex-col sm:flex-row gap-4">
                    <span>Comment: </span>
                    <textarea
                    type="text"
                    rows={4}
                    cols={30}
                    className="w-full bg-mainA dark:bg-main"
                    value={text}
                    onChange={({target})=>setText(target.value)}
                    />
                </div>
                <div className="flex gap-4">
                    <span>Link: </span>
                    <input
                    type="text"
                    value={link}
                    className="w-full bg-mainA dark:bg-main"
                    onChange={({target})=>setLink(target.value)}
                    />
                </div>
                <div className="flex gap-4">
                    <input
                    type="text"
                    value={image}
                    className="w-full bg-mainA dark:bg-main"
                    onChange={({target})=>setImage(target.value)}
                    />
                    <span className="bg-cardA dark:bg-card px-4">File...</span>
                </div>
            </form>
            <div className="flex gap-4">
                <button className="bg-cardAltA dark:bg-cardAlt w-full dark:rounded-none h-8 leading-[.5rem]"
                 onClick={()=>hidden()}>Cancel</button>
                <button className="bg-cardAltA dark:bg-cardAlt w-full dark:rounded-none h-8 leading-[.5rem]"
                 type="submit" form="newCommentForm">Create</button>
            </div>
        </div>
    )
}

const InputSubComment = ({id, update, hidden}) =>{
    const [text, setText] = useState('')
    const [link, setLink] = useState('')
    const [image, setImage] = useState('')

    const sendIt = async (e) =>{
        e.preventDefault()
        const newForum = await commentServices.newSubComment({text:text,link:link, image:image,postId: id})
        setText('')
        setLink('')
        setImage('')
        update()
        hidden()
    }

    return(
        <div className="mx-4">
            <form id="newSubCommentForm" onSubmit={sendIt} className="bg-cardAltA dark:bg-cardAlt p-4 flex flex-col gap-4 rounded-xl dark:rounded-none">
                <div className="flex flex-col sm:flex-row gap-4">
                    <span>Comment: </span>
                    <textarea
                    type="text"
                    className="w-full bg-mainA dark:bg-main"
                    rows={4}
                    cols={30}
                    value={text}
                    onChange={({target})=>setText(target.value)}
                    />
                </div>
                <div className="flex gap-4">
                    <span>Link: </span>
                    <input
                    type="text"
                    className="w-full bg-mainA dark:bg-main"
                    value={link}
                    onChange={({target})=>setLink(target.value)}
                    />
                </div>
                <div className="flex gap-4">
                    <input
                    type="text"
                    className="w-full bg-mainA dark:bg-main"
                    value={image}
                    onChange={({target})=>setImage(target.value)}
                    />
                    <span className="bg-cardA dark:bg-card px-4 rounded-2xl dark:rounded-none">File...</span>
                </div>
            </form>
            <div className="flex gap-2 py-4">
                    <button className="bg-cardAltA px-0 dark:bg-cardAlt w-full dark:rounded-none h-8 leading-[.5rem]" 
                    onClick={()=>hidden()}>Cancel</button>
                    <button className="bg-cardAltA px-0 dark:bg-cardAlt w-full dark:rounded-none h-8 leading-[.5rem]"
                     type="submit" form="newSubCommentForm">Create</button>
            </div>
        </div>
    )
}


export const AdminPost = ({userUpdate}) =>{
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