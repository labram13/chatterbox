import '../css/NewDMWindow.css'
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

type NewDMWindowProps = {
    handlePopup: () => void;
}

type User = {
    user_id: number,
    username: string
}


function User(props: User) {
    const navigate = useNavigate();

    async function handleUserClick(user: User) {

        const response = await fetch('/api/room/check', {
            credentials: 'include',
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: user
            })

        })

        const responseJson = await response.json()
        console.log(responseJson.exists)
        if (responseJson.exists) {

            navigate(`/${responseJson.room}`, {state: props.username})
        } else {
            navigate(`/new-dm/${props.user_id}`, {state: props.username})
        }

        
    }

    return (
        <button onClick={() => handleUserClick(props)} className='select-user-container'>
            <div className='avatar'>
                {props.username.charAt(0).toUpperCase()}
            </div>
            <div className='username'>
                {props.username}
            </div>
        </button>
    )
}
export default function NewDMWindow(props: NewDMWindowProps) {

     const [userList, setUserList] = useState<User[]>([])
 
    useEffect(() => {

        (async () => {

            const response = await fetch('/api/user', {
                method: 'GET',
                credentials: 'include'
            })
            const responseJson = await response.json()
            // console.log(responseJson)
            setUserList(responseJson.users)

        })()

    }, [setUserList])

    const users = userList.map((user: User) => {
        return <User key={user.user_id} {...user}/>

    })



    return (
        <div className="users-window">
            <div className='new-message-header'>
                <h3>New Message</h3>
                <button onClick={props.handlePopup} className="close-window">close window</button>
            </div>
            <div className='users-list'>
                {users}
            </div>
        </div>
    )
}