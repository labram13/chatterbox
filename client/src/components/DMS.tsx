import {useOutletContext} from 'react-router-dom'
import {useEffect} from 'react'


type HeaderContext = {
    setHeader: React.Dispatch<React.SetStateAction<string>>
}

type DMRoom = {
    direct_message_id: number,
    members: string[]

}

function DM() {


    return (
        <div>test</div>
    )
}

export default function DMS() {

    const {setHeader} = useOutletContext<HeaderContext>()
    useEffect(() => {
        setHeader('Direct Messages')

    },[setHeader])

    return (
        <div>
            dms
        </div>
    )
}