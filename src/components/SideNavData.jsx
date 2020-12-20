import React from 'react';
import { AiFillHome, AiFillWarning, AiFillAlert, AiOutlineLogout } from "react-icons/ai";
import {BsFillPersonFill} from "react-icons/bs";

export const SideNavData = [
    {
        name: 'Status',
        route: '/itil-events',
        icon: <AiFillHome />
    },
    {
        name: 'Alerts',
        route: '/alerts',
        icon: <AiFillAlert />
    },
    {
        name: 'Rules',
        route: '/rules',
        icon: <AiFillWarning />
    },
    {
        name: 'Tasks',
        route: '/tasks',
        icon: <BsFillPersonFill />
    },
    {
        name: 'Log Out',
        route: '/',
        icon: <AiOutlineLogout />
    }
];
