import { Link } from "react-router-dom"
import { LogoutButton } from "../logout"

export const AdminMenu = ({logoutFunction}) =>{

    return(
        <div className="w-full bg-backA dark:bg-back text-textA dark:text-text p-2 px-4 flex justify-between gap-2">
                <Link className="bg-cardAltA dark:bg-cardAlt p-1 rounded-3xl dark:rounded-none" to='/'>Home</Link>
                <Link className="bg-cardAltA dark:bg-cardAlt p-1 rounded-3xl dark:rounded-none" to='/admin'>Main</Link>
                <Link className="bg-cardAltA dark:bg-cardAlt p-1 rounded-3xl dark:rounded-none" to='/admin/Forum'>Forum</Link>
                <Link className="bg-cardAltA dark:bg-cardAlt p-1 rounded-3xl dark:rounded-none" to='/admin/Messages'>Message</Link>
                <Link className="bg-cardAltA dark:bg-cardAlt p-1 rounded-3xl dark:rounded-none" to='/admin/Host'>Host</Link>
                <Link className="bg-cardAltA dark:bg-cardAlt p-1 text-[1.5vw]  rounded-3xl dark:rounded-none" to='/admin/User'>User List</Link>
                <LogoutButton logoutFunction={()=>logoutFunction()}
                 style={"bg-cardAltA dark:bg-cardAlt p-1 dark:rounded-none rounded-3xl dark:rounded-none"}/>
        </div>
    )
}