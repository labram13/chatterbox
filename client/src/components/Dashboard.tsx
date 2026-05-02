import Navbar from './Navbar'
import {Outlet} from 'react-router-dom'

import '../css/Dashboard.css'

export default function Dashboard() {
    return (
        <div className='dash-container'>
            <h1>Header</h1>
            <Navbar />
            <main>
                <Outlet />
            </main>
            
            
        </div>
    )
}