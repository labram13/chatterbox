import {  useEffect, useState, useRef } from "react"
import type { RefObject } from 'react'
import { useLocation, useParams, useNavigate} from 'react-router-dom'
import '../css/DM.css'
import {Socket} from 'socket.io-client'


type Message = {
    message_id: string,
    fk_dm: string,
    context: string,
    username: string,
    created_at: string
}

interface DMProps {
    socket: RefObject<Socket | null>
}

export default function DM(props: DMProps) {
    // const location = useLocation()
    // const username = location.state ?? ''
    const [userInfo, setUserInfo] = useState<String>('') 
    const {id} = useParams();
    const navigate = useNavigate()
    const [messages, setMessages] = useState<Message[]>([])
    const [inputMessage, setInputMessage] = useState<string>('')
    const ref = useRef<HTMLDivElement>(null)

    // console.log(location.state)

    useEffect( () => {
        (async () => {
            const response = await fetch(`/api/message/${id}`, {
                method: 'GET',
                credentials: 'include'   
            })

            if (!response.ok) {
                navigate('/unauthorized')
            } else {
                props.socket.current?.emit('join room', id)
                const responseJson = await response.json()
                setMessages(responseJson.messages)
            }

            const roomInfo = await fetch(`/api/room/roomInfo/${id}`, {
                credentials: 'include',
                method: 'GET'
            })

            const roomInfoJson = await roomInfo.json()
            console.log(roomInfoJson.roomInfo.rows[0])
            setUserInfo(roomInfoJson.roomInfo.rows[0].username)
        })()

        return () => {
            // console.log('left room')
            props.socket.current?.emit('leave room', id)
        }
    }, [])

    useEffect(() => {
        const newMessageHandler =  (arg: any) => {
        setMessages(prev => [...prev, arg.message])
        }

        props.socket.current?.on('new message', newMessageHandler)

        return () => {
            // console.log('left event listener for new message')
            props.socket.current?.off('new message', newMessageHandler)
        }
    },[])

    useEffect(() => {
        if (!ref.current) return;

        // requestAnimationFrame(() => {
        ref.current!.scrollTop = ref.current!.scrollHeight;
    // });
        
    }, [messages])




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

        if (!response.ok) {
            navigate('/unauthorized')
        } else {
            const responseJson = await response.json()
            setMessages(prev => [...prev, responseJson.message])
      
            props.socket.current?.emit('new message', {id: id, message: responseJson.message})
            setInputMessage("")
        }

    }

    // console.log(messages)


    
    return (
        <div className='dm-page-container'>
            <h1>{userInfo}</h1>
            <div ref={ref} className='messages-container'>
                {msgs}
            </div>
            <form onSubmit={handleSubmit} id='message-form'>
                    <input autoComplete="off" onChange={e => setInputMessage(e.target.value)} value={inputMessage ?? ""} type='text' id='message' name='message'/>
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