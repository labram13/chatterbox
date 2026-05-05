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

function DM(props: DMRoom) {

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
                const dmList: DMRoom[] = responseJson.dmList
                setDmList(dmList)
            
        
        })()

    }, [setHeader, navigate])

    const dms = dmList.map((dm:DMRoom, n) => {
        return <DM dm_id={dm.dm_id} last_message={'    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur dolorum reprehenderit nobis necessitatibus laudantium dolore aut ex labore officiis consequuntur mollitia, eveniet, enim facilis ut fuga facere rerum hic itaque'} username={dm.username} key={n} />
    })

    // console.log("dmlist", dmList)

    return (
        <div>
            {dms}
        </div>
    )
}