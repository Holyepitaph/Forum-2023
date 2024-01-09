import { Link } from "react-router-dom"
import loginServices from "../services/login"

export const TempMenu = ({logoutFunction}) =>{
  
  const logout = async () =>{
    await loginServices.logout()
    logoutFunction()
  }
  
  return(
    <div>
    <Link to='/'> Home </Link>
    <Link to='/admin'> Admin Main </Link>
    <Link to='/admin/Forum'> Admin Main Forum </Link>
    <Link to='/admin/Forum/Post'> Admin Forum Post Test </Link>
              {/*Post Id defaulted to 1 for testing should be :postId*/}
    <Link to='/admin/Forum/Post/3'> Admin Single Post Test </Link>
    <Link to='/admin/Messages'> Admin Message </Link>
    <Link to='/admin/Messages/2'>Admin Message Single Test </Link>
    <Link to='/admin/Host'> Admin Host </Link>
    <Link to='/admin/User'> Admin User List </Link>
    <Link to='/admin/User/:userId'> Admin User Single Test </Link>

    <Link to='/user'> User </Link>
    <Link to='/user/Forum'> User Forum </Link>
    <Link to='/user/Forum/Post'> User Forum Post </Link>
    <Link to='/user/Forum/Post/:postId'> User Forum Post Single </Link>
    <Link to='/user/Messages'> User Message </Link>
    <Link to='/user/Messages/:messageId'>User Message Single </Link>
    <Link to='/user/User'> User Self </Link>
    <Link to='/user/User/:userId'> Other User </Link>

    <Link to='/login'> Login </Link>
    <Link to='/signUp'> SignUp </Link>
    <button onClick={()=>logout()}>Logout</button>
    </div>
  )}