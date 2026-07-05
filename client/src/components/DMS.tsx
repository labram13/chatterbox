import {useOutletContext, Link, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom'
import type {Dispatch} from 'react'
import NewDMWindow from './NewDMWindow'

import '../css/DMS.css'


type HeaderContext = {
    setHeader: React.Dispatch<React.SetStateAction<string>>
}

interface DMInfo  {
    fk_room: string,
    username: string,
}


type DMSProps = {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>
}

function DM(props: DMInfo) {
    const dm_id = props.fk_room.toString()
    const username = props.username

    return (
        <Link to={`/${dm_id}`} state={{username}}>
            <div id={props.fk_room} className='dm-container'>
                <div className='avatar'>
                    {props.username.charAt(0).toUpperCase()}
                </div>
                <div className='dm-main'>
                    <div className='receiver'>
                        <h3>
                            {props.username}
                        </h3>
                    </div>
                    <div className='last-message'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ipsam voluptatibus totam et accusamus quibusdam facere eveniet voluptatum explicabo, harum, officia eius nesciunt voluptates unde, illum quasi ab. Error, corrupti?
                    </div>
                </div>
            </div>
        </Link>

    )
}

export default function DMS(props: DMSProps) {

    const {setHeader} = useOutletContext<HeaderContext>()
    const [dmList, setDmList] = useState<DMInfo[]>([]) 
    const [showWindow, setShowWindow] = useState<boolean>(false)
 
    useEffect(() => {

        (async () => {
            setHeader('Direct Messages')

            const response = await fetch('/api/room', {
                method: 'GET',
                credentials: 'include'
            })

                if (!response.ok) {
                    props.setIsLoggedIn(false)
                    return
                }

                const responseJson = await response.json();
                const dmList: DMInfo[] = responseJson.dmList
                // console.log(responseJson.dmList)
                setDmList(dmList)
        })()

    }, [setHeader])
    
    // console.log(dmList)

    function handlePopup() {
        setShowWindow(!showWindow)
    }

    const dms = dmList.map((dm) => {
        return <DM key={dm.fk_room} {...dm} />
    })



    return (
        <div className='dms-container'>
            <div>
                <button onClick={handlePopup}>Add Friend</button>
            </div>
            {dms}
            {showWindow && <NewDMWindow handlePopup={handlePopup}/>}
            {showWindow && <div className='background-overlay'></div>}

        </div>
    )
}