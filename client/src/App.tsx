import './App.css'
import {Routes, Route, Navigate, Outlet} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'



function isAuthenticated() {
  return false
}

function AuthCheckDashboard() {

  return isAuthenticated() ? <Outlet /> : <Navigate to='/login'/>
}

function AuthCheckLoginRegister() {
  return isAuthenticated() ? <Navigate to='/dashboard' /> : <Outlet /> 
}

function App() {

  return (
    <div className="container">
      <Routes>
        <Route path='/' element={<Navigate to={isAuthenticated() ? '/dashboard' : '/login'} />}/>

        <Route element={<AuthCheckDashboard />}>
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
