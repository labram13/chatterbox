import {  useEffect } from "react"
import {useOutletContext, Outlet} from 'react-router-dom'
import '../css/DM.css'


type Message = {
    message_id: string,
    fk_dm: string,
    context: string,
    sender: string,
    created_at: Date
}

type HeaderContext = {
    setHeader: React.Dispatch<React.SetStateAction<string>>
}

export default function DM() {
    const {setHeader} = useOutletContext<HeaderContext>()
    useEffect(() => {
        setHeader('DM')
    })

    return (
        <div>test</div>
    )
}