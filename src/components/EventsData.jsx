
export const EventsData = [
    {
        id: 1,
        severity: 'Warning',
        source: 'SolarWinds',
        service: [1, 3, 5],
        desc: 'Storage Capacity over 70%',
        startDate: '2020-05-06',
        endDate: null,
        resolved: false
    },
    {
        id: 2,
        severity: 'Major',
        source: 'SolarWinds',
        service: [3, 4, 5],
        desc: 'Memory Issue',
        startDate: '2020-05-03',
        endDate: '2020-06-21',
        resolved: true
    },
    {
        id: 3,
        severity: 'Minor',
        source: 'Nagios',
        service: [1],
        desc: 'CPU percentage over 80%',
        startDate: '2020-06-02',
        endDate: '2020-06-28',
        resolved: true
    },
    {
        id: 4,
        severity: 'Warning',
        source: 'Group Alert',
        service: null,
        desc: 'NIC card is not running',
        startDate: '2020-03-11',
        endDate: null,
        resolved: false
    },
    {
        id: 5,
        severity: 'Critical',
        source: 'Nagios',
        service: [4, 6],
        desc: `Couldn't establish connection`,
        startDate: '2020-04-27',
        endDate: '2020-05-11',
        resolved: true
    },
    {
        id: 6,
        severity: 'Warning',
        source: 'Group Alert',
        service: [6],
        desc: 'Virtual Machine is not running',
        startDate: '2020-07-05',
        endDate: null,
        resolved: false
    },
    {
        id: 7,
        severity: 'Warning',
        source: 'Group Alert',
        service: [4,8],
        desc: 'Latency over 150ms',
        startDate: '2020-05-06',
        endDate: null,
        resolved: false
    },
    {
        id: 8,
        severity: 'Critical',
        source: 'Nagios',
        service: [6],
        desc: 'Proxy server has stopped working',
        startDate: '2020-07-07',
        endDate: null,
        resolved: false
    },
    {
        id: 9,
        severity: 'Minor',
        source: 'SCOM',
        service: [7, 5],
        desc: 'Port 03 is not responding ',
        startDate: '2020-07-04',
        endDate: null,
        resolved: false
    },
    {
        id: 10,
        severity: 'Major',
        source: 'SCOM',
        service: [8],
        desc: 'Unauthorized activity',
        startDate: '2020-08-01',
        endDate: '2020-08-17',
        resolved: true
    },
];
