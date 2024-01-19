import { Link } from "react-router-dom"
import { LogoutButton } from "../logout"
import {MenuTheme} from '../../theme'

export const AdminMenu = ({logoutFunction}) =>{

    return(
        <div className={MenuTheme.main}>
                <Link className={MenuTheme.link} to='/admin/Host'>Host</Link>
                <Link className={MenuTheme.link} to='/admin/Forum'>Forum</Link>
                <Link className={MenuTheme.link} to='/admin/Messages'>Message</Link>
                <Link className={MenuTheme.link} to='/admin/User'>Users</Link>
                <LogoutButton logoutFunction={()=>logoutFunction()}
                 style={MenuTheme.linkAltB}/>
        </div>
    )
}