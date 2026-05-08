import {useOutletContext, Link, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom'
import type {Dispatch, SetStateAction} from 'react'

import '../css/DMS.css'


type HeaderContext = {
    setHeader: React.Dispatch<React.SetStateAction<string>>
}

interface DMInfo  {
    dm_id: string,
    username: string,
}

interface Setters extends DMInfo {
    handleDMClick: (user:DMInfo) => void
    setDM: Dispatch<React.SetStateAction<DMInfo | null>>

}

type DMSProps = {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>
}

function DM(props: Setters) {
    const dm_id = props.dm_id
    const username = props.username

    return (
        <Link onClick={() => props.handleDMClick({dm_id, username})} to={`/dashboard/dms/${props.dm_id}`}>
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
    const [dm, setDM] = useState<DMInfo | null>(null)
    const [visible, setVisible] = useState<boolean>(false)
    const navigate = useNavigate()
 
    const handleDMClick = (user: DMInfo) => {
        // setVisible(!visible)
        setDM(user)
        setTimeout(() => setVisible(!visible), 5)  
    }


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





    }, [setHeader, navigate])

    console.log(visible)

    const dms = dmList.map((dm:DMInfo, n) => {
        return <DM setDM={setDM} handleDMClick={handleDMClick} dm_id={dm.dm_id} username={dm.username} key={n} />
    })


    return (
        <div>
            {dms}
            <Outlet context= {{visible, dm}} />

        </div>
    )
}