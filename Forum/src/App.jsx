import { useState, useEffect } from 'react'
import './App.css'
import { TempMenu } from './components/tempMenu'

import { AdminMain } from './components/Admin/main'
import { AdminForum } from './components/Admin/forum'



import { LoginPage } from './components/login'
import { SignUp } from './components/signUp'

import loginServices from './services/login'
import userServices from './services/user'
import { categoriesTest } from './util'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom"
import { AdminForumPosts } from './components/Admin/forumPosts'
import { AdminPost } from './components/Admin/post'
import { AdminMessage } from './components/Admin/messages'
import { AdminMessageSingle } from './components/Admin/messageSingle'
import { AdminHost } from './components/Admin/host'
import { AdminUserList } from './components/Admin/userList'
import { AdminUserSingle } from './components/Admin/userSingle'
import { UserMain } from './components/User/main'
import { UserForum } from './components/User/forum'
import { UserForumPost } from './components/User/forumPost'
import { UserPost } from './components/User/post'
import { UserMessage } from './components/User/messages'
import { UserMessageSingle } from './components/User/messageSingle'
import { UserUserList } from './components/User/userList'
import { UserUserSingle } from './components/User/userSingle'
import { LoginMenu } from './components/loginMenu'
import { AdminMenu } from './components/Admin/menu'
import { UserMenu } from './components/User/menu'
import { BlankMenu } from './components/blankMenu'

const MenuLogic = ({admin}) =>{
  if(admin == undefined){
    return(
      <BlankMenu/>
    )
  } else if(admin == true){
    return <AdminMenu/>
  } else{
    return <UserMenu/>
  }

}

function App() {
  const [updateCheck, setUpdateCheck] = useState(false)
  const [userStatus, setUserStatus] = useState('')
  const [status, setStatus] = useState('')


  useEffect(()=>{
    const categoriesTesta = async () =>{ 
      const userCheck = await loginServices.check()
      if(userCheck == 'Not Logged In' || userCheck == 'Removed Token'){
        return setUserStatus('')
      } else {
        const userUpdate = await userServices.get()
        return setUserStatus(userUpdate)
      }
    }
    categoriesTesta()
    setUpdateCheck(false)
  },[updateCheck])

  const userUpdate = async () =>{
    setUpdateCheck(true)
  }

  const logoutFunction = () =>{setUserStatus("")}

  const Test = () =>(
    <div>
      <div>Test A</div>
    </div>
  )
  const TestB = () =>(
    <div>
      <div>Test B</div>
    </div>
  )
  const TestC = () =>(
    <div>
      <div>Test C</div>
    </div>
  )

    // if(!userStatus){
    //   return(
    //     <Router>
    //       <Routes>
    //         <Link to='/login'> Login </Link>
    //         <Link to='/signUp'> SignUp </Link>
    //         <Route path="/login" element={<LoginPage userUpdate={userUpdate}/>} />
    //         <Route path="/signUp" element={<SignUp/>} />
    //         <div>Loading</div>  
    //       </Routes>
    //     </Router>
    //   )
    // }

  return (
    <>
      {/* <TempMenu/> */}
      <Router>
      {/* {userStatus.admin ? <AdminMenu/> : <UserMenu/>} */}
      <MenuLogic admin={userStatus.admin}/>
      <LoginMenu logoutFunction={logoutFunction}/>
        <Routes>
    {/* Admin Routes */}
          <Route path="/admin" element={userStatus.admin ? <AdminMain userUpdate={userUpdate}/>: <Navigate replace to="/" />} />
          <Route path="/admin/Forum" element={userStatus.admin ? <AdminForum userUpdate={userUpdate}/> : <Navigate replace to="/" />} />
          <Route path="/admin/Forum/:forumId" element={userStatus.admin ? <AdminForumPosts userUpdate={userUpdate}/> : <Navigate replace to="/" />} />   
          <Route path="/admin/Forum/Post/:postId" element={userStatus.admin ? <AdminPost userUpdate={userUpdate}/> : <Navigate replace to="/" />} />
          <Route path="/admin/Messages" element={userStatus.admin ? <AdminMessage userUpdate={userUpdate} user={userStatus.id}/> : <Navigate replace to="/" />} />
          <Route path="/admin/Messages/:messageId" element={userStatus.admin ? <AdminMessageSingle userUpdate={userUpdate} user={userStatus.id}/> : <Navigate replace to="/" />} />
          <Route path="/admin/Host" element={userStatus.admin ? <AdminHost userUpdate={userUpdate} user={userStatus.id}/> : <Navigate replace to="/" />} />
          <Route path="/admin/User" element={userStatus.admin ? <AdminUserList userUpdate={userUpdate}/> : <Navigate replace to="/" />} />
          <Route path="/admin/User/:userId" element={userStatus.admin ? <AdminUserSingle userUpdate={userUpdate} user={userStatus.id}/> : <Navigate replace to="/" />} />
    {/* User Routes */}
          <Route path="/user" element={userStatus.admin == false ? <UserMain userUpdate={userUpdate}/> : <Navigate replace to="/" />} />
          <Route path="/user/Forum" element={userStatus.admin == false ? <UserForum userUpdate={userUpdate}/> : <Navigate replace to="/" />} />
          <Route path="/user/Forum/:forumId" element={userStatus.admin == false ? <UserForumPost userUpdate={userUpdate}/> : <Navigate replace to="/" />} />
          <Route path="/user/Forum/Post/:postId" element={userStatus.admin == false ? <UserPost userUpdate={userUpdate}/> : <Navigate replace to="/" />} />
          <Route path="/user/Messages" element={userStatus.admin == false ? <UserMessage userUpdate={userUpdate} user={userStatus.id}/> : <Navigate replace to="/" />} />
          <Route path="/user/Messages/:messageId" element={userStatus.admin == false ? <UserMessageSingle userUpdate={userUpdate} user={userStatus.id}/> : <Navigate replace to="/" />} />
          <Route path="/user/User" element={userStatus.admin == false ? <UserUserList userUpdate={userUpdate}/> : <Navigate replace to="/" />} />
          <Route path="/user/User/:userId" element={userStatus.admin == false ? <UserUserSingle userUpdate={userUpdate}/> : <Navigate replace to="/" />} />
          <Route path="/" element={ <Test/> } />
          <Route path="/login" element={<LoginPage userUpdate={userUpdate}/>} />
          <Route path="/signUp" element={<SignUp/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
