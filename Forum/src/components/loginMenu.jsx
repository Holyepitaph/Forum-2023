import { Link } from "react-router-dom"
import loginServices from "../services/login"

export const LoginMenu = ({logoutFunction}) =>{
  
  const logout = async () =>{
    await loginServices.logout()
    logoutFunction()
  }
  
  return(
    <div>
        <Link to='/login'> Login </Link>
        <Link to='/signUp'> SignUp </Link>
        <button onClick={()=>logout()}>Logout</button>
    </div>
  )}