import {  useEffect } from "react"
import {useOutletContext, useLocation} from 'react-router-dom'
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
    const location = useLocation()
    const {setHeader} = useOutletContext<HeaderContext>()
    const username = location.state.username

    useEffect(() => {
        setHeader(username)
        console.log(username)
    })

    return (
        <div>test</div>
    )
}