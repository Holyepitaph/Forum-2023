import { Link } from "react-router-dom"


export const UserMenu = () =>{

    return(
        <div>
            <Link to='/user'> User /</Link>
            <Link to='/user/Forum'> User Forum /</Link>
            <Link to='/user/Messages'> User Message /</Link>
            <Link to='/user/User'> User List /</Link>
        </div>
    )
}