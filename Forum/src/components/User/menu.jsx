import { Link } from "react-router-dom"
import { LogoutButton } from "../logout"

export const UserMenu = ({logoutFunction}) =>{

    return(
        <div>
            <Link to='/user'> User /</Link>
            <Link to='/user/Forum'> User Forum /</Link>
            <Link to='/user/Messages'> User Message /</Link>
            <Link to='/user/User'> User List /</Link>
            <LogoutButton logoutFunction={()=>logoutFunction()}
            style={"bg-cardAltA dark:bg-cardAlt p-1 dark:rounded-none rounded-3xl dark:rounded-none"}/>

        </div>
    )
}