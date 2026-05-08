import './App.css'
import {Routes, Route, Navigate, Outlet} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Groups from './components/Groups'
import DMS from './components/DMS'
import Profile from './components/Profile'
import DM from './components/DM'
import {useState, useEffect} from 'react'


 


type User = {
  user_id: string,
  username: string,
}
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const [user, setUser] = useState<User | null>(null)
  function AuthCheckDashboard() {
    return isLoggedIn ? <Outlet /> : <Navigate to='/login' replace/>
  }

  function AuthCheckLoginRegister() {
    return isLoggedIn ? <Navigate to='/dashboard' replace/> : <Outlet />
  }


  

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
            <Route path='dms' element={<DMS setIsLoggedIn={setIsLoggedIn}/>}>
              <Route path=':id' element={<DM user={user} />}/>
            </Route>
            <Route path='groups' element={<Groups />}/>
            <Route path='profile' element={<Profile />}/>
          </Route>
          
        </Route>

        <Route element={<AuthCheckLoginRegister />}>
          <Route path='/login' element={<Login setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/register' element={<Register setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>} />
        </Route>

        <Route path='*' element={<div>Page does not exist</div>} />

      </Routes>
    </div>
  )
}

export default App
