import {useOutletContext} from 'react-router-dom'
import {useEffect} from 'react'


type HeaderContext = {
    setHeader: React.Dispatch<React.SetStateAction<string>>
}
export default function DMS() {

    const {setHeader} = useOutletContext<HeaderContext>()
    useEffect(() => {
        setHeader('DMS')

    },[setHeader])

    return (
        <div>
            dms
        </div>
    )
}