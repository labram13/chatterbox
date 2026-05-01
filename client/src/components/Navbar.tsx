import '../css/Navbar.css'
import {Link} from 'react-router-dom'

export default function Navbar() {

    return (
        <ul className='navbar'>
            <li>
                <Link to='/dashboard/groups'>groups</Link>
            </li>
            <li>
                <Link to='/dashboard/dms'>dms</Link>
            </li>
            <li>
                <Link to='/dashboard/profile'>profile</Link>
            </li>
        </ul>
    )
}