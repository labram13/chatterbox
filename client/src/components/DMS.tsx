import {useOutletContext, Link, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom'
import type {Dispatch} from 'react'

import '../css/DMS.css'


type HeaderContext = {
    setHeader: React.Dispatch<React.SetStateAction<string>>
}

interface DMInfo  {
    dm_id: string,
    username: string,
}


type DMSProps = {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>
}

function DM(props: DMInfo) {
    const dm_id = props.dm_id
    const username = props.username

    return (
        <Link to={`/dashboard/dms/${dm_id}`} >
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
                const dmList: DMInfo[] = responseJson.dmList
                setDmList(dmList)
        })()

    }, [setHeader])


    const dms = dmList.map((dm:DMInfo, n) => {
        return <DM dm_id={dm.dm_id} username={dm.username} key={n} />
    })


    return (
        <div>
            {dms}
        </div>
    )
}