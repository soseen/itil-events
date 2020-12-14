import React, { useState } from 'react'
import { FaBars } from "react-icons/fa";
import {Link} from 'react-router-dom';
import { SideNavData } from './SideNavData';
import './Navbar.scss';

const Navbar = () => {

    const [sideNav, setSideNav] = useState(false);

    const showSideNav = () => {
        setSideNav(!sideNav); 
    }

    return( 
        <>
        <div className='navbar'>
            <Link to='#' className='menu'>
                <FaBars className='menu-bars' onClick={showSideNav}/>
            </Link>
            <p className='nav-title'>Event Management</p>
        </div> 
        <nav className={sideNav ? 'side-menu active' : 'side-menu'}>
            <ul className='side-menu-links'>
                {SideNavData.map((item, index) => {
                    return (
                        <li key={index} className='nav-item'>
                            <Link to={item.route} onClick={() =>setSideNav(false)}>
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