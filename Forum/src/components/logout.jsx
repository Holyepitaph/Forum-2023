import loginServices from "../services/login"


export const LogoutButton = ({logoutFunction,style}) =>{
    const logout = async () =>{
        await loginServices.logout()
        logoutFunction()
      }
      return(
        <button onClick={()=>logout()} className={style}>Logout</button>
      )
}