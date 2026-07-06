import '../css/DM.css'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function DMPrep() {
    const location = useLocation()
    const user = location.state ?? ''
    console.log(user)
    // useEffect(() => {
    //     console.log(user)
    // })
    return (
        <div className='dm-page-container'>
            <h1>header</h1>
            <div>content</div>
            <input />
        </div>
    )
}