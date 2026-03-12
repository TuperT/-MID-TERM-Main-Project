import { Link } from 'react-router'
import { AuthContext } from '../context/AuthContext'
import '../styles/Navbar.css'
import { useContext } from 'react'


const Navbar = () => {
    const { logout } = useContext(AuthContext)

    function handleLogout() {
        logout()
    }

    return (
        <nav>
            <div id="nav-container">
                <div id="nav-item">
                    <p id="nav-title">Produx</p>
                    <div id="nav-item2">
                        <Link to="/Dashboard">Dashboard</Link>
                        <Link to="/Tasks">Tasks</Link>
                        <Link to="/Profile">Profile</Link>
                        <button id='logout-btn' onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar