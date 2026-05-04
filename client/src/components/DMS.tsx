import {useOutletContext, Link} from 'react-router-dom'
import {useEffect} from 'react'
import '../css/DMS.css'


type HeaderContext = {
    setHeader: React.Dispatch<React.SetStateAction<string>>
}

type DMRoom = {
    dmID: string,
    receiver: string,
    lastMessage: string

}

const dmList: DMRoom[] = [
    {
        dmID: '1',
        receiver: 'test2',
        lastMessage: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus aspernatur officia animi maiores possimus dolores culpa tenetur, maxime consequatur, iusto nihil saepe alias at pariatur ipsum quas eos rerum voluptatibus?'
    },
    { dmID: '2',
        receiver: 'test3',
        lastMessage: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia assumenda ab sapiente libero, error at, iure, omnis molestiae facilis obcaecati quibusdam excepturi itaque temporibus iusto illum ipsum laudantium doloremque quas.'

    }
]

function DM(props: DMRoom) {

    console.log(props)


    return (
        <Link to='/groups'>
            <div id={props.dmID} className='dm-container'>
                <div className='avatar'>
                    <h2>

                    {props.receiver.charAt(0).toUpperCase()}
                    </h2>
                </div>
                <div className='dm-main'>
                    <div className='receiver'>
                        <h3>
                            {props.receiver}
                        </h3>
                    </div>
                    <div className='last-message'>
                        {props.lastMessage}
                    </div>
                </div>
            </div>
        </Link>

    )
}

export default function DMS() {

    const {setHeader} = useOutletContext<HeaderContext>()
    useEffect(() => {
        setHeader('Direct Messages')

    },[setHeader])

    const dms = dmList.map((dm) => {
        return <DM dmID={dm.dmID} receiver={dm.receiver} lastMessage={dm.lastMessage} key={dm.dmID} />
    })

    return (
        <div>
            {dms}
        </div>
    )
}