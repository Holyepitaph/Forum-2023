import { useState } from "react"
import userServices from '../services/user'

export const SignUp = () =>{
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password,setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const [error, setError] = useState('')

    const sendIt = async (e) =>{
        const reset = () =>{
            setUsername('')
            setName('')
            setPassword('')
            setRepassword('')
        }
        e.preventDefault()
        if(password == repassword){
            const newUser = {
                username: username,
                name:name,
                password: password
            }
            await userServices.newUser(newUser)
            setError(`New User '${username}' has been Created`)
            setTimeout(() => {
                setError(null)
              }, 5000)
            reset()
        } else if(password != repassword){
            setError("Passwords do not match")
            setTimeout(() => {
                setError(null)
              }, 5000)
            setPassword('')
            setRepassword('')
        } else {
            setError("Unknown Error has occured")
            setTimeout(() => {
                setError(null)
              }, 5000)
              reset()
        }
    }

    return(
        <div>
            <div>Create New User</div>
            <div>{error}</div>
            <form onSubmit={sendIt}>
                <div>
                  <span >Username:</span>
                  <input 
                    type='text'
                    value={username}
                    required
                    onChange={({target})=>setUsername(target.value)}
                  />
                </div>
                <div>
                  <span >Name:</span>
                  <input 
                    type='text'
                    value={name}
                    required
                    onChange={({target})=>setName(target.value)}
                  />
                </div>
                <div>
                  <span >Password:</span>
                  <input 
                    type='password'
                    value={password}
                    required
                    onChange={({target})=>setPassword(target.value)}
                  />
                </div>
                <div>
                  <span >Re-enter Password:</span>
                  <input 
                    type='password'
                    value={repassword}
                    required
                    onChange={({target})=>setRepassword(target.value)}
                  />
                </div>
                <button>Create User</button>
            </form>
        </div>
    )
}