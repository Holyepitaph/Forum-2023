import { Link } from "react-router-dom"
import loginServices from "../services/login"

export const LoginMenu = ({logoutFunction,user}) =>{
  
  const logout = async () =>{
    await loginServices.logout()
    logoutFunction()
  }

  if(user){
    return(
      <div>
          <button onClick={()=>logout()}>Logout</button>
      </div>
    )
  }else{
    return(
      <div>
          <Link to='/login'> Login </Link>
          <Link to='/signUp'> SignUp </Link>
      </div>
    )
  }
}