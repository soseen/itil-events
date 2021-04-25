import React, { useEffect, useState } from 'react'
import { FaBars } from "react-icons/fa";
import {Link, useHistory} from 'react-router-dom';
import { SideNavData } from './SideNavData';
import './Navbar.scss';
import axios from 'axios';

const Navbar = ({setUser, setLoggedIn, user, teamsData}) => {

    const [sideNav, setSideNav] = useState(false);
    const [userDetails, setUserDetails] = useState(user);

    let history = useHistory();

    const switchRoute = async (navItem) => {
        if(navItem.name === 'Log Out'){
            await axios.get('https://itil-events.herokuapp.com/logout');
            history.push('/');
            setLoggedIn(false);
        }

        else {
            setSideNav(false);
            history.push(navItem.route);
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
                <FaBars className='menu-bars' onClick={() => setSideNav(!sideNav)}/>
            </Link>
            <p className='nav-title'>Event Management</p>
            <div className='nav-user-info'>
                <p className='nav-username'>{userDetails.username}</p>
                {userDetails.team && 
                    <p className='nav-team'>{`team: ${userDetails.team.name}`}</p>
                }
            </div>
        </div> 
        <nav className={sideNav ? 'side-menu active' : 'side-menu'}>
            <ul className='side-menu-links'>
            {/* <div className='subscription-details'>
                <div className='subscription-details-row'>
                    <label>Account Status</label>
                    <p>{userDetails.subscriptionActive.active ? 'Active' : 'Inactive'}</p>
                </div>
                <div className='subscription-details-row'>
                    <label>{userDetails.subscriptionActive.active ? 'Until' : ''}</label>
                    <p>{userDetails.subscriptionActive.endDate ? userDetails.subscriptionActive.endDate : ''}</p>
                </div>
            </div> */}
                {SideNavData.map((item, index) => {
                    return (
                        <li key={index} name={item.name} className='nav-item' onClick={() => switchRoute(item)}>
                                {item.icon}
                                <span>{item.name}</span>
                        </li>
                    )
                })}
            </ul>
        </nav>
        </>
    )
}

export default Navbar;