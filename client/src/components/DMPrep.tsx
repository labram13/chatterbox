import '../css/DM.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'


export default function DMPrep() {
    const location = useLocation()
    // let user = location.state ?? ''
    const [userInfo, setUserInfo] = useState<String>('')
    const navigate = useNavigate()
    const {id} = useParams();

    const [input, setInput] = useState<String>('')

    useEffect(() => {
        (async () => {
            const response = await fetch('/api/room/check', {
                method: 'POST',
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: id
                })
            })

           const responseJson = await response.json()
           if (responseJson.exists) {
                navigate(`/${responseJson.room}`)
           }

           const userInfo = await fetch(`/api/user/${id}`, {
                method: 'GET',
                credentials: 'include'
           })

           const userInfoJson = await userInfo.json();
        //    console.log(userInfoJson.userInfo.rows[0])
           setUserInfo(userInfoJson.userInfo.rows[0].username)

        //    if (!response.ok) {
        //         navigate('/dashboard')
        //    }
        })()
    },[])

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault
        // console.log(e.currentTarget.value)

        setInput(e.currentTarget.value)
    }
    // console.log(user)
    async function handleClick() {

        const response = await fetch('/api/room', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                message: input,
                user_id: id
            })
        })
      
        const responseJson = await response.json()
        navigate(`/${responseJson.room}`)
         

    }

    function handleBackClick() {
        navigate('/dashboard')
    }

    // console.log(input)
    return (
        <div className='dm-page-container'>
            <div>
                <button onClick={handleBackClick}>Back</button>
                <h1>{userInfo}</h1>
            </div>
            <div></div>
            <div className='user-input-section'>
                <input className='user-input' onChange={handleInputChange}/>
                {input && <button onClick={handleClick} >send</button>}
            </div>
        </div>
    )
}