import { useState, useEffect } from "react"
import loginServices from '../services/login'

export const LoginPage = ({userUpdate}) =>{
    const [username, setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(()=>{
      userUpdate()
  },[])

    const sendIt = async (e) =>{
    try{
      e.preventDefault()
      await loginServices.login(
          {username: username,
          password: password}
      )
      userUpdate()
        setUsername('')
        setPassword('')
    }catch{
      setError("Login Failed Please Check Information")
      setTimeout(() => {
          setError(null)
        }, 5000)
    }
    }


    return(
        <div className="bg-backA dark:bg-back p-4 text-textA dark:text-text">
      <form className="bg-cardA dark:bg-card p-4 flex flex-col gap-4"  onSubmit={sendIt}>
        {error ? <div className="text-[#D2042D] font-semibold">{error}</div> : null}
        <div className="flex gap-4">
          <span  className="p-0.5 px-2 w-20">Username:</span>
          <input 
            type='text'
            value={username}
            className="w-full bg-mainA dark:bg-main pl-2"
            onChange={({target})=>setUsername(target.value)}
          />
        </div>
        <div className="flex gap-4">
          <span  className="p-0.5 px-2 w-20">Password:</span>
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