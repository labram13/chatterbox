import './App.css'
import {Routes, Route, Navigate, Outlet} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import {useState, useEffect} from 'react'





function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect( () => {

    UserAuth()

    setIsLoggedIn(false)

  }, [])

  async function UserAuth () {
    const response = await fetch('http://localhost:3001/api/user/verify', {
      method: 'POST', 
      credentials: 'include'
    })

    const responseJson = await response.json()
    console.log(responseJson.status)

 
  }

  function AuthCheckDashboard() {
    return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
  }

  function AuthCheckLoginRegister() {
    return isLoggedIn ? <Navigate to='/dashboard' /> : <Outlet />
  }

  return (
    <div className="container">
      <Routes>

        <Route element={<AuthCheckDashboard />}>
          <Route path='/' element={<Navigate to='/dashboard' />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Route>

        <Route element={<AuthCheckLoginRegister />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App
