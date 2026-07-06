import './App.css'
import {Routes, Route, Navigate, Outlet} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Groups from './components/Groups'
import DMS from './components/DMS'
import Profile from './components/Profile'
import DM from './components/DM'
import DMPrep from './components/DMPrep'
import {useState, useEffect, useRef} from 'react'
import {io} from 'socket.io-client'
import type {Socket} from 'socket.io-client'


 


type User = {
  user_id: string,
  username: string,
}
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const socket = useRef<Socket | null>(null)
  function AuthCheckDashboard() {
    return isLoggedIn ? <Outlet /> : <Navigate to='/login' replace/>
  }

  function AuthCheckLoginRegister() {
    return isLoggedIn ? <Navigate to='/dashboard' replace/> : <Outlet />
  }

  useEffect( () => {
    if (isLoggedIn && !socket.current) {
      socket.current = io('http://localhost:3001', {
        withCredentials: true
      })
      // socket.current.on('hello', (arg) => {
      //   console.log(arg)
      // })
    }
    // console.log('test')
    return () => {
      socket.current?.disconnect();
      socket.current = null;
    }
  },[isLoggedIn])
  

  useEffect( () => {
   (async () => {
     const response = await fetch('/api/user/verify', {
      method: 'POST', 
      credentials: 'include'
    })
    const responseJson = await response.json()

    if (!response.ok) {
      setUser(null)
      setIsLoggedIn(false)
      socket.current?.disconnect()
      socket.current = null
      return
    }

    const user: User = {user_id: responseJson.user.user_id.toString(), username: responseJson.user.username}
    setUser(user)
    setIsLoggedIn(true)
   })()

  }, [])

  // console.log("apps", user)


   if (isLoggedIn === null) {
    return <div>Loading...</div>
  }

  


  return (
    <div className="container">
      <Routes>

        <Route element={<AuthCheckDashboard />}>
          <Route path='/' element={<Navigate to='/dashboard' />}/>
          <Route path="/dashboard"  element={<Dashboard />}>
            <Route index element={<Navigate to='dms'/>} />
            <Route path='dms' element={<DMS setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path='groups' element={<Groups />}/>
            <Route path='profile' element={<Profile />}/>
          </Route>
          <Route path='/:id' element={<DM socket={socket} />} />
          <Route path='/new-dm/:id' element={<DMPrep />} />

          
        </Route>

        <Route element={<AuthCheckLoginRegister />}>
          <Route path='/login' element={<Login setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/register' element={<Register setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>} />
        </Route>

        <Route path='*' element={<div>Page does not exist</div>} />
        <Route path='/unauthorized' element={<div>You are not authorized to view this page</div>} />

      </Routes>
    </div>
  )
}

export default App
