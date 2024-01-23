import { useState } from "react"
import userServices from '../services/user'
import { SignUpTheme, InputTheme } from "../theme"

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
        <div className={SignUpTheme.main}>
          <div className={SignUpTheme.card}>
            <div className="text-2xl font-semibold">Create New User</div>
            {error ? <div className="text-[#D2042D] font-semibold">{error}</div> : null}
            <form className={SignUpTheme.card} onSubmit={sendIt}>
                <div className={InputTheme.alt}>
                  <span className={SignUpTheme.text} >Username:</span>
                  <input 
                    type='text'
                    value={username}
                    className={InputTheme.main}
                    required
                    onChange={({target})=>setUsername(target.value)}
                  />
                </div>
                <div className={InputTheme.alt}>
                  <span  className={SignUpTheme.text} >Name:</span>
                  <input 
                    type='text'
                    value={name}
                    className={InputTheme.main}
                    required
                    onChange={({target})=>setName(target.value)}
                  />
                </div>
                <div className={InputTheme.alt}>
                  <span  className={SignUpTheme.text} >Password:</span>
                  <input 
                    type='password'
                    value={password}
                    className={InputTheme.mainAlt}
                    required
                    onChange={({target})=>setPassword(target.value)}
                  />
                </div>
                <div className={InputTheme.alt}>
                  <span  className={SignUpTheme.text} >Re-enter Password:</span>
                  <input 
                    type='password'
                    value={repassword}
                    className={InputTheme.main}
                    required
                    onChange={({target})=>setRepassword(target.value)}
                  />
                </div>
                <button className={SignUpTheme.button}>Create User</button>
            </form>
          </div>
        </div>
    )
}