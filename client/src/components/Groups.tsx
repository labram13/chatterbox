import {useEffect} from 'react'
import {useOutlet, useOutletContext} from 'react-router-dom'

type HeaderContext = {
    setHeader: React.Dispatch<React.SetStateAction<string>>
}

export default function Groups() {

    const {setHeader} = useOutletContext<HeaderContext>()

    useEffect(() => {
        setHeader('Groups')
    }, [setHeader])

    return (
        <div>
            groups
        </div>
    )
}