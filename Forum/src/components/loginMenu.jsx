import { Link } from "react-router-dom"
import loginServices from "../services/login"
import { LoginMenuTheme } from "../theme"

export const LoginMenu = ({user}) =>{
  if(user){
    return(
      <></>
    )
  }else{
    return(
      //text changes only for differentiating dark mode from light and viewport size
      <div className={LoginMenuTheme.main}>
          <Link className={LoginMenuTheme.link} to='/login'>Login</Link>
          <Link className={LoginMenuTheme.link} to='/forum'>Forum</Link>
          <Link className={LoginMenuTheme.link} to='/signUp'>SignUp</Link>
      </div>
    )
  }
}