import React, { useEffect, useState } from 'react'
import { FaBars } from "react-icons/fa";
import {Link} from 'react-router-dom';
import { SideNavData } from './SideNavData';
import './Navbar.scss';

const Navbar = ({setUser, setLoggedIn, guest, user, teamsData}) => {

    const [sideNav, setSideNav] = useState(false);
    const [userDetails, setUserDetails] = useState(user);

    const logOut = (navItemName) => {
        if(navItemName === 'Log Out'){
            setLoggedIn(false);
            setUser(guest);
        }
    }

    useEffect(() => {
        if(user.team){
            setUserDetails({
                ...user,
                team: teamsData.find(t => t.id === user.team)})
        }
    },[user, teamsData])

    return( 
        <>
        <div className='navbar'>
            <Link to='#' className='menu'>
                <FaBars className='menu-bars' onClick={() =>setSideNav(!sideNav)}/>
            </Link>
            <p className='nav-title'>Event Management</p>
            <div className='nav-user-info'>
                <p className='nav-username'>{userDetails.username}</p>
                <p className='nav-team'>team: {userDetails.team ? userDetails.team.name : 'none'}</p>
            </div>
        </div> 
        <nav className={sideNav ? 'side-menu active' : 'side-menu'}>
            <ul className='side-menu-links'  onClick={() =>setSideNav(false)}>
                {SideNavData.map((item, index) => {
                    return (
                        <li key={index} name={item.name} className='nav-item' onClick={() => logOut(item.name)}>
                            <Link to={item.route}>
                                {item.icon}
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
        </>
    )
}

export default Navbar;