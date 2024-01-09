import { Link } from "react-router-dom"


export const AdminMenu = () =>{

    return(
        <div>
                <Link to='/'> Home /</Link>
                <Link to='/admin'> Admin Main /</Link>
                <Link to='/admin/Forum'> Admin Main Forum /</Link>
                <Link to='/admin/Messages'> Admin Message /</Link>
                <Link to='/admin/Host'> Admin Host /</Link>
                <Link to='/admin/User'> Admin User List </Link>
        </div>
    )
}