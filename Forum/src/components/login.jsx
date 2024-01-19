import { useState, useEffect } from "react"
import loginServices from '../services/login'

export const LoginPage = ({userUpdate}) =>{
    const [username, setUsername] = useState('admin')
    const [password,setPassword] = useState('secret')

    useEffect(()=>{
      userUpdate()
  },[])

    const sendIt = async (e) =>{
        e.preventDefault()
        await loginServices.login(
            {username: username,
            password: password}
        )
        userUpdate()
          setUsername('')
          setPassword('')
    }


    return(
        <div className="bg-backA dark:bg-back p-4 text-textA dark:text-text">
      <form className="bg-cardA dark:bg-card p-4 flex flex-col gap-4"  onSubmit={sendIt}>
        <div className="flex gap-4">
          <span  className="p-0.5 px-2">Username:</span>
          <input 
            type='text'
            value={username}
            className="w-full bg-mainA dark:bg-main pl-2"
            onChange={({target})=>setUsername(target.value)}
          />
        </div>
        <div className="flex gap-4">
          <span  className="p-0.5 px-2">Password:</span>
          <input
            type="password"
            className="w-full bg-mainA dark:bg-main pl-2"
            value={password}
            onChange={({target})=>setPassword(target.value)}
          />
        </div>
        <button className="bg-cardAltA dark:bg-cardAlt"
        id="loginSubmit" type="submit">
          Login
        </button>
      </form>
        </div>
    )
}