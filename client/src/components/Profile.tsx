import {useEffect} from 'react'
import { useOutletContext } from 'react-router-dom'


type HeaderContext = {
    setHeader: React.Dispatch<React.SetStateAction<string>>
}
export default function Profile() {
    const {setHeader} = useOutletContext<HeaderContext>()

    useEffect(() => {
        setHeader('Profile')

    }, [setHeader])



    return (
        <div>
            profile
        </div>
    )
}