import React from 'react';

export const EventsData = [
    {
        id: 1,
        severity: 'Warning',
        source: 'SolarWinds',
        service: [1, 3, 5],
        desc: 'Storage Capacity over 70%',
        startDate: '03-07-2020',
        endDate: null,
        resolved: false
    },
    {
        id: 2,
        severity: 'Major',
        source: 'SolarWinds',
        service: [3, 4, 5],
        desc: 'Memory Issue',
        startDate: '16-07-2020',
        endDate: null,
        resolved: false
    },
    {
        id: 3,
        severity: 'Minor',
        source: 'Nagios',
        service: [1],
        desc: 'CPU percentage over 80%',
        startDate: '01-06-2020',
        endDate: null,
        resolved: false
    },
    {
        id: 4,
        severity: 'Warning',
        source: 'Group Alert',
        service: null,
        desc: 'NIC card is not running',
        startDate: '23-07-2020',
        endDate: null,
        resolved: false
    },
    {
        id: 5,
        severity: 'Critical',
        source: 'Nagios',
        service: [4, 6],
        desc: `Couldn't establish connection`,
        startDate: '27-04-2020',
        endDate: null,
        resolved: false
    },
    {
        id: 6,
        severity: 'Warning',
        source: 'Group Alert',
        service: [6],
        desc: 'Virtual Machine is not running',
        startDate: '12-05-2020',
        endDate: null,
        resolved: false
    },
    {
        id: 7,
        severity: 'Warning',
        source: 'Group Alert',
        service: [4,8],
        desc: 'Latency over 150ms',
        startDate: '27-07-2020',
        endDate: null,
        resolved: false
    },
    {
        id: 8,
        severity: 'Critical',
        source: 'Nagios',
        service: [6],
        desc: 'Proxy server has stopped working',
        startDate: '28-07-2020',
        endDate: null,
        resolved: false
    },
    {
        id: 9,
        severity: 'Minor',
        source: 'SCOM',
        service: [7, 5],
        desc: 'Port 03 is not responding ',
        startDate: '28-07-2020',
        endDate: null,
        resolved: false
    },
];
