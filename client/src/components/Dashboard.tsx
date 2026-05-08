import Navbar from './Navbar'
import {Outlet} from 'react-router-dom'
import {useState} from 'react'
import '../css/Dashboard.css'

type User = {
    userID: number,
    username: string
}

type Props = {
    user?: User
}

export default function Dashboard(props: Props) {

    const [header, setHeader] = useState<string | null>(null)
    return (
        <div className='dash-container'>
            <h1 className='dash-header'>{header}</h1>
            <Navbar />
            <main>
                <Outlet context={{setHeader}}/>
            </main>
            
            
        </div>
    )
}