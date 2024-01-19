import { Link } from "react-router-dom"
import { LogoutButton } from "../logout"
import {MenuTheme} from '../../theme'

export const UserMenu = ({logoutFunction}) =>{

    return(
        <div className={MenuTheme.main}>
            <Link className={MenuTheme.link} to='/user'>Host</Link>
            <Link className={MenuTheme.link} to='/user/Forum'>Forum</Link>
            <Link className={MenuTheme.link} to='/user/Messages'>Message</Link>
            <Link className={MenuTheme.link} to='/user/User'>Users</Link>
            <LogoutButton logoutFunction={()=>logoutFunction()}
            style={MenuTheme.linkAltB}/>
        </div>
    )
}