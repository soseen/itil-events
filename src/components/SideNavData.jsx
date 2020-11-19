import React from 'react';
import { AiFillHome, AiFillWarning, AiFillAlert, AiOutlineLogout } from "react-icons/ai";
import {BsFillPersonFill} from "react-icons/bs";

export const SideNavData = [
    {
        name: 'Status',
        route: '/',
        icon: <AiFillHome />
    },
    {
        name: 'Zdarzenia',
        route: '/alerts',
        icon: <AiFillAlert />
    },
    {
        name: 'Reguły',
        route: '/rules',
        icon: <AiFillWarning />
    },
    {
        name: 'Zadania',
        route: '/tasks',
        icon: <BsFillPersonFill />
    },
    {
        name: 'Wyloguj',
        route: '/',
        icon: <AiOutlineLogout />
    }
];
