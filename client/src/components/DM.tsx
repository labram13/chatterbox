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

// const Messages = [
//     {
//         message_id: '1',
//         fk_dm: '1',
//         context: 'Hello, how are you?',
//         sender: 'Alice',
//         created_at: new Date()
//     },
//     {
//         message_id: '2',
//         fk_dm: '1',
//         context: 'I am good, thanks! How about you?',
//         sender: 'Bob',
//         created_at: new Date()
//     }
// ]
export default function DM() {
    // const location = useLocation()
    // const {setHeader} = useOutletContext<HeaderContext>()
    // const username = location.state.username

    // useEffect(() => {
    //     setHeader(username)
    //     console.log(username)
    // })

    // const msgs = Messages.map((msg) => {
    //     return <Message key={msg.message_id} {...msg}/>
    // })

    return (
        <div>
            test
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