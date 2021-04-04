import React from 'react'
import { Link, useHistory} from 'react-router-dom'

const UserNav = () => {
let history = useHistory()

const isActive = (history, path) => {
    if(history.location.pathname === path) {
      return 'user_nav-active'
    }
    return ''
  }

    return (
        <nav >
            <ul className="navlist nav mb-3">
                <li className="nav-item">
                    <Link to="/user/history" className={`nav-link ${isActive(history, "/user/history")} `} >History</Link>
                </li>
                
                <li className="nav-item">
                    <Link to="/user/password" className={`nav-link ${isActive(history, "/user/password")} `}>Password</Link>
                </li>
    
                <li className="nav-item">
                    <Link to="/user/wishlist" className={`nav-link ${isActive(history, "/user/wishlist")} `}>Wishlist</Link>
                </li>
            </ul>
        </nav>
    )
}

export default UserNav
