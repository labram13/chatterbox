import { useState } from "react"
import {useOutletContext} from 'react-router-dom'
import '../css/Dashboard.css'

type Test = {
    visible: boolean
}
export default function DM() {
    
    const {visible} = useOutletContext<Test>()
    console.log('dm state', visible )
    return (
        <div className={visible ? 'dm-window' : 'dm-window hidden'}>
            test
        </div>
    )
}