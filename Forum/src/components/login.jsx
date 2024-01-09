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
        <div>
      <form  onSubmit={sendIt}>
        <div>
          <span >Username:</span>
          <input 
            type='text'
            value={username}
            onChange={({target})=>setUsername(target.value)}
          />
        </div>
        <div>
          <span className="mr-4">Password: </span>
          <input
            type="password"
            value={password}
            onChange={({target})=>setPassword(target.value)}
          />
        </div>
        <button id="loginSubmit" type="submit">
          Login
        </button>
      </form>
        </div>
    )
}