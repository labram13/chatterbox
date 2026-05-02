import Navbar from './Navbar'
import {Outlet} from 'react-router-dom'
import {useState} from 'react'

import '../css/Dashboard.css'

export default function Dashboard() {

    const [header, setHeader] = useState<string | null>(null)
    return (
        <div className='dash-container'>
            <h1>{header}</h1>
            <Navbar />
            <main>
                <Outlet context={{setHeader}}/>
            </main>
            
            
        </div>
    )
}