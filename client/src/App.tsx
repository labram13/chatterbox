import './App.css'
import {Routes, Route, Navigate, Outlet} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Groups from './components/Groups'
import DMS from './components/DMS'
import Profile from './components/Profile'
import {useState, useEffect} from 'react'

 



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  function AuthCheckDashboard() {
    return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
  }

  function AuthCheckLoginRegister() {
    return isLoggedIn ? <Navigate to='/dashboard' /> : <Outlet />
  }

  

  useEffect( () => {
   (async () => {
     const response = await fetch('/api/user/verify', {
      method: 'POST', 
      credentials: 'include'
    })
    setIsLoggedIn(response.ok)
   })()

  }, [])

   if (isLoggedIn === null) {
    return <div>Loading...</div>
  }

 

  return (
    <div className="container">
      <Routes>

        <Route element={<AuthCheckDashboard />}>
          <Route path='/' element={<Navigate to='/dashboard' />}/>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to='dms'/>} />
            <Route path='dms' element={<DMS />}/>
            <Route path='groups' element={<Groups />}/>
            <Route path='profile' element={<Profile />}/>
          </Route>
          
        </Route>

        <Route element={<AuthCheckLoginRegister />}>
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/register' element={<Register setIsLoggedIn={setIsLoggedIn}/>} />
        </Route>

        {/* <Route path='*' element={<div>Page does not exist</div>} /> */}

      </Routes>
    </div>
  )
}

export default App
