import Navbar from './Navbar'
import {Outlet} from 'react-router-dom'
import {useState, useEffect} from 'react'
import '../css/Dashboard.css'
// import {io} from 'socket.io-client'

type User = {
    userID: number,
    username: string
}

type Props = {
    user?: User
}

export default function Dashboard(props: Props) {

    const [header, setHeader] = useState<string | null>(null)
    // const socket = io('http://localhost:3001');
    // socket.on('hello', (arg) =>{
    //     console.log('you connect with id:', socket.id)
    //     console.log(arg)
    // })

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