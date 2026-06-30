import {  useEffect, useState } from "react"
import { useLocation, useParams, useNavigate} from 'react-router-dom'
import '../css/DM.css'


type Message = {
    message_id: string,
    fk_dm: string,
    context: string,
    username: string,
    created_at: string
}

export default function DM() {
    const location = useLocation()
    const username = location.state?.username ?? ''
    const {id} = useParams();
    const navigate = useNavigate()
    const [messages, setMessages] = useState<Message[]>([])

    useEffect( () => {
        (async () => {
            const response = await fetch(`/api/message/${id}`, {
                method: 'GET',
                credentials: 'include'   
            })

            

            if (!response.ok) {
                navigate('/unauthorized')
            } else {
                const responseJson = await response.json()
                // console.log(responseJson.messages)
                setMessages(responseJson.messages)

            }
        })()
    }, [])

    const msgs = messages.map((msg) => {
        return <Message key={msg.message_id} {...msg}/>
    })



    
    return (
        <div className='dm-page-container'>
            <h1>{username}</h1>
            <div className='messages-container'>
                {msgs}
            </div>
            <div className='input-container'>
                input
            </div>
        </div>
    )
}

function Message(props: Message) {

    return (
        <div className="message-container">
            <div className="avatar">
                <h4>
                    {props.username.charAt(0).toUpperCase()}
                </h4>
            </div>
            <div className="message-main">
                <div className="message-header">
                    <div className="message-user">{props.username}</div>
                    <div className="timestamp">
                        {new Date(props.created_at).toLocaleTimeString([], {
                            hour: 'numeric',
                            minute: '2-digit'
                        })}
                    </div>
                </div>
                <div className="message-body">
                        {props.context}
                </div>
            </div>
        </div>
    )
}