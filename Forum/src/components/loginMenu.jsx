import { Link } from "react-router-dom"
import loginServices from "../services/login"

export const LoginMenu = ({user}) =>{
  if(user){
    return(
      <></>
    )
  }else{
    return(
      //text changes only for differentiating dark mode from light and viewport size
      <div className="flex gap-4 justify-center">
          <Link className="bg-backA dark:bg-back p-2" to='/login'> Login </Link>
          <Link className="bg-backA dark:bg-back p-2" to='/signUp'> SignUp </Link>
      </div>
    )
  }
}