import {  useEffect } from "react"
import {useOutletContext, useParams, useNavigate} from 'react-router-dom'
import '../css/DM.css'


type Message = {
    message_id: string,
    fk_dm: string,
    context: string,
    sender: string,
    created_at: Date
}

type Recipient = {
    user_id: string, 
    username: string
}

interface DMProps {
    user: Recipient | null
}

interface MessageProps {
    message: Message
}


type DMSProps = {
    visible: boolean
    dm: {dm_id: string, username: string},
    setDM: React.Dispatch<React.SetStateAction<Recipient | null>>,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

function Message(props: MessageProps) {
    
    return (
        <div>
            {props.message.context}
        </div>
    )
}


const test:Message[] = [
    
    {
        message_id: '1',
        fk_dm: '2', 
        context: 'test1',
        sender: '1',
        created_at: new Date()
    },
    {
        message_id: '2',
        fk_dm: '2', 
        context: 'test2',
        sender: '1',
        created_at: new Date()
    }


]
export default function DM(props: DMProps) {
    
    const {visible, dm, setVisible, setDM} = useOutletContext<DMSProps>()
    const navigate = useNavigate()

    // useEffect (() => {
    //     (async () => {

    //     })()
    // }, [visible])

    const handleBackClick = () => {
        setVisible(!visible)

        setTimeout(() => {
            navigate('/dashboard/dms')
            setDM(null)
        }, 100)
        
        // 
        
        

    }



    const messages = test.map( (message) => {
        return <Message key={message.message_id} message={message}/>
    })

    if (!dm) return null

    return (
        <div className={visible ? 'dm-window' : 'dm-window hidden'}>
            <div className='dm-header'>
                <button onClick={handleBackClick}>back</button>
              <div className='dm-avatar'>
                {dm.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1>
                    {dm.username}
                </h1>
              </div>
            </div>
            <div className='message-container'>
                {messages}
            </div>
            <div className='message-input-container'>
                <button>Send</button>
                <input className='message-input' />
            </div>
        </div>
    )
}