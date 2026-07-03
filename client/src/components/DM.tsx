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
    const [inputMessage, setInputMessage] = useState<String | null>(null)

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

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        
        const form = e.currentTarget;
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData.entries())
        // console.log(formJson)
        
        const response = await fetch(`/api/message/${id}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: formJson.message
            })
        })

        const responseJson = await response.json()

        console.log(responseJson.message)
        setMessages([...messages, responseJson.message])
    }


    
    return (
        <div className='dm-page-container'>
            <h1>{username}</h1>
            <div className='messages-container'>
                {msgs}
            </div>
            <form onSubmit={handleSubmit} id='message-form'>
                    <input onChange={e => setInputMessage(e.target.value)} type='text' id='message' name='message'/>
                    {inputMessage && <button type='submit' id='send'>
                        Send
                    </button>}
    
            </form>
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
                        {new Date(props.created_at).toLocaleString('en-US', {
                            month: '2-digit',
                            day: '2-digit',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                            })}
                        {/* {props.created_at.toLocaleString()} */}
                    </div>
                </div>
                <div className="message-body">
                        {props.context}
                </div>
            </div>
        </div>
    )
}