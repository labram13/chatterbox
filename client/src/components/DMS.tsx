import {useOutletContext, Link, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import '../css/DMS.css'


type HeaderContext = {
    setHeader: React.Dispatch<React.SetStateAction<string>>
}

type DMRoom = {
    dm_id: string,
    username: string,
    last_message: string

}

type Props = {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>
}

// const dmList: DMRoom[] = [
//     {
//         dmID: '1',
//         username: 'test2',
//         lastMessage: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus aspernatur officia animi maiores possimus dolores culpa tenetur, maxime consequatur, iusto nihil saepe alias at pariatur ipsum quas eos rerum voluptatibus?'
//     },
//     { dmID: '2',
//         username: 'test3',
//         lastMessage: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia assumenda ab sapiente libero, error at, iure, omnis molestiae facilis obcaecati quibusdam excepturi itaque temporibus iusto illum ipsum laudantium doloremque quas.'

//     }
// ]

function DM(props: DMRoom) {

    // console.log(props)


    return (
        <Link to='/groups'>
            <div id={props.dm_id} className='dm-container'>
                <div className='avatar'>
                    <h2>

                    {props.username.charAt(0).toUpperCase()}
                    </h2>
                </div>
                <div className='dm-main'>
                    <div className='receiver'>
                        <h3>
                            {props.username}
                        </h3>
                    </div>
                    <div className='last-message'>
                        {props.last_message}
                    </div>
                </div>
            </div>
        </Link>

    )
}

export default function DMS(props: Props) {

    const {setHeader} = useOutletContext<HeaderContext>()
    const [dmList, setDmList] = useState<DMRoom[]>([])
    const navigate = useNavigate()

    useEffect(() => {

        (async () => {
            setHeader('Direct Messages')

            const response = await fetch('/api/message/dms', {
                method: 'GET',
                credentials: 'include'
            })

                if (!response.ok) {
                    props.setIsLoggedIn(false)
                    return
                }

                
                const responseJson = await response.json();
                // console.log(responseJson.dmList)
                const dmList: DMRoom[] = responseJson.dmList
                setDmList(dmList)
            
        
        })()

    }, [setHeader, navigate])

    const dms = dmList.map((dm:DMRoom) => {
        return <DM dm_id={dm.dm_id} username={dm.username} last_message={dm.last_message} key={dm.dm_id} />
    })

    return (
        <div>
            {dms}
        </div>
    )
}