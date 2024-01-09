import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import postServices from '../../services/post'
import commentServices from '../../services/comment'

const SubComment = ({sub,comment, update}) =>{
    const [hidden, setHidden] = useState(false)

    return(
        <div>
            <div>Sub Comments: </div>
            {hidden ? <InputSubComment id={comment} update={()=>update()} hidden={()=>setHidden(false)}/> : <button onClick={()=>setHidden(true)}>New Comment</button>}
            {sub.Sub.map(x=>(
                <div key={x.id}>
                    <br/>
                    <div>{x.text}</div>
                    <div>{x.link}</div>
                    <div>{x.image}</div>
                    <div>{x.created}</div>
                </div>
            ))}
        </div>
    )
}

const MainPost = ({singlePost, change, update, id}) => {
    const [hidden, setHidden] = useState(false)

    const inputFunction = () =>{
        change()
        update()
    }

    return(
        <div>
            {singlePost.map(x=>(
                <div key={x.id}>
                    <div>Post Name: {x.text}</div>
                    <div>Created on: {x.created}</div>
                    <Link>User: {x.userId}</Link>
                    <div>Comments: </div> 
                    {hidden ? <InputComment change={()=>inputFunction()} id={id} update={()=>update()} hidden={()=>setHidden(false)}/> : <button onClick={()=>setHidden(true)}>New Comment</button>}
                    <div>{x.comments.map(x=>(
                        <div key={x.id}>
                            <br/>
                            <div>{x.image}</div>
                            <div>{x.text}</div>
                            <div>{x.link}</div>
                            <SubComment sub={x} comment={x.id} update={()=>update()}/>
                        </div>
                    ))}</div>
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
    }

    return(
        <div>
            <form onSubmit={sendIt}>
                <div>
                    <span>Comment: </span>
                    <input
                    type="text"
                    value={text}
                    onChange={({target})=>setText(target.value)}
                    />
                </div>
                <div>
                    <span>Link: </span>
                    <input
                    type="text"
                    value={link}
                    onChange={({target})=>setLink(target.value)}
                    />
                </div>
                <div>
                    <span>Change Later for Uploads: </span>
                    <input
                    type="text"
                    value={image}
                    onChange={({target})=>setImage(target.value)}
                    />
                </div>
                <button>Create New Comment</button>
            </form>
            <button onClick={()=>hidden()}>Cancel</button>
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
        <div>
            <form onSubmit={sendIt}>
                <div>
                    <span>Comment: </span>
                    <input
                    type="text"
                    value={text}
                    onChange={({target})=>setText(target.value)}
                    />
                </div>
                <div>
                    <span>Link: </span>
                    <input
                    type="text"
                    value={link}
                    onChange={({target})=>setLink(target.value)}
                    />
                </div>
                <div>
                    <span>Change Later for Uploads: </span>
                    <input
                    type="text"
                    value={image}
                    onChange={({target})=>setImage(target.value)}
                    />
                </div>
                <button>Create New Comment</button>
            </form>
            <button onClick={()=>hidden()}>Cancel</button>
        </div>
    )
}


export const UserPost = ({userUpdate}) =>{
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
            <MainPost singlePost={singlePost} update={()=>postCheck()} id={id}/>
        </div>

    )
}