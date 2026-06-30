import {  useEffect } from "react"
import { useLocation, useParams, useNavigate} from 'react-router-dom'
import '../css/DM.css'


type Message = {
    message_id: string,
    fk_dm: string,
    context: string,
    sender: string,
    created_at: Date
}

const Messages = [
    {
        message_id: '1',
        fk_dm: '1',
        context: 'Hello, how are you?',
        sender: 'Alice',
        created_at: new Date()
    },
    {
        message_id: '2',
        fk_dm: '1',
        context: 'I am good, thanks! How about you?',
        sender: 'Bob',
        created_at: new Date()
    }
]
export default function DM() {
    const location = useLocation()
    const username = location.state?.username ?? ''
    const {id} = useParams();
    const navigate = useNavigate()

    useEffect( () => {
        (async () => {
            const response = await fetch(`/api/message/${id}`, {
                method: 'GET',
                credentials: 'include'   
            })

            const responseJson = await response.json()
            console.log(responseJson.status)

            if (!response.ok) {
                navigate('/unauthorized')
            }
        })()
    })

    console.log(username)



    
    return (
        <div className='dm-page-container'>
            <h1>{username}</h1>
            <div className='message-container'>
                message
            </div>
            <div className='input-container'>
                input
            </div>
        </div>
    )
}

// function Message(props: Message) {

//     return (
//         // <div className="message-container">
//         //     <div className="avatar">
//         //         <h2>
//         //             {props.sender.charAt(0).toUpperCase()}
//         //         </h2>
//         //     </div>
//         //     <div className="message-main">
//         //         <div className="message-header">
//         //             <div className="message-user">{props.sender}</div>
//         //             <div className="timestamp">
//         //                 {props.created_at.toLocaleTimeString()}
//         //             </div>
//         //         </div>
//         //         <div className="message-body">
//         //                 {props.context}
//         //         </div>
//         //     </div>
//         // </div>
//         <div>
//             test
//         </div>
//     )
// }