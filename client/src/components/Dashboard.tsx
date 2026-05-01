import Navbar from './Navbar'
import {Outlet} from 'react-router-dom'

import '../css/Dashboard.css'

export default function Dashboard() {
    return (
        <div className='dash-container'>
            <Navbar />
            <Outlet />
        </div>
    )
}