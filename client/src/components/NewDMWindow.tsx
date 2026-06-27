import '../css/NewDMWindow.css'


type NewDMWindowProps = {
    handlePopup: () => void;
}
export default function NewDMWindow(props: NewDMWindowProps) {

    return (
        <div className="users-window">
            <div className='new-message-header'>

                <h3>New Message</h3>
                <button onClick={props.handlePopup} className="close-window">close window</button>
            </div>
        </div>
    )
}